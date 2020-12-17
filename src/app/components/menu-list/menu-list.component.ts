import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OptionType } from '../menu-option';

@Component({
  selector: 'mh-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent {

  @Input()
  public listOptions: OptionType[] = [];

  @Output()
  public optionSelected: EventEmitter<string> = new EventEmitter<string>();

  public onOptionSelected(event: string) {
    this.optionSelected.emit(event);
  }
}
