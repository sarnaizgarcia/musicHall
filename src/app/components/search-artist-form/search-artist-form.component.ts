import { Component, EventEmitter, Output } from '@angular/core';

import { ButtonColors, ButtonSizes } from '../nice-button';
import { SearchArtistInfo } from './search-artist-form.entities';

@Component({
  selector: 'mh-search-artist-form',
  templateUrl: './search-artist-form.component.html',
  styleUrls: ['./search-artist-form.component.css']
})

export class SearchArtistFormComponent {
  public buttonColor = ButtonColors.SECONDARY;

  public buttonSize = ButtonSizes.SMALL;

  public searchArtistName = '';

  @Output()
  public formSubmit: EventEmitter<SearchArtistInfo> = new EventEmitter<SearchArtistInfo>();

  public onSubmit(event: Event) {
    event.preventDefault();
    this.formSubmit.emit({ artistName: this.searchArtistName });
  }
}
