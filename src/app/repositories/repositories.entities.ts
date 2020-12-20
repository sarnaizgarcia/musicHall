export enum ArtistFilters {
  NAME = 'nameFilter',
  ID = 'idFilter'
}

export interface ArtistDataBase {
  _id: string;
  name: string;
  photoUrl: string;
  birthdate: Date;
  deathDate: Date;
  _createdAt: string;
  _updatedAt: string;
}

export interface ArtistBase {
  id?: string;
  name: string;
  birthdate: string;
  deathDate: string;
}
export interface ArtistApp extends ArtistBase{
  photoUrl: string;
}

export interface AlbumDataBase {
  _id: string;
  title: string;
  artistId: string;
  coverUrl: string;
  year: string;
  genre: string;
  _createdAt: string;
  _updatedAt: string;
}

export interface AlbumBase {
  id?: string;
  title: string;
  artistId: string;
  year: string;
  genre: string;
}

export interface AlbumApp extends AlbumBase {
  coverUrl: string;
}
