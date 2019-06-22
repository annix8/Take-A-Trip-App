import { Injectable } from '@angular/core';
import { ServiceBase } from './service-base';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ServiceBase {

  constructor(private authService: AuthenticationService,
    http: HttpClient) {
    super(http);
  }

  getUserRatingForPlace(placeId: string): Observable<number> {
    if (!this.authService.isLoggedIn()) {
      return of(-1);
    }

    const url = this.baseUrl + `/users/ratingForPlace/${placeId}`;
    const token = this.authService.getToken();

    return super.get<number>(url, { headers: { "Authorization": `Bearer ${token}` } });
  }
}
