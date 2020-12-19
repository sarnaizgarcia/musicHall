import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  CardAction,
  ArtistDefaultData,
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
  public artistSearchList: ArtistApp[] = [];
  public cardList: CardDataInput[] = [];
  public totalList = 0;
  public artistSelectedInfo: BehaviorSubject<ArtistDefaultData> = new BehaviorSubject({
    artistName: '',
    birthDay: '',
    deathDate: '',
    photo: ''
  });
  public lastSearch: SearchArtistInfo | undefined;
  public validationMessage: string = '';
  public validationType = {
    modalType: ModalTypes.WARNING,
    messageType: MessageTypes.WARNING
  }

  public get messageType(): MessageTypes {
    return (this.popUp && this.popUp.type === ModalTypes.WARNING)
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
  private artisIdSelected: string | null = null;

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
        this.showPopup (`${artistData.artistName} was not possible to be added in the data base. Try 10 min later`, ModalTypes.WARNING);
      });
    } else {
      this.artistRepo.updateArtist(
        {
          id: this.artisIdSelected || '',
          name: artistData.artistName,
          birthdate: artistData.birthDay,
          deathDate: artistData.deathDate
        },
        artistData.photo || this.artistSearchList.find((artist: ArtistApp) => artist.id === this.artisIdSelected)?.photoUrl
      )
      .toPromise()
      .then(() => {
        console.log('Success')
        this.artisIdSelected = null;
        this.showPopup(`The data of ${artistData.artistName} has been updated`, ModalTypes.SUCCESS);
        if (this.lastSearch) {
          this.searchArtist(this.lastSearch);
        }
      })
      .catch((error) => {
        console.log(`Error: ${this.actionOnArtist} artist: `, error);
        this.showPopup(`The information about ${artistData.artistName} has not been able to be updated`, ModalTypes.WARNING);
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
        this.artistSearchList = value.filter((card) => card.id !== '');
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
      this.cardList = cardList;
      this.totalList = this.cardList.length;
      this.lastSearch = searchArtistInfo;
    })
    .catch((error: any) => {
      console.log(`Error searching artist with ${searchArtistInfo.artistName}: `, error);
      this.showPopup(
        `We are having network difficulties. Try again in 10 min`,
        ModalTypes.WARNING
      );
    });
  }

  public resolveCardAction (action: CardAction) {
    this.artisIdSelected = action.id;

    switch(action.action) {
      case 'albums':
        console.log('Navigate to artist albums: ', action);
      break;
      case 'edit':
        this.launchUpdateArtist();
      break;
      case 'delete':
       this.launchDeleteArtist();
      break;
      default:
        this.showPopup(
          `Action ${action.action} not allowed`,
          ModalTypes.WARNING
        );
    }
  }

  private launchDeleteArtist() {
    this.validationMessage = 'Are sure about to remove this artist from your collection?';
  }

  public closeMessageValidation(event?: boolean) {
    this.validationMessage = '';

    if (event && this.artisIdSelected) {
      const selectedArtist = this.artistSearchList.find((artist: ArtistApp) => artist.id === this.artisIdSelected);
      this.loading = true;
      this.artistRepo.deleteArtist(this.artisIdSelected)
      .toPromise()
      .then(() => {
        this.showPopup(
          `${selectedArtist?.name} has been removed from your list`,
          ModalTypes.SUCCESS
        )

        if (this.lastSearch) {
          this.searchArtist(this.lastSearch);
        }
      })
      .catch((error) => {
        console.log(`Error removeing the ${this.artisIdSelected} artist`);
        this.showPopup(
          `We are having network difficulties. Try again in 10 min`,
          ModalTypes.WARNING
        );
      });
    }
  }

  private launchUpdateArtist() {
    const selectedArtist = this.artistSearchList.find((artist: ArtistApp) => artist.id === this.artisIdSelected);
    if (selectedArtist) {
      this.openArtistForm('update');
      this.artistSelectedInfo.next({
        artistName: selectedArtist.name,
        birthDay: selectedArtist.birthdate,
        deathDate: selectedArtist.deathDate,
        photo: selectedArtist.photoUrl
      });
    }
  }

  private showPopup (message: string, type: ModalTypes) {
    this.loading = false;
    this.popUp = {
      message,
      type
    }
  }
}
