import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ICity } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(includePlaces: boolean = false): Observable<ICity[]> {
    const citiesUrl = this.baseUrl + "/cities";

    return this.http.get<ICity[]>(citiesUrl)
      .pipe(
        catchError(this.handleError<ICity[]>("Get cities", []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
