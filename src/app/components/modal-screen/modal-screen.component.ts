import { Component, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'mh-modal-screen',
  templateUrl: './modal-screen.component.html',
  styleUrls: ['./modal-screen.component.css'],
  animations: [
    trigger('openClose', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})

export class ModalScreenComponent {

  @Input()
  public show: boolean = false;
}
