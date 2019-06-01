import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<ICity[]>(citiesUrl);
  }
}
