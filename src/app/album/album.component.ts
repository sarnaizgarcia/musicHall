import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { OptionType } from '../components';

@Component({
  selector: 'mh-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent {

  public menuOptions: OptionType[] = [ OptionType.ARTIST, OptionType.ALBUM ];
  public showAlbumForm: boolean = false;
  public loading: boolean = false;

  private actionOnAlbum: 'create' | 'update' = 'create';

  constructor(
    private location: Location,
    private router: Router,
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
}
