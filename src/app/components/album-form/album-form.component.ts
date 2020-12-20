import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ButtonColors } from '../nice-button';
import { AlbumData, AlbumDefaultData, ArtistInfoForAlbum } from './album-form.entities';
import { artistValidation } from './album-form.validations';

@Component({
  selector: 'mh-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})

export class AlbumFormComponent implements OnInit, OnDestroy{
  private subscriptions: Subscription[] = [];
  private artistIdSelected: string | null = null;
  private lastArtistList: ArtistInfoForAlbum[] = [];

  @Input()
  public initialData: Observable<AlbumDefaultData> | undefined;

  @Input()
  public artistList: Observable<ArtistInfoForAlbum[]> | undefined;

  @Output()
  public artistPartialSearch: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public submitForm: EventEmitter<AlbumData> = new EventEmitter<AlbumData>();

  @Output()
  public closeForm: EventEmitter<void> = new EventEmitter<void>();

  public listArtistNames: string[] = [];
  public albumForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    artist: ['', [Validators.required, artistValidation(this.lastArtistList)]],
    year: ['', [Validators.required]],
    gendre: ['', [Validators.required]]
  });

  public photo: string | null = null;
  public fileData: File | null = null;
  public mainButtonColor: ButtonColors = ButtonColors.SECONDARY

  get validationsError () {
    const titleField = this.albumForm.get('title');
    const artistField = this.albumForm.get('artist');
    const yearField = this.albumForm.get('year');
    const gendreField = this.albumForm.get('gendre');

    let titleFieldError = '';
    let artistFieldError = '';
    let yearFieldError = '';
    let gendreFieldError = '';

    if (titleField?.invalid && (titleField.dirty || titleField.touched)) {
      titleFieldError = 'This field is required';
    }

    if (artistField?.invalid && (artistField.dirty || artistField.touched)) {
      artistFieldError = (artistField.value) ? 'The artist was not found in the data base' : 'This field is required';
    }

    if (yearField?.invalid && (yearField.dirty || yearField.touched)) {
      yearFieldError = 'This field is required';
    }

    if (gendreField?.invalid && (gendreField.dirty || gendreField.touched)) {
      gendreFieldError = 'This field is required';
    }

    return {
      title: titleFieldError,
      artist: artistFieldError,
      year: yearFieldError,
      gendre: gendreFieldError
    }
  }

  constructor(private formBuilder: FormBuilder){}

  ngOnInit() {
    const artistInput = this.albumForm.get('artist');

    if (this.initialData) {
      this.subscriptions.push(
        this.initialData.subscribe((value: AlbumDefaultData) => {
          this.albumForm.setValue({
            ...value,
            artist: value.artist.artistName,
          });

          this.artistIdSelected = value.artist.artistId;
          this.photo = value.cover;
        })
      );
    }

    if (this.artistList) {
      this.subscriptions.push(
        this.artistList.subscribe((value: ArtistInfoForAlbum[]) => {
          this.listArtistNames = value.map((artistData: ArtistInfoForAlbum) => artistData.artistName);
          this.lastArtistList = [...value];
        })
      );
    }

    if (artistInput) {
      this.subscriptions.push(
        artistInput.valueChanges.subscribe(
          (value: string) => {
            this.artistPartialSearch.emit(value);
          }
        )
      )
    }
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public setImageData (event: File) {
    this.fileData = event;
  }

  public artistSelected (artistName: string) {
    this.albumForm.get('artist')?.setValue(artistName);
    this.listArtistNames = [];
  }

  public cleanArtistListNames () {
    this.listArtistNames = [];
  }

  public onSubmitForm(event: Event) {
    event.preventDefault();

    this.submitForm.emit({
      ...this.albumForm.value,
      artistId: this.artistIdSelected
        || this.lastArtistList.find(
          (artist: ArtistInfoForAlbum) => {
            const artistNameForm = this.albumForm.get('artist')?.value;

            return artist.artistName === artistNameForm;
          }
        ),
      cover: this.fileData
    });

    this.fileData = null;
  }

  public clickOnCloseButton() {
    this.closeForm.emit();
  }
}
