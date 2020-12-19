import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { ButtonColors } from '../nice-button';
import { ArtistData, ArtistDefaultData } from './artist-form.entities';

@Component({
  selector: 'mh-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})
export class ArtistFormComponent implements OnInit, OnDestroy {

  @Input()
  public initalData: Observable<ArtistDefaultData> | undefined;

  @Output()
  public submitData: EventEmitter<ArtistData> = new EventEmitter<ArtistData>();

  @Output()
  public closeForm: EventEmitter<void> = new EventEmitter<void>();

  public saveButtonColor = ButtonColors.SECONDARY;
  public artistForm = this.formBuilder.group({
    artistName: [ '', [Validators.required]],
    birthDay: ['', [Validators.required, Validators.pattern(/[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9][0-9][0-9]/)]],
    deathDate: ['', [Validators.pattern(/[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9][0-9][0-9]/)]]
  });
  public fileData: File | null = null;

  public photo: string | null = null;

  get validationsError () {
    const artistField = this.artistForm.get('artistName');
    const birthDayField = this.artistForm.get('birthDay');
    const deathDateField = this.artistForm.get('deathDate');

    let artistFieldError = '';
    let birthDayFieldError = '';
    let deathDateFieldError = '';

    if (artistField?.invalid && (artistField.dirty || artistField.touched)) {
      artistFieldError = 'This field is required';
    }

    if (birthDayField?.invalid && (birthDayField.dirty || birthDayField.touched)) {
      birthDayFieldError = (birthDayField.value) ? 'Invalid date format' : 'This field is required';
    }

    if (deathDateField?.invalid && (deathDateField.dirty || deathDateField.touched)) {
      deathDateFieldError = 'Invalid date format';
    }

    return {
      artistName: artistFieldError,
      birthDay: birthDayFieldError,
      deathDate: deathDateFieldError
    }
  }

  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (this.initalData) {
      this.subscriptions.push(
        this.initalData.subscribe((value: ArtistDefaultData) => {
          this.artistForm.setValue({
            artistName: value.artistName,
            birthDay: value.birthDay,
            deathDate: value.deathDate
          });
          this.photo = value.photo;
        })
      );
    }
  }

  ngOnDestroy() {
    for(const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public setImageData (event: File) {
    this.fileData = event;
  }

  public onSubmitArtistData (event: Event) {
    event.preventDefault();
    const artistInfo = this.artistForm.value;
    const fileData = this.fileData;

    this.fileData = null;
    this.photo = null;
    this.artistForm.reset();

    this.submitData.emit({
      ...artistInfo,
      photo: fileData
    });
  }

  public clickOnCloseButton () {
    this.closeForm.emit();
  }
}
