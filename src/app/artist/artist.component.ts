import { Component } from '@angular/core';

import { ButtonColors, ButtonSizes } from '../components';

@Component({
  selector: 'mh-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent {
  public logEvent(event: any) {
    console.log('NNN event: ', event);
  }
}
