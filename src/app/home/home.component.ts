import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OptionType } from '../components';

@Component({
  selector: 'mh-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  public options: OptionType[] = [OptionType.ARTIST, OptionType.ALBUM];

  constructor(private router: Router) {}

  public navigate(page: string) {
    switch(page) {
      case OptionType.ARTIST:
        this.router.navigateByUrl('/artist');
        break;
      case OptionType.ALBUM:
        this.router.navigateByUrl('/album');
    }
  }
}
