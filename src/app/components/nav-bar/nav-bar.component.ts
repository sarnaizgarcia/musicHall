import { Component, Input, Output, EventEmitter } from '@angular/core';

import { OptionType } from '../menu-option';

@Component({
  selector: 'mh-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  @Input()
  public options: OptionType[] = [];

  @Input()
  public navText: string = 'home';

  @Input()
  public showBack = false;

  @Output()
  public optionSelected: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public goingBack: EventEmitter<void> = new EventEmitter<void>();

  get title() {
    return this.navText.charAt(0).toUpperCase() + this.navText.slice(1).toLowerCase();
  }

  public sendOption(event: string) {
    this.optionSelected.emit(event);
  }

  public onClickGoingBack() {
    this.goingBack.emit();
  }

  public onEnterGoingBack (event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.goingBack.emit();
    }
  }
}
