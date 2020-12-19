import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-nice-select',
  templateUrl: './nice-select.component.html',
  styleUrls: ['./nice-select.component.css']
})

export class NiceSelectComponent {

  @Input()
  public label: string = '';

  @Input()
  public errorMsg: string = '';

  get isError() {
    return this.errorMsg !== '';
  }

}
