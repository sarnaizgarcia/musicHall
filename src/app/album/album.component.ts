import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import {
  AlbumData,
  AlbumDefaultData,
  ArtistInfoForAlbum,
  CardActionTypes,
  CardDataInput,
  CardDefinitionType,
  MessageTypes,
  ModalTypes,
  OptionType,
  SearchAlbumData
} from '../components';
import { ArtistRepository, AlbumRepository, ArtistApp, ArtistFilters, AlbumApp } from '../repositories';

@Component({
  selector: 'mh-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {

  public menuOptions: OptionType[] = [ OptionType.ARTIST, OptionType.ALBUM ];
  public showAlbumForm: boolean = false;
  public loading: boolean = false;
  public artistFormAutocompleteList: BehaviorSubject<ArtistInfoForAlbum[]> = new BehaviorSubject<ArtistInfoForAlbum[]>([]);
  public artistSearchAutocompletList: string[] = [];
  public popUp: { message: string; type: ModalTypes } | null = null;
  public albumInitialData: BehaviorSubject<AlbumDefaultData> = new BehaviorSubject<AlbumDefaultData>({
    title: '',
    artist: { artistId: '', artistName: ''},
    cover: '',
    year: '',
    gendre: ''
  });
  public initialArtist: Subject<string> = new Subject<string>();
  public cardsList: CardDataInput[] = [];
  public total = 0;

  public get messageType(): MessageTypes {
    return (this.popUp && this.popUp.type === ModalTypes.WARNING)
      ? MessageTypes.WARNING
      : MessageTypes.SUCCESS;
  }

  public get modalMessateType(): ModalTypes {
    return (this.popUp && this.popUp.type)
      ? this.popUp.type
      : ModalTypes.SUCCESS;
  }

  public get modalMessateText(): string {
    return (this.popUp && this.popUp.message)
      ? this.popUp.message
      : '';
  }

  private actionOnAlbum: 'create' | 'update' = 'create';

  constructor(
    private location: Location,
    private router: Router,
    private artistRepo: ArtistRepository,
    private albumRepo: AlbumRepository,
    private route: ActivatedRoute,
    private sanitazer: DomSanitizer
  ) {}

  ngOnInit() {
    const artistId = this.route.snapshot.paramMap.get('artistId');

    if (artistId) {
      this.loading = true;
      this.artistRepo.searchArtist(artistId, ArtistFilters.ID)
      .toPromise()
      .then((value: ArtistApp[]) => {
        this.loading = false;
        this.initialArtist.next(value[0].name);
      })
      .catch((error) => {
        console.log('Error searching artist: ', error);
        this.showPopup(
          'We could not obtain the artist information. Try again after 10 min',
          ModalTypes.WARNING
        );
      })
    }
  }

  public goBack() {
    this.location.back();
  }

  public navigate(page: string) {
    switch(page) {
      case OptionType.ARTIST:
        this.router.navigateByUrl('/artist');
      break;
      case OptionType.ALBUM:
        this.router.navigateByUrl('/album');
    }
  }

  public closeAlbumForm() {
    this.showAlbumForm = false;
  }

  public openAlbumForm(action: 'create' | 'update') {
    const artistId = this.route.snapshot.paramMap.get('artistId');

    if (artistId) {
      this.loading = true;
      this.artistRepo.searchArtist(artistId, ArtistFilters.ID)
      .pipe(
        map((value: ArtistApp[]): ArtistInfoForAlbum => ({
          artistId: value[0].id || '',
          artistName: value[0].name
        }))
      )
      .toPromise()
      .then((value: ArtistInfoForAlbum) => {
        this.albumInitialData.next({
          title: '',
          artist: value,
          cover: '',
          year: '',
          gendre: ''
        })

        this.loading = false;
        this.actionOnAlbum = action;
        this.showAlbumForm = true;
      })
      .catch((error) => {
        console.log('Error searching artist by id: ', error);
        this.showPopup(
          'We could not obtain the artist information. Try again in 10 min',
          ModalTypes.WARNING
        );
      });
    } else {
      this.actionOnAlbum = action;
      this.showAlbumForm = true;
    }
  }

  public albumFormPartialSearch(artistName: string) {
    this.artistRepo.searchArtist(artistName)
      .pipe(
        map((artistList: ArtistApp[]) => artistList
        .map((artist: ArtistApp) => ({
          artistId: artist.id || '',
          artistName: artist.name
        })))
      )
      .toPromise()
      .then((artistList: ArtistInfoForAlbum[]) => {
        this.artistFormAutocompleteList.next(artistList);
      })
      .catch((error:any) => {
        console.log('Error searching artists: ', error);
        this.showPopup(
          `We could not obtain the artists info from data base. Try again in 10 minutes`,
          ModalTypes.WARNING
        );
      });
  }

  public albumSearchPartialSearch(artistName: string) {
    this.artistRepo.searchArtist(artistName)
      .pipe(
        map((artistList: ArtistApp[]) => artistList
        .map((artist: ArtistApp) => artist.name))
      )
      .toPromise()
      .then((artistNames: string[]) => {
        this.artistSearchAutocompletList = [...artistNames];
      })
      .catch((error) => {
        console.log('Error searching artist by name: ', error);
        this.showPopup(
          'We could not obtain the artist info. Try again in 10 min',
          ModalTypes.WARNING
        );
      })
  }

  public setAlbumData(albumData: AlbumData) {
    this.showAlbumForm = false;
    this.loading = true;

    if (this.actionOnAlbum === 'create') {
      this.albumRepo.createNewAlbum(
        {
          title: albumData.title,
          artistId: albumData.artistId,
          year: albumData.year,
          genre: albumData.gendre
        },
        albumData.cover
      ).toPromise()
      .then(() => {
        this.showPopup(
          `The album ${albumData.title} has been added in the database`,
          ModalTypes.SUCCESS
        );
      })
      .catch((error) => {
        console.log('Error creating an album: ', error);
        this.showPopup(
          `We could not store the album data in the data base. Try again in 10 min`,
          ModalTypes.WARNING
        );
      })
    } else {
      console.log('NNN Update album');
    }
  }

  public closePopup() {
    this.popUp = null;
  }

  public launchSearchAlbum(searchData: SearchAlbumData) {
    this.loading = true
    let search: Observable<AlbumApp[]> | null = null;

    if (searchData.artist) {
      search = this.searchAlbumWithArtist(searchData);
    } else {
      search = this.searchAlbumWithoutArtist(searchData);
    }

    search
    .pipe(
      map((albums: AlbumApp[]): CardDataInput[] => {
        return albums.map((album: AlbumApp) => ({
          id: album.id || '',
          type: CardDefinitionType.ALBUM,
          title: album.title,
          subtitle: '',
          photo: album.coverUrl,
          body: this.sanitazer.bypassSecurityTrustHtml(`<ul><li>Year: ${album.year}</li><li>Gendre: ${album.genre}</li></ul>`),
          actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE ]
        }))
      })
    )
    .toPromise()
    .then((albums: CardDataInput[]) => {
      this.loading = false;
      this.cardsList = albums;
      this.total = albums.length;
    })
    .catch((error) => {
      console.log('Error searching albums: ', error);
      this.showPopup(
        'We could not obtain the albums data. Try again in 10 min',
        ModalTypes.WARNING
      );
    })
  }

  private searchAlbumWithArtist(searchData: SearchAlbumData): Observable<AlbumApp[]> {
    return this.artistRepo.searchArtist(searchData.artist)
      .pipe(
        concatMap((artistList: ArtistApp[]) => {
          const artistId = artistList[0].id || '';

          return this.albumRepo.searchAlbum({
            title: searchData.album,
            genre: searchData.gendre,
            artistId: artistId
          })
        })
      );
  }

  private searchAlbumWithoutArtist(searchData: SearchAlbumData): Observable<AlbumApp[]> {
    return this.albumRepo.searchAlbum({
      title: searchData.album,
      genre: searchData.gendre
    });
  }

  private showPopup (message: string, type: ModalTypes) {
    const posX = window.scrollX;
    window.scrollTo(posX, 0);
    this.loading = false;
    this.popUp = { message, type };
  }
}
