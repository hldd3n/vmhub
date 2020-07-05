import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../common/shared/shared.module';
import { LoginComponent } from './login/login.component';



@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        LoginComponent,
    ],
})
export class ComponentsModule { }
