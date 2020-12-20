import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ArtistInfoForAlbum } from './album-form.entities';

export function artistValidation(artistDataList: ArtistInfoForAlbum[]): ValidatorFn {
  return (control: AbstractControl): {[key:string]: any} | null => {
    const artistData = artistDataList.length > 0
      && !artistDataList.find((artist: ArtistInfoForAlbum) => artist.artistName === control.value);

    return (artistData) ? { artistNotFound: 'Artist not found in data base'} : null;
  }
}
