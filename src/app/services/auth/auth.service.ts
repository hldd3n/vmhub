import { Injectable } from '@angular/core';
import { RequesterService } from '../requester.service';
import { UserModel } from '../../models/user.model';
import { tap } from 'rxjs/operators';
import { API, ENDPOINTS } from '../../constants/endpoints';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private readonly requester: RequesterService
    ) { }

    public registerUser(user: UserModel) {
        return this.requester.post(
            `${API.ROOT}${ENDPOINTS.USER_REGISTER}`,
            user
        );
    }

    public loginUser(user: UserModel) {
        console.log(user);
        return this.requester.post(
            `${API.ROOT}${ENDPOINTS.USER_LOGIN}`,
            user
        ).pipe(
            tap((response) => {
                console.log(response);
            })
        );
    }
}
