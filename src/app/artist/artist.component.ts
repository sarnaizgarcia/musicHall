import { Component } from '@angular/core';

import { ModalTypes, ArtistDefaultData } from '../components';

@Component({
  selector: 'mh-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent {

  public modalType = ModalTypes.NEUTRAL;

  public artistData: ArtistDefaultData = {
    artistName: 'Papa Noel',
    birthDay: '01/12/1969',
    deathDate: '01/12/2009',
    photo: '../../assets/06-programming-coding-is-hell.png',
  };

  public logEvent(event?: any) {
    console.log('NNN event: ', event);
  }
}
