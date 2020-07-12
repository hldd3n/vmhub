import { Injectable, Inject } from '@angular/core';
import { RequesterService } from '../requester.service';
import { UserModel } from '../../models/user.model';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { LOCAL_API } from '../../constants/endpoints';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
        this.hasCookie()
    );

    constructor(
        private readonly requester: RequesterService,
        private readonly cookieService: CookieService,
    ) { }

    public get isAuthenticated$(): Observable<boolean> {
        return this.isLoggedInSubject$.asObservable()
    }

    public registerUser(user: UserModel) {
        return this.requester.post(
            `${LOCAL_API.ROOT}${LOCAL_API.USER_REGISTER}`,
            user
        );
    }

    public loginUser(user: UserModel) {
        return this.requester.post(
            `${LOCAL_API.ROOT}${LOCAL_API.USER_LOGIN}`,
            user,
            { withCredentials: true }
        ).pipe(
            tap((response) => {
                console.log(response);
            })
        );
    }

    public logout(): void {
        this.cookieService.deleteAll('/');
    }

    public getUsername(): string {
        const decodedToken = this.getDecodedToken(this.getCookieValue('X-VMNEST-TOKEN'))
        return decodedToken.username;
    }

    private hasCookie() {
        const hasLocalCookie = !!this.cookieService.get('X-VMNEST-TOKEN');
        const hasGithubCookie = !!this.cookieService.get('X-GITHUB-TOKEN');
        return hasLocalCookie && hasGithubCookie;
    }

    private getCookieValue(cookieName: string) {
        return this.cookieService.get(cookieName);
    }

    private getDecodedToken(token: string) {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }
}
