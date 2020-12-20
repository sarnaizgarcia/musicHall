export interface AlbumData {
  id?: string,
  title: string;
  artistId: string;
  cover: File;
  year: string;
  gendre: string;
}

export interface ArtistInfoForAlbum {
  artistId: string;
  artistName: string;
}

export interface AlbumDefaultData {
  title: string;
  artist: ArtistInfoForAlbum;
  cover: string;
  year: string;
  gendre: string;
}
