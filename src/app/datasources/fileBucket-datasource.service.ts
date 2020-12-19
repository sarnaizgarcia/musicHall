import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { ConfigApp } from '../utils';
import { APP_CONFIG } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class FileBucketDataSource {

  constructor(
    @Inject(APP_CONFIG) private configApp: Observable<ConfigApp>,
    private httpClient: HttpClient
  ) {}

  public sendFile(url: string, file: File, fileType: string): Observable<Object> {
    const headers = {
      'Content-Type': fileType
    };

    return this.configApp.pipe(
      concatMap((config: ConfigApp) => {
        const finalUrl = `${config.fileBucket.host}/${url}`;

        return this.httpClient.post(finalUrl, file, { headers });
      })
    );
  }
}
