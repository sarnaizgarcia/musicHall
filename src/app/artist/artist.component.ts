import { Component } from '@angular/core';

import { ModalTypes } from '../components';

@Component({
  selector: 'mh-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent {

  public modalType = ModalTypes.WANRING;

  public logEvent(event?: any) {
    console.log('NNN event: ', event);
  }
}
