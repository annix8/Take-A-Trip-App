import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import { ICity } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  // TODO take from config
  private citiesUrl = "http://localhost:3200/api/cities";

  constructor(private http: HttpClient) { }

  getAll(includePlaces: boolean = false): Observable<ICity[]> {
    return this.http.get<ICity[]>(this.citiesUrl);
  }
}
