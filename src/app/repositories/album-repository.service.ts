import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { APP_CONFIG } from '../app.module';
import { FileBucketDataSource, KenjoDataSource, VerbTypes } from '../datasources';
import { ConfigApp } from '../utils';
import { AlbumApp, AlbumBase, AlbumDataBase } from './repositories.entities';

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

  public searchAlbum (albumData: Partial<AlbumApp>): Observable<AlbumApp[]> {
    return this.dataSource.request('albums/all', VerbTypes.GET)
      .pipe(
        map((value: Object) => {
        const albumDbList = (value as AlbumDataBase[]);

        return albumDbList.map((album: AlbumDataBase): AlbumApp => ({
          id: album._id,
          title: album.title,
          artistId: album.artistId,
          year: album.year,
          genre: album.genre,
          coverUrl: album.coverUrl
        }))
       }),
       concatMap((albumAppList: AlbumApp[]) => {
         return this.configApp
          .pipe(
            map ((config: ConfigApp) => ({ config, albumAppList }))
          );
       }),
       map((value: { config: ConfigApp; albumAppList: AlbumApp[]}) => {
         return value.albumAppList.map((album: AlbumApp) => ({
           ...album,
           coverUrl: `${value.config.fileBucket.picturesHost}/${album.coverUrl}`
         }))
       }),
       map((albumsList: AlbumApp[]) => {
        return albumsList.filter((album: AlbumApp) => {
          const filterKeys = Object.keys(albumData);

          return filterKeys.reduce((acc: boolean, current: string) => {
            let filter: boolean =  false

            switch(current) {
              case 'title':
                filter = this.titleFilter(album, albumData[current] || '');
              break;
              case 'artistId':
                filter = this.artistIdFilter(album, albumData[current] || '');
              break;
              case 'genre':
                filter = this.gendreFilter(album, albumData[current] || '');
            }

            return acc && filter;
          }, true);
        })
       })
      )
  }

  private artistIdFilter (album: AlbumApp, artistId: string): boolean {
    return album.artistId === artistId
  }

  private titleFilter (album: AlbumApp, title: string): boolean {
    return album.title.indexOf(title) > -1;
  }

  private gendreFilter (album: AlbumApp, gendre: string): boolean {
    return album.genre.indexOf(gendre) > -1;
  }
}
