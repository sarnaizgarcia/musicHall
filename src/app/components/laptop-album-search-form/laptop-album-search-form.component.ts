import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonColors, ButtonSizes } from '../nice-button';
import { SearchAlbumData } from './laptop-album-search-form.entities';

@Component({
  selector: 'mh-laptop-album-search-form',
  templateUrl: './laptop-album-search-form.component.html',
  styleUrls: ['./laptop-album-search-form.component.css']
})

export class SearchAlbumFormLaptop {

  public artistFilter: string = '';
  public titleFilter: string = '';
  public gendreFilter: string = '';

  public buttonColor = ButtonColors.SECONDARY;
  public buttonSize = ButtonSizes.SMALL;

  @Input()
  public artistNamesList: string[] = [];

  @Output()
  public partialArtistName: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public autocompleteOut: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public submitSearch: EventEmitter<SearchAlbumData> = new EventEmitter<SearchAlbumData>()


  public artistSelected(artistName: string) {
    this.artistFilter = artistName;
    this.autocompleteOut.emit();
  }

  public artistNameSearch(event: any) {
    this.partialArtistName.emit(event.target.value);
  }

  public blurOnAutocomplete() {
    this.autocompleteOut.emit();
  }

  public onSubmitForm(event: Event) {
    event.preventDefault();

    this.submitSearch.emit({
      artist: this.artistFilter,
      album: this.titleFilter,
      gendre: this.gendreFilter
    });
  }
}
