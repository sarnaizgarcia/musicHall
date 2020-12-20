import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AlbumData, AlbumDefaultData, ArtistInfoForAlbum, MessageTypes, ModalTypes, OptionType } from '../components';
import { ArtistRepository, AlbumRepository, ArtistApp, ArtistFilters } from '../repositories';

@Component({
  selector: 'mh-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {

  public menuOptions: OptionType[] = [ OptionType.ARTIST, OptionType.ALBUM ];
  public showAlbumForm: boolean = false;
  public loading: boolean = false;
  public artistFormAutocompleteList: BehaviorSubject<ArtistInfoForAlbum[]> = new BehaviorSubject<ArtistInfoForAlbum[]>([]);
  public popUp: { message: string; type: ModalTypes } | null = null;
  public albumInitialData: BehaviorSubject<AlbumDefaultData> = new BehaviorSubject<AlbumDefaultData>({
    title: '',
    artist: { artistId: '', artistName: ''},
    cover: '',
    year: '',
    gendre: ''
  });

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
  ) {}

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

  private showPopup (message: string, type: ModalTypes) {
    const posX = window.scrollX;
    window.scrollTo(posX, 0);
    this.loading = false;
    this.popUp = { message, type };
  }
}
