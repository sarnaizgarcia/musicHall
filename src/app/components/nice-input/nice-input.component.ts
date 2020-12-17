import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-nice-input',
  templateUrl: './nice-input.component.html',
  styleUrls: ['./nice-input.component.css']
})

export class NiceInputComponent {
  @Input()
  public label: string = '';

  @Input()
  public errorMsg: string = '';

  get isError() {
    return this.errorMsg.length > 0;
  }
}
