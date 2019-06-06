import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlace } from '../models/place';
import { handleHttpError } from '../util';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ICreatePlace } from '../models/create-place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getById(placeId: string): Observable<IPlace> {
    const placeUrl = this.baseUrl + "/places/" + placeId;
    return this.http.get<IPlace>(placeUrl)
      .pipe(
        catchError(handleHttpError<IPlace>("Get place by id", null))
      );
  }

  create(createPlaceModel: ICreatePlace){
    const formData = new FormData();

    for (var i = 0; i < createPlaceModel.pictures.length; i++) {
      formData.append("pictures", createPlaceModel.pictures[i]);
    }

    formData.append("placeName", createPlaceModel.placeName);
    formData.append("cityId", createPlaceModel.cityId);

    const createPlaceUrl = this.baseUrl + "/places/create";
    this.http.post(createPlaceUrl, formData).subscribe(
      result => {},
      error => handleHttpError("Create place", null)
    );
  }
}
