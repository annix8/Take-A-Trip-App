import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IServerResponse } from '../models/server-response';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class ServiceBase {
    protected baseUrl = environment.apiUrl;

    // TODO: catchError !
    constructor(private http: HttpClient) { }

    protected get<T>(url): Observable<T> {
        return this.http.get<IServerResponse<T>>(url)
            .pipe(
                map(result => {
                    if (!result.success) {
                        throw new Error(JSON.stringify(result.response));
                    }

                    return result.response;
                })
            );
    }

    protected post(url, body, options) {
        return this.http.post(url, body, options);
    }
}