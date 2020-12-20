import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output()
  public searchCritera: EventEmitter<SearchAlbumData> = new EventEmitter<SearchAlbumData>();

  @Output()
  public artistPartialSearch: EventEmitter<string> = new EventEmitter<string>();

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
    this.searchCritera.emit(searchData);
  }

  public launchPartialArtistSearch (artistName: string) {
    this.artistPartialSearch.emit(artistName);
  }

  public cleanArtistListNames () {
    setTimeout(() => { this.artistNamesList = []; },0);
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
