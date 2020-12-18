import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-modal-screen',
  templateUrl: './modal-screen.component.html',
  styleUrls: ['./modal-screen.component.css']
})

export class ModalScreenComponent {

  @Input()
  public show: boolean = false;
}
