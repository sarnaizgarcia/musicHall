import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ConfigApp {
  [service: string]: {
    host: string;
  }
}

export function configFactory(http: HttpClient): Observable<ConfigApp> {
  return http.get(environment.configPath)
    .pipe(
      map((repsonse: Object) => (repsonse as {[env: string]: ConfigApp})[environment.environment])
    )
}
