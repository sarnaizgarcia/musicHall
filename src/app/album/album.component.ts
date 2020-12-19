import { Component } from '@angular/core';

import { FilterData } from '../components';

@Component({
  selector: 'mh-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent {

  public filterData: FilterData[] = [
    {
      field: 'Artist',
      value: 'Leonard Cohen'
    },
    {
      field: 'Gendre',
      value: 'Singer-songwriter'
    },
    {
      field: 'Album',
      value: 'Thanks for the dance'
    }
  ];

  public logEvent(event?: any) {
    console.log('NNN event fired: ', event);
  }
}
