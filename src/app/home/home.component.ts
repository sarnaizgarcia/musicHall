import { Component } from '@angular/core';
import { OptionType } from '../components';

@Component({
  selector: 'mh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public options: OptionType[] = [OptionType.ARTIST, OptionType.ALBUM];

  public eventFired(event?: any) {
    console.log('Event fired: ', event);
  }
}
