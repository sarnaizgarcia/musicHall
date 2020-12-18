import { Component } from '@angular/core';

@Component({
  selector: 'mh-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent {
  public searchValues = ['value 1', 'value 2', 'value 3', 'value 4', 'value 5'];

  public inputValue: string = '';

  public onValueSelected(event: string) {
    this.inputValue = event;
  }
}
