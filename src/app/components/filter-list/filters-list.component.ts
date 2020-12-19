import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FilterData } from '../filter-tag';

@Component({
  selector: 'mh-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.css']
})

export class FiltersListComponent {

  @Input()
  public filters: FilterData[] = [];

  @Output()
  public filterToRemove: EventEmitter<FilterData> = new EventEmitter<FilterData>();

  public filterSelected (filter: FilterData) {
    this.filterToRemove.emit(filter);
  }
}
