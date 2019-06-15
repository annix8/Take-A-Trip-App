import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from '../util/http-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) { }

  login(username, password) : Observable<any> {
    return this.http.post(this.baseUrl, { username, password })
      .pipe(
        catchError(handleHttpError("Login", null))
      );
  }

  logout() {

  }

  isLoggedIn(): boolean {
    return false;
  }
}
