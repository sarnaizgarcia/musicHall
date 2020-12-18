import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mh-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent {
  @Input()
  public valuesList: string[] = [];

  @Output()
  public valueSelected: EventEmitter<string> = new EventEmitter<string>();

  get areValues() {
    return this.valuesList.length > 0;
  }

  public onValueClick(value: string) {
    this.valueSelected.emit(value);
  }

  public onValueEnter(event: KeyboardEvent, value: string) {
    if (event.key === 'Enter') {
      this.valueSelected.emit(value);
    }
  }
}
