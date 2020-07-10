import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from './repository/repository.service';
import { AuthService } from './auth/auth.service';
import { RequesterService } from './requester.service';
import { AuthRouteActivatorService } from './guards/auth-route-activator.service';
import { CookieService } from 'ngx-cookie-service'

@NgModule({
    imports: [],
    providers: [
        CookieService,
        RepositoryService,
        AuthService,
        RequesterService,
        AuthRouteActivatorService,
    ]
})
export class ServicesModule { }
