import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { handleHttpError } from '../util/http-util';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserRatingForPlace(userId: string, placeId: string) {
    const url = this.baseUrl + `/users/${userId}/ratingForPlace/${placeId}`;
    return this.http.get<number>(url)
      .pipe(
        catchError(handleHttpError<number>("Get user rating for place", null))
      )
  }
}
