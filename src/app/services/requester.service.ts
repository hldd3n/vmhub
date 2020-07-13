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
        body?: any,
        options?,
    ): Observable<any> {
        return this.http.post<any>(url, body, options);
    }

    public get(
        url: string,
    ): Observable<any> {
        return this.http.get<any>(url);
    }

    public download(url: string): Observable<Blob> {
        return this.http.get(url, {
            responseType: 'blob'
        })
    }
}
