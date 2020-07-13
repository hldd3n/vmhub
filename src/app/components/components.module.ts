import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared.module';
import { LoginComponent } from './login/login.component';
import { RepositoryListComponent } from './repository/repository-list/repository-list.component';
import { RepositoryDetailsComponent } from './repository/repository-details/repository-details.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from './header/header.component';
import { ServicesModule } from '../services/services.module';
import { SubscribedComponent } from './shared/subscribed.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
    declarations: [
        RepositoryListComponent,
        RepositoryDetailsComponent,
        HeaderComponent,
        SubscribedComponent,
        SpinnerComponent,
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ComponentsRoutingModule,
        ServicesModule,
    ],
    exports: [
        RepositoryListComponent,
        RepositoryDetailsComponent,
        ComponentsRoutingModule,
        SubscribedComponent,
        SpinnerComponent,
    ],
})
export class ComponentsModule { }
