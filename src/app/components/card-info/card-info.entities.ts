export enum CardActionTypes {
  ALBUMS = 'albums',
  EDIT = 'edit',
  DELETE = 'delete'
}

export enum CardDefinitionType {
  ARTIST = 'artist',
  ALBUM = 'album'
}

export interface CardDataInput {
  type: CardDefinitionType,
  title: string,
  subtitle: string,
  photo: string,
  body: string,
  actions: CardActionTypes[]
}
