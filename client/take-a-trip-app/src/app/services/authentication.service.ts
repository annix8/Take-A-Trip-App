import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleHttpError } from '../util/http-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.apiUrl + "/auth";
  defaultHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(username, password) : Observable<any> {
    return this.http.post(this.baseUrl + "/login", { username: username, password: password }, this.defaultHttpOptions)
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
