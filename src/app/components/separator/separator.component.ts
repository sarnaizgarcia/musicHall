import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mh-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.css']
})

export class SeparatorComponent {
  @Output()
  public newElement: EventEmitter<void> = new EventEmitter<void>();

  public clickOnNewElement() {
    this.newElement.emit();
  }

  public enterOnNewElement(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.newElement.emit();
    }
  }
}
