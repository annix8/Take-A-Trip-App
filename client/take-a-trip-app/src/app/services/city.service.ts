import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICity } from '../models/city';
import { ServiceBase } from './service-base';

@Injectable({
  providedIn: 'root'
})
export class CityService extends ServiceBase {

  getAll(): Observable<ICity[]> {
    const citiesUrl = this.baseUrl + "/cities?exclude=places";

    return super.get<ICity[]>(citiesUrl);
  }

  getAllByName(cityName: string): Observable<ICity[]> {
    if (!cityName.trim()) {
      return of([]);
    }

    const citiesUrl = this.baseUrl + "/cities/name/" + cityName + "?exclude=places";

    return super.get<ICity[]>(citiesUrl);
  }

  getById(cityId: string): Observable<ICity> {
    const cityUrl = this.baseUrl + "/cities/" + cityId;

    return super.get<ICity>(cityUrl);
  }
}
