import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlace } from '../models/place';
import { handleHttpError } from '../util/http-util';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ICreatePlace } from '../models/create-place';
import { AuthenticationService } from './authentication.service';
import { IRatePlace } from '../models/rate-place';
import { ServiceBase } from './service-base';

@Injectable({
  providedIn: 'root'
})
export class PlaceService extends ServiceBase {

  constructor(private authService: AuthenticationService,
    http: HttpClient) {
    super(http);
  }

  getById(placeId: string): Observable<IPlace> {
    const placeUrl = this.baseUrl + "/places/" + placeId;

    return super.get<IPlace>(placeUrl);
  }

  create(createPlaceModel: ICreatePlace) {
    const formData = new FormData();

    for (var i = 0; i < createPlaceModel.pictures.length; i++) {
      formData.append("pictures", createPlaceModel.pictures[i]);
    }

    formData.append("placeName", createPlaceModel.placeName);
    formData.append("placeAddress", createPlaceModel.placeAddress);
    formData.append("cityId", createPlaceModel.cityId);

    const createPlaceUrl = this.baseUrl + "/places/create";
    const token = this.authService.getToken();
    return super.post(createPlaceUrl, formData, { headers: { "Authorization": `Bearer ${token}` } })
      .pipe(
        catchError(handleHttpError<any>("Create place", null))
      );
  }

  rate(ratePlaceModel: IRatePlace): Observable<any> {
    const placeId = ratePlaceModel.placeId;
    const userId = ratePlaceModel.userId;
    const rating = ratePlaceModel.rating;
    const ratePlaceUrl = this.baseUrl + `/places/${placeId}/rate`;
    const body = {
      userId: userId,
      rating: rating
    };

    const token = this.authService.getToken();
    return super.post(ratePlaceUrl, body, { headers: { "Authorization": `Bearer ${token}` } })
      .pipe(
        catchError(handleHttpError<any>("Rate place", null))
      );
  }
}
