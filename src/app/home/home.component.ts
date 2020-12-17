import { Component } from '@angular/core';

@Component({
  selector: 'mh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public eventFired(event?: any) {
    console.log('Event fired: ', event);
  }
}
