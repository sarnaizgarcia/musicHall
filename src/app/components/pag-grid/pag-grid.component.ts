import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CardDataInput, CardAction } from '../card-info';
import { PaginationEvent } from './pag-grid.entities';

@Component({
  selector: 'mh-pag-grid',
  templateUrl: './pag-grid.component.html',
  styleUrls: ['./pag-grid.component.css']
})

export class PagGridComponent {
  @Input()
  public cardsList: CardDataInput[] = [];

  @Input()
  public total: number = 0;

  @Input()
  public limit: number = 0;

  @Output()
  public pagEvent: EventEmitter<PaginationEvent> = new EventEmitter<PaginationEvent>();

  @Output()
  public cardAction: EventEmitter<CardAction> = new EventEmitter<CardAction>();

  public onScroll() {
    const leng = this.cardsList.length;
    if (leng < this.total) {
      this.pagEvent.emit({ offset: leng, limit: this.limit });
    }
  }

  public onCardAction(action: CardAction) {
    this.cardAction.emit(action);
  }
}
