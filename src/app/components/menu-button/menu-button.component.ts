import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { OptionType } from '../menu-option';

@Component({
  selector: 'mh-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.css'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({ opacity: 1}),
        animate('1s ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
})

export class MenuButtonComponent implements OnInit, OnDestroy{
  @Input()
  public menuOptions: OptionType[] = [];

  public open = false;

  private hiddenMenuReference = this.hiddeMenu.bind(this);

  @Output()
  public optionSelected: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    document.querySelector('body')?.addEventListener('click', this.hiddenMenuReference);
  }

  ngOnDestroy() {
    document.querySelector('body')?.removeEventListener('click', this.hiddenMenuReference);
  }

  private hiddeMenu(event:any) {
    if (event.target.tagName !== 'MAT-ICON') {
      this.open = false;
    }
  }

  public onOptionSelected(event: string) {
    this.open = false;
    this.optionSelected.emit(event);
  }

  public clickOnButton() {
    this.open = !this.open;
  }

  public enterOnButton(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.open = !this.open
    }
  }
}
