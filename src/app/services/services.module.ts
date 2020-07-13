import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from './repository/repository.service';
import { AuthService } from './auth/auth.service';
import { RequesterService } from './requester.service';
import { CookieService } from 'ngx-cookie-service'
import { RepositoryDetailsComponent } from '../components/repository/repository-details/repository-details.component';
import { RepositoryDataService } from './data/repository-data.service';
import { GraphqlService } from './data/base/graphql.service';
import { AuthRouteActivatorService } from './guards/auth-route-activator.service';

@NgModule({
    imports: [],
    providers: [
        CookieService,
        RepositoryService,
        RepositoryDataService,
        AuthService,
        RequesterService,
        RepositoryDetailsComponent,
        AuthRouteActivatorService,
        GraphqlService,
    ]
})
export class ServicesModule { }
