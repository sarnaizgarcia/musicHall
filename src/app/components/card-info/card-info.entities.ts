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
  id: string,
  type: CardDefinitionType,
  title: string,
  subtitle: string,
  photo: string,
  body: string,
  actions: CardActionTypes[]
}

export interface CardAction {
  id: string;
  action: string;
}
