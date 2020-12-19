import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import {
  OptionType,
  ArtistData,
  ModalTypes,
  MessageTypes,
  SearchArtistInfo,
  CardDataInput,
  CardDefinitionType,
  CardActionTypes,
} from '../components';
import { ArtistApp, ArtistRepository } from '../repositories';

@Component({
  selector: 'mh-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent {

  public menuOptions: OptionType[] = [ OptionType.ARTIST, OptionType.ALBUM ];
  public showArtistForm = false;
  public loading = false;
  public popUp: { message: string; type: ModalTypes } | null = null;
  public artistSearchList: CardDataInput[] = [];
  public totalList = 0;

  public get messageType(): MessageTypes {
    return (this.popUp && this.popUp.type === ModalTypes.WANRING)
      ? MessageTypes.WARNING
      : MessageTypes.SUCCESS
  }

  public get ModalMessageType(): ModalTypes {
    return (this.popUp && this.popUp.type)
      ? this.popUp.type
      : ModalTypes.SUCCESS;
  }

  public get ModalMessageText(): string {
    return (this.popUp && this.popUp.message)
      ? this.popUp.message
      : '';
  }

  private actionOnArtist: 'create' | 'update' = 'create';

  constructor(
    private location: Location,
    private router: Router,
    private artistRepo: ArtistRepository,
  ) {}

  public goBack() {
    this.location.back();
  }

  public navigate(page: string) {
    switch(page) {
      case OptionType.ARTIST:
        this.router.navigateByUrl('/artist');
        break;
      case OptionType.ALBUM:
        this.router.navigateByUrl('/album');
    }
  }

  public openArtistForm(action: 'create' | 'update') {
    this.actionOnArtist = action;
    this.showArtistForm = true;
  }

  public closeArtistForm() {
    this.showArtistForm = false;
  }

  public setArtistData(artistData: ArtistData) {
    this.showArtistForm = false;
    this.loading = true;
    if (this.actionOnArtist === 'create') {
      this.artistRepo.createNewArtist(
        {
          name: artistData.artistName,
          birthdate: artistData.birthDay,
          deathDate: artistData.deathDate
        },
        artistData.photo
      )
      .toPromise()
      .then(() => {
        console.log('Success')
        this.showPopup(`${artistData.artistName} has been added in the data base`, ModalTypes.SUCCESS);
      })
      .catch((error) => {
        console.log(`Error: ${this.actionOnArtist} artist: `, error);
        this.showPopup (`${artistData.artistName} was not possible to be added in the data base. Try 10 min later`, ModalTypes.WANRING);
      });
    } else {
      this.artistRepo.updateArtist(
        {
          name: artistData.artistName,
          birthdate: artistData.birthDay,
          deathDate: artistData.deathDate
        },
        artistData.photo
      )
      .toPromise()
      .then(() => {
        console.log('Success')
        this.showPopup(`The data of ${artistData.artistName} has been updated`, ModalTypes.SUCCESS);
      })
      .catch((error) => {
        console.log(`Error: ${this.actionOnArtist} artist: `, error);
        this.showPopup(`The information about ${artistData.artistName} has not been able to be updated`, ModalTypes.WANRING);
      });
    }
  }

  public closeMessage() {
    this.popUp = null;
  }

  public searchArtist(searchArtistInfo: SearchArtistInfo) {
    this.loading = true;
    this.artistRepo.searchArtist(searchArtistInfo.artistName).pipe(
      map((value: ArtistApp[]) => {
        return value.map((artist: ArtistApp) => ({
          id: artist.id || '',
          type: CardDefinitionType.ARTIST,
          title: artist.name,
          subtitle: `(${artist.birthdate} - ${artist.deathDate})`,
          photo: artist.photoUrl,
          body: '',
          actions: [ CardActionTypes.ALBUMS, CardActionTypes.EDIT, CardActionTypes.DELETE]
        }))
      })
    ).toPromise()
    .then((cardList: CardDataInput[]) => {
      this.loading = false;
      this.artistSearchList = cardList.filter((card) => card.id !== '');
      this.totalList = this.artistSearchList.length;
    })
    .catch((error: any) => {
      console.log(`Error searching artist with ${searchArtistInfo.artistName}: `, error);
      this.showPopup(
        `We are having network difficulties. Try again in 10 min`,
        ModalTypes.WANRING
      );
    });
  }

  private showPopup (message: string, type: ModalTypes) {
    this.loading = false;
    this.popUp = {
      message,
      type
    }
  }
}
