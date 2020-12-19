import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

import { KenjoDataSource, VerbTypes,FileBucketDataSource } from '../datasources';
import { ArtistApp, ArtistDataBase, ArtistBase} from './repositories.entities';
import { ConfigApp } from '../utils';
import { APP_CONFIG } from '../app.module';

@Injectable({
  providedIn: 'root'
})

export class ArtistRepository {

  constructor(
    private dataSource: KenjoDataSource,
    private fileBucket: FileBucketDataSource,
    @Inject(APP_CONFIG) private configApp: Observable<ConfigApp>,
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
            birthdate: this.formatDate(new Date(artistDb.birthdate)),
            deathDate: (artistDb.deathDate) ? this.formatDate(new Date(artistDb.deathDate)) : ''
          }));
      }),
      concatMap((artistList: ArtistApp[]) => {
        return this.configApp.pipe(
          map((configApp: ConfigApp) => ({ artistList, configApp }))
        )
      }),
      map(({artistList, configApp}) => {
        return artistList.map((artist: ArtistApp) => ({
          ...artist,
          photoUrl: `${configApp.fileBucket.picturesHost}/${artist.photoUrl}`
        }))
      })
    );
  }

  public createNewArtist(artistData: ArtistBase, fileData: File): Observable<any> {
    const fileExtension = fileData.name.split('.')[1]
    const filePath = `artist/${artistData.name}_${new Date().getTime()}.${fileExtension}`.replace(' ','-');
    const fileType = fileData.type;
    const birthDayArray = artistData.birthdate.split('/').map((value) => Number(value));
    const deathDateArray = artistData.deathDate.split('/').map((value) => Number(value));

    return this.dataSource.request(
      'artist',
      VerbTypes.POST,
      {
        ...artistData,
        birthdate: new Date(birthDayArray[2],(birthDayArray[1] - 1),birthDayArray[0]),
        deathDate: new Date(deathDateArray[2], (deathDateArray[1] - 1), deathDateArray[0]),
        photoUrl: filePath
      }
      ).pipe(
      concatMap(() => {
        return this.fileBucket.sendFile(`upload/${filePath}`, fileData, fileType);
      })
    );
  }

  public updateArtist (artistData: ArtistBase, fileData: File | string): Observable<any> {
    if (!artistData.id) {
      throw new Error('Id is required to update the artist data');
    }

    const birthDayArray = artistData.birthdate.split('/').map((value) => Number(value));
    const deathDateArray = artistData.deathDate.split('/').map((value) => Number(value));

    let fileExtension = '';
    let filePath = '';
    let fileType = '';

    if (typeof fileData === 'string') {
      filePath = new URL(fileData).pathname;
    } else {
      fileExtension = fileData.name.split('.')[1]
      filePath = `artist/${artistData.name}_${new Date().getTime()}.${fileExtension}`;
      fileType = fileData.type;
    }

    let result = this.dataSource.request(
      `artist/${artistData.id}`,
      VerbTypes.PUT,
      {
        ...artistData,
        birthdate: new Date(birthDayArray[2],(birthDayArray[1] - 1),birthDayArray[0]),
        deathDate: new Date(deathDateArray[2], (deathDateArray[1] - 1), deathDateArray[0]),
        photoUrl: filePath
      }
    );

    if (typeof fileData !== 'string') {
      result = result.pipe(
        concatMap(() => this.fileBucket.sendFile(`upload/${filePath}`, fileData, fileType))
      );
    }
    return result;
  }

  public deleteArtist(id: string): Observable<any> {
    return this.dataSource.request(`/artist/${id}`, VerbTypes.DELETE);
  }

  private formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${(day < 10) ? `0${day}`: day}/${(month < 10) ? `0${month}`: month}/${year}`;
  }
}
