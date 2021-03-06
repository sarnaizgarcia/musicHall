import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ButtonColors, ButtonSizes } from '../nice-button';
import { FilterData } from '../filter-tag';

@Component({
  selector: 'mh-search-album-form-mobile',
  templateUrl: './mobile-album-search-form.component.html',
  styleUrls: ['./mobile-album-search-form.component.css']
})

export class SearchAlbumFormMobile implements OnInit, OnDestroy {

  public artistFilter: string = '';
  public albumFilter: string = '';
  public gendreFilter: string = '';
  public buttonColor = ButtonColors.SECONDARY;
  public buttonSize = ButtonSizes.SMALL;
  public filterSelected: 'artist' | 'album' | 'gendre' = 'artist';

  @Input()
  public artistNamesList: string[] = [];

  @Input()
  public initialFilter: Observable<FilterData> | undefined;

  @Output()
  public searchArtistBy: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public autocompleteOut: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public submitFilter: EventEmitter<FilterData> = new EventEmitter<FilterData>();

  private subscriptions: Subscription[] = [];

  ngOnInit() {
    if (this.initialFilter) {
     this.subscriptions.push(
       this.initialFilter
       .subscribe((filter: FilterData | undefined) => {
         if (filter) {
          this.submitFilter.emit(filter);
         }
       })
     );
    }
  }

  ngOnDestroy() {
    for(const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public artistSelected(artistName: string) {
    this.artistFilter = artistName;
    this.autocompleteOut.emit();
  }

  public partialFilter(event: any) {
    this.searchArtistBy.emit(event.target.value);
  }

  public onAutocompleteBlur() {
    this.autocompleteOut.emit();
  }

  public createFilter(event: Event) {
    event.preventDefault();
    let filter: FilterData | undefined;

    switch(this.filterSelected) {
      case 'album':
        filter = { field: 'Album', value: this.albumFilter };
      break;
      case 'artist':
        filter = { field: 'Artist', value: this.artistFilter };
      break;
      case 'gendre':
        filter = { field: 'Gendre', value: this.gendreFilter };
      break;
    }

    this.submitFilter.emit(filter);
  }
}
