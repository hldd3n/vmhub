import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from './repository/repository.service';
import { AuthService } from './auth/auth.service';
import { RequesterService } from './requester.service';

@NgModule({
    imports: [],
    providers: [
        RepositoryService,
        AuthService,
        RequesterService,
    ]
})
export class ServicesModule { }
