import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ButtonColors } from '../nice-button';
import { FileData } from '../upload-file';
import { ArtistData, ArtistDefaultData } from './artist-form.entities';

@Component({
  selector: 'mh-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css']
})

export class ArtistFormComponent {

  @Input()
  public initalData: ArtistDefaultData = {
    artistName: '',
    birthDay: '',
    deathDate: '',
    photo: ''
  }

  @Output()
  public submitData: EventEmitter<ArtistData> = new EventEmitter<ArtistData>();

  public saveButtonColor = ButtonColors.SECONDARY;
  public artistForm = this.formBuilder.group({
    artistName: [this.initalData.artistName, [Validators.required]],
    birthDay: [this.initalData.birthDay, [Validators.required, Validators.pattern(/[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9][0-9][0-9]/)]],
    deathDate: [this.initalData.deathDate, [Validators.pattern(/[0-3][0-9]\/[0-1][0-9]\/[0-9][0-9][0-9][0-9]/)]]
  });
  public fileData: FileData | undefined;

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

  constructor(private formBuilder: FormBuilder) {}

  public setImageData (event: FileData) {
    this.fileData = event;
  }

  public onSubmitArtistData (event: Event) {
    event.preventDefault();
    this.submitData.emit({
      ...this.artistForm.value,
      photo: this.fileData
    });
  }
}
