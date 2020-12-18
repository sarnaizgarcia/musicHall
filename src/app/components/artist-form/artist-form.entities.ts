import { FileData } from '../upload-file';

export interface ArtistData {
  artistName: string;
  birthDay: string;
  deathDate: string;
  photo: FileData;
}

export interface ArtistDefaultData {
  artistName: string;
  birthDay: string,
  deathDate: string,
  photo: string,
}
