import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardDataInput, CardAction } from './card-info.entities';

@Component({
  selector: 'mh-card-info',
  templateUrl: './card-info.component.html',
  styleUrls: ['./card-info.component.css']
})

export class CardInfoComponent {
  @Input()
  public dataInput: CardDataInput | undefined;

  @Output()
  public cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();

  get altMainImage() {
    return `${this.dataInput?.title} image`
  }


  public clickOnAction(action: string) {
    this.cardAction.emit({ id: this.dataInput?.id || '', action});
  }

  public enterOnAction(event: KeyboardEvent, action: string) {
    if (event.key === 'Enter') {
      this.cardAction.emit({ id: this.dataInput?.id || '', action });
    }
  }
}
