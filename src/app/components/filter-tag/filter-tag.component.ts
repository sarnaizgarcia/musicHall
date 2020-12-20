import { Component, Input, Output, EventEmitter } from '@angular/core';

import { FilterData } from './filter-tag.entities';

@Component({
  selector: 'mh-filter-tag',
  templateUrl: './filter-tag.component.html',
  styleUrls: ['./filter-tag.component.css']
})

export class FilterTagComponent {

  @Input()
  public filterData: FilterData = {
    field: '',
    value: '',

  };

  @Output()
  public removeFilter: EventEmitter<FilterData> = new EventEmitter<FilterData>();

  public clickOnFilterTag() {
    this.removeFilter.emit(this.filterData);
  }

  public enterOnFilterTag(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.removeFilter.emit(this.filterData);
    }
  }
}
