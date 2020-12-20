import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { ArtistInfoForAlbum, OptionType } from '../components';
import { ArtistRepository, AlbumRepository, ArtistApp } from '../repositories';

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

  private actionOnAlbum: 'create' | 'update' = 'create';

  constructor(
    private location: Location,
    private router: Router,
    private artistRepo: ArtistRepository,
    private albumRepo: AlbumRepository
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
    this.actionOnAlbum = action;
    this.showAlbumForm = true;
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
      });
  }
}
