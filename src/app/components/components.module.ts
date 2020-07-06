import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { LoginComponent } from './login/login.component';
import { RepositoryListComponent } from './repository/repository-list/repository-list.component';
import { RepositoryDetailsComponent } from './repository/repository-details/repository-details.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from './header/header.component';
import { RepositoryCommitsComponent } from './repository/repository-commits/repository-commits.component';



@NgModule({
    declarations: [
        RepositoryListComponent,
        RepositoryDetailsComponent,
        HeaderComponent,
        RepositoryCommitsComponent,
    ],
    imports: [
        SharedModule,
        ComponentsRoutingModule,
    ],
    exports: [
        RepositoryListComponent,
        RepositoryDetailsComponent,
        ComponentsRoutingModule
    ],
})
export class ComponentsModule { }
