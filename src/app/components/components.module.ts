import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { LoginComponent } from './login/login.component';
import { RepositoryListComponent } from './repository/repository-list/repository-list.component';
import { RepositoryDetailsComponent } from './repository/repository-details/repository-details.component';
import { ComponentsRoutingModule } from './components-routing.module';



@NgModule({
    declarations: [
        LoginComponent,
        RepositoryListComponent,
        RepositoryDetailsComponent,
    ],
    imports: [
        SharedModule,
        ComponentsRoutingModule,
    ],
    exports: [
        LoginComponent,
        RepositoryListComponent,
        RepositoryDetailsComponent,
        ComponentsRoutingModule
    ],
})
export class ComponentsModule { }
