import { Component, ElementRef, Input, ViewChild, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mh-nice-input',
  templateUrl: './nice-input.component.html',
  styleUrls: ['./nice-input.component.css']
})
export class NiceInputComponent extends BehaviorSubject<string> {
  @Input()
  public label: string = '';

  @Input()
  public errorMsg: string = '';

  @Input()
  public emitWidth: boolean = false;

  @ViewChild('inputContainer')
  public inputContainer: ElementRef | undefined;

  get isError() {
    return this.errorMsg.length > 0;
  }

  constructor(){
    super('250px');
  }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    const divWidth = this.inputContainer?.nativeElement.offsetWidth

    if (this.emitWidth && divWidth > 0) {
      this.next(`${this.inputContainer?.nativeElement.offsetWidth}px`);
    }
  }
}
