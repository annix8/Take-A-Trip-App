import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ICity } from '../models/city';
import { handleHttpError } from '../util/http-util';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ICity[]> {
    const citiesUrl = this.baseUrl + "/cities?exclude=places";

    return this.http.get<ICity[]>(citiesUrl)
      .pipe(
        catchError(handleHttpError<ICity[]>("Get cities", []))
      );
  }

  getAllByName(cityName: string): Observable<ICity[]> {
    if (!cityName.trim()) {
      return of([]);
    }

    const citiesUrl = this.baseUrl + "/cities/name/" + cityName + "?exclude=places";
    return this.http.get<ICity[]>(citiesUrl)
      .pipe(
        catchError(handleHttpError<ICity[]>("Get cities by name", []))
      );
  }

  getById(cityId: string): Observable<ICity>{
    const cityUrl = this.baseUrl + "/cities/" + cityId;
    return this.http.get<ICity>(cityUrl)
    .pipe(
      catchError(handleHttpError<ICity>("Get city by id", null))
    );
  }
}
