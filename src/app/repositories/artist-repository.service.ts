import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

import { KenjoDataSource, VerbTypes,FileBucketDataSource } from '../datasources';
import { ArtistApp, ArtistDataBase} from './repositories.entities';
import { FileData } from '../components';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  constructor(
    private dataSource: KenjoDataSource,
    private fileBucket: FileBucketDataSource
  ){}

  public searchArtist(artistName: string): Observable<ArtistApp[]> {
    return this.dataSource.request('artists/all', VerbTypes.GET).pipe(
      map((response: Object) => {
        const artistList = (response as ArtistDataBase[]);

        return artistList
          .filter((artistDb: ArtistDataBase) => (artistDb.name.indexOf(artistName) > -1))
          .map((artistDb: ArtistDataBase) => ({
            id: artistDb._id,
            name: artistDb.name,
            photoUrl: artistDb.photoUrl,
            birthDate: artistDb.birthDate,
            deathDate: artistDb.deathDate
          }));
      })
    );
  }

  public createNewArtist(artistData: ArtistApp, fileData: FileData): Observable<any> {
    return this.dataSource.request('artist', VerbTypes.POST, artistData).pipe(
      concatMap(() => {
        const fileExtension = fileData.fileName.split('.')[1];
        const filePath = `artist/${artistData.name}_${new Date().getTime()}.${fileExtension}`;
        const fileType = `image/${fileExtension}`;

        return this.fileBucket.sendFile(filePath, fileData.content, fileType);
      })
    );
  }

  public updateArtist (artistData: ArtistApp): Observable<any> {
    if (!artistData.id) {
      throw new Error('Id is required to update the artist data');
    }
    return this.dataSource.request(`artist/${artistData.id}`, VerbTypes.PUT, artistData);
  }

  public deleteArtist(id: string): Observable<any> {
    return this.dataSource.request(`/artist/${id}`, VerbTypes.DELETE);
  }
}
