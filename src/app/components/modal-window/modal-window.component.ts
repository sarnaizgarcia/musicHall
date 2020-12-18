import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ModalTypes } from './modal-window.entities';

@Component({
  selector: 'mh-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})

export class ModalWindowComponent {

  @Input()
  modalType: ModalTypes = ModalTypes.NEUTRAL;

  @Output()
  public closeWindow: EventEmitter<void> = new EventEmitter<void>();

  public clickOnCloseButton() {
    this.closeWindow.emit();
  }

  public enterOnCloseButton(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.closeWindow.emit();
    }
  }

}
