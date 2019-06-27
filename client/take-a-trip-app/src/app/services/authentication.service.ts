import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { handleHttpError } from '../util/http-util';
import { Observable, of } from 'rxjs';
import { TOKEN_KEY, USER_ID_KEY, USER_NAME_KEY } from '../util/constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IServerResponse } from '../models/server-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient,
    public jwtHelper: JwtHelperService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<IServerResponse<any>>(this.baseUrl + "/login", { username, password })
      .pipe(
        tap(result => {
          if (result.success === true) {
            localStorage.setItem(TOKEN_KEY, result.response.token);
          }
        }),
        catchError(handleHttpError("Login", null))
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<IServerResponse<any>>(this.baseUrl + "/register", { username, email, password })
      .pipe(
        tap(result => {
          if (result.success === true) {
            localStorage.setItem(TOKEN_KEY, result.response.token);
          }
        }),
        catchError(handleHttpError("Login", null))
      );
  }

  logout(): Observable<any> {
    localStorage.clear();

    return of({});
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    return token && !this.jwtHelper.isTokenExpired(token);
  }

  getUserId() {
    const token = this.getToken();

    return this.jwtHelper.decodeToken(token)[USER_ID_KEY];
  }

  getUsername() {
    const token = this.getToken();

    return this.jwtHelper.decodeToken(token)[USER_NAME_KEY];
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
}
