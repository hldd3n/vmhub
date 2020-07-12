import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class AuthRouteActivatorService implements CanActivate {
    public constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
    ) { }

    public canActivate(): Observable<boolean> {
        return this.authService.isAuthenticated$.pipe(
            tap((isLogged: boolean) => {
                if (!isLogged) {
                    this.router.navigate(['']);
                }
            })
        );
    }
}
