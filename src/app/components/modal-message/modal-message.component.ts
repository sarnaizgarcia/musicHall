import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonColors, ButtonSizes } from '../nice-button';
import { MessageTypes } from './modal-message.entities';

@Component({
  selector: 'mh-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})

export class ModalMessage {
  @Input()
  public message: string = '';

  @Input()
  public validateAnswer: boolean = false;

  @Input()
  public messageType: MessageTypes = MessageTypes.SUCCESS;

  @Output()
  public answerMessage: EventEmitter<boolean> = new EventEmitter<boolean>();

  public buttonPrimaryColor = ButtonColors.PRIMARY;
  public buttonNeutralColor = ButtonColors.NEUTRAL;
  public buttonSizeBig = ButtonSizes.BIG;
  public buttonSizeSmall = ButtonSizes.SMALL;

  public clickOnButton(answer: boolean) {
    this.answerMessage.emit(answer);
  }
}
