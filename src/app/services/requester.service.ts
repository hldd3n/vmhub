import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequesterService {

    constructor(
        private readonly http: HttpClient
    ) { }

    public post(
        url: string,
        body: any,
        headers?: HttpHeaders
    ): Observable<any> {
        return this.http.post<any>(url, body, { headers });
    }
}
