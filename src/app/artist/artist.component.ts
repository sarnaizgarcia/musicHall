import { Component } from '@angular/core';

import { CardActionTypes, CardDataInput, CardDefinitionType } from '../components';

@Component({
  selector: 'mh-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent {

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

  public logEvent(event?: any) {
    console.log('NNN event: ', event);
  }
}
