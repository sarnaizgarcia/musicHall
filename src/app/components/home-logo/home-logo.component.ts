import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mh-home-logo',
  templateUrl: './home-logo.component.html',
  styleUrls: ['./home-logo.component.css']
})
export class HomeLogoComponent {

  @Output()
  public logoAction: EventEmitter<void> = new EventEmitter<void>();

  public clickOnLogo() {
    this.logoAction.emit();
  }

  public enterOnLogo(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.logoAction.emit();
    }
  }
}
