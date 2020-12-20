import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { APP_CONFIG } from '../app.module';
import { FileBucketDataSource, KenjoDataSource, VerbTypes } from '../datasources';
import { ConfigApp } from '../utils';
import { AlbumBase } from './repositories.entities';

@Injectable({
  providedIn: 'root'
})

export class AlbumRepository {

  constructor(
    private dataSource: KenjoDataSource,
    private fileBucket: FileBucketDataSource,
    @Inject(APP_CONFIG) private configApp: Observable<ConfigApp>,
  ) {}

  public createNewAlbum(albumData: AlbumBase, fileData: File): Observable<any> {
    const fileExtension = fileData.name.split('.')[1];
    const filePath = `album/${albumData.title}_${albumData.year}_${new Date().getTime()}.${fileExtension}`.replace(/\s/g, '-');
    const fileType = fileData.type;

    return this.dataSource.request(
      'album',
      VerbTypes.POST,
      {
        ...albumData,
        coverUrl: filePath
      }
    ).pipe(
      concatMap(() => {
        return this.fileBucket.sendFile(`upload/${filePath}`, fileData, fileType);
      })
    );
  }
}
