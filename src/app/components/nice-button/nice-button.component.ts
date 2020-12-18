import { Component, Input } from '@angular/core';

import { ButtonColors, ButtonSizes } from './nice-button.entities';

@Component({
  selector: 'mh-nice-button',
  templateUrl: './nice-button.component.html',
  styleUrls: ['./nice-button.component.css']
})

export class NiceButtonComponent {
  @Input()
  public color: ButtonColors = ButtonColors.NEUTRAL;

  @Input()
  public size: ButtonSizes = ButtonSizes.SMALL;

  @Input()
  public disabled: boolean = false;

}
