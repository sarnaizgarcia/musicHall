export interface ArtistDataBase {
  _id: string,
  name: string,
  photoUrl: string,
  birthDate: string,
  deathDate: string,
  _createdAt: string,
  _updatedAt: string,
}

export interface ArtistApp {
  id?: string,
  name: string,
  photoUrl: string,
  birthDate: string,
  deathDate: string,
}
