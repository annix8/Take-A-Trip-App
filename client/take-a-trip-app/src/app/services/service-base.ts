import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, tap, switchAll, switchMap } from 'rxjs/operators';
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

    protected get<T>(url, options = {}): Observable<T> {
        return this.http.get<IServerResponse<T>>(url, options)
            .pipe(
                map(x => {
                    const result = x as unknown as IServerResponse<any>;
                    if (!result.success) {
                        throw new Error(JSON.stringify(result.response));
                    }

                    return result.response;
                })
            );
    }

    protected post(url, body, options) {
        return this.http.post<IServerResponse<any>>(url, body, options)
            .pipe(
                map(x => {
                    const result = x as unknown as IServerResponse<any>;
                    if (!result.success) {
                        throw new Error(JSON.stringify(result.response));
                    }

                    return result;
                })
            );
    }
}