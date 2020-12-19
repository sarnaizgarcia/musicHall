import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { ConfigApp } from '../utils';
import { APP_CONFIG } from '../app.module';
import { VerbTypes } from './data-source.entities';

@Injectable({
  providedIn: 'root'
})
export class KenjoDataSource {

  constructor(
    @Inject(APP_CONFIG) private appConfig: Observable<ConfigApp>,
    private httpClient: HttpClient
  ) {}

  public request(url: string, verb: VerbTypes, body?: {[key: string]: any}): Observable<Object> {
    if (!body && (verb === VerbTypes.POST || verb === VerbTypes.PUT)) {
      throw new Error('Post and put actions need a body');
    }

    const headers = {
      'Content-Type': 'application/json'
    }
    return this.appConfig.pipe(
      concatMap((config: ConfigApp) => {
        const finalUrl =`${config.musicHallBack}/${url}`;

        return (verb === VerbTypes.POST || verb === VerbTypes.PUT)
          ? this.httpClient[verb](finalUrl, body, { headers })
          : this.httpClient[verb](finalUrl);
      })
    );
  }
}
