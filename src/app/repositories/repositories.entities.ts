export interface ArtistDataBase {
  _id: string,
  name: string,
  photoUrl: string,
  birthdate: Date,
  deathDate: Date,
  _createdAt: string,
  _updatedAt: string,
}

export interface ArtistBase {
  id?: string,
  name: string,
  birthdate: string,
  deathDate: string,
}
export interface ArtistApp extends ArtistBase{
  photoUrl: string;
}
