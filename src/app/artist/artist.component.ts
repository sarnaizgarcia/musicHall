import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { CardActionTypes, CardDataInput, CardDefinitionType } from '../components';
import { APP_CONFIG } from '../app.module';
import { ConfigApp } from '../utils';

@Component({
  selector: 'mh-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent implements OnInit, OnDestroy{

  private subscriptions: Subscription[] = [];

  public cardInput: CardDataInput[] = [{
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }, {
    id: '1',
    type: CardDefinitionType.ALBUM,
    title: 'Leonard Cohen',
    subtitle: '(1934- 2016)',
    photo: '../../assets/img/06-programming-coding-is-hell.png',
    body: '',
    actions: [ CardActionTypes.EDIT, CardActionTypes.DELETE]
  }]

  constructor(@Inject(APP_CONFIG) private config: Observable<ConfigApp>) {}

  ngOnInit() {
    this.subscriptions.push(
      this.config.subscribe(
        (config: ConfigApp) => { console.log('NNN Config: ', config); },
        (error: any) => { console.log('NNN error: ', error); }
      )
    );
  }

  ngOnDestroy() {
    for (const subscrition of this.subscriptions) {
      subscrition.unsubscribe();
    }
  }

  public logEvent(event?: any) {
    console.log('NNN event: ', event);
  }
}
