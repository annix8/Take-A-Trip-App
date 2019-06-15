import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { handleHttpError } from '../util/http-util';
import { Observable } from 'rxjs';
import { TOKEN_KEY } from '../util/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/login", { username, password })
      .pipe(
        map(result => {
          localStorage.setItem(TOKEN_KEY, result.token);
        }),
        catchError(handleHttpError("Login", null))
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return false;
  }
}
