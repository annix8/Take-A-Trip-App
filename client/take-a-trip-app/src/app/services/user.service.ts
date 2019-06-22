import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceBase {

  getUserRatingForPlace(userId: string, placeId: string) {
    const url = this.baseUrl + `/users/${userId}/ratingForPlace/${placeId}`;

    return super.get<number>(url);
  }
}
