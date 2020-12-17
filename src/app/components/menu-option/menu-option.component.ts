import { Component, Input, Output, EventEmitter } from '@angular/core';

import { OptionType } from './menu-option.entities';

@Component({
  selector: 'mh-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.css']
})
export class MenuOptionComponent {
  @Input()
  public icon: OptionType = OptionType.ARTIST;

  @Output()
  public actionOnMenuOption: EventEmitter<string> =  new EventEmitter<string>();

  get text(): string {
    return this.icon.charAt(0).toUpperCase() + this.icon.slice(1);
  }

  public clickOnOption() {
    this.actionOnMenuOption.emit(this.icon);
  }

  public enterOnOption(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.actionOnMenuOption.emit(this.icon);
    }
  }
}
