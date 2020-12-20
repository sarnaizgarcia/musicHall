import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilterData } from '../filter-tag';
import { SearchAlbumData } from '../laptop-album-search-form';

@Component({
  selector: 'mh-search-album-form',
  templateUrl: './search-album-form.component.html',
  styleUrls: ['./search-album-form.component.css']
})

export class SearchAlbumFormComponent {

  public filterList: FilterData[] = [];

  @Input()
  public artistNamesList: string[] = [];

  @Input()
  public initialArtist: Observable<string> | undefined;

  @Output()
  public searchCriteria: EventEmitter<SearchAlbumData> = new EventEmitter<SearchAlbumData>();

  @Output()
  public artistPartialSearch: EventEmitter<string> = new EventEmitter<string>();

  public get initalArtistFilter(): Observable<FilterData> | undefined {
    return (this.initialArtist)
      ? this.initialArtist.pipe(
        map((value: string): FilterData => ({ field: 'Artist', value }))
      )
      : undefined;
  }

  public updateFilterList(action: 'add' | 'remove', filter: FilterData) {
    switch(action) {
      case 'add':
        this.addFilterToCriteria(filter);
      break;
      case 'remove':
        this.removeFilterToCriteria(filter);
      break;
    }

    const searchCriteria: Partial<SearchAlbumData> = this.filterList
      .reduce((acc, current) => ({
        ...acc,
        [current.field.toLowerCase()]: current.value
      }), {});

    this.launchSearch({
      artist: '',
      album: '',
      gendre: '',
      ...searchCriteria
    });
  }

  public launchSearch( searchData: SearchAlbumData) {
    this.searchCriteria.emit(searchData);
  }

  public launchPartialArtistSearch (artistName: string) {
    this.artistPartialSearch.emit(artistName);
  }

  public cleanArtistListNames () {
    setTimeout(() => { this.artistNamesList = []; },200);
  }

  private addFilterToCriteria (filter: FilterData) {
    const leng = this.filterList.length;

    let index = 0;
    let found = false;

    while((!found) && (index < leng)) {
      found = this.filterList[index++].field === filter.field;
    }

    if (found) {
      this.filterList[--index].value = filter.value
    } else {
      this.filterList.push(filter);
    }
  }

  private removeFilterToCriteria (filter: FilterData) {
    this.filterList = this.filterList.filter((currentFilter) => currentFilter.field !== filter.field);
  }
}
