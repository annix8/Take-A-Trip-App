import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlace } from '../models/place';
import { handleHttpError } from '../util';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getById(placeId: string): Observable<IPlace> {
    const placeUrl = this.apiUrl + `/${placeId}`;
    return this.http.get<IPlace>(placeUrl)
      .pipe(
        catchError(handleHttpError<IPlace>("Get place by id", null))
      );
  }
}
