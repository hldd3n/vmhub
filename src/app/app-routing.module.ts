import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthRouteActivatorService } from './services/guards/auth-route-activator.service';
import { RegisterComponent } from './components/register/register.component';


export const rootRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    // { path: 'not-found', component: NotFoundComponent },
    {
        path: 'vmware',
        loadChildren: () => import(`./components/components.module`).then(module => module.ComponentsModule),
        canActivate:  [AuthRouteActivatorService]
    },
    // {path: '**', redirectTo:'/not-found', pathMatch: 'full'}
];



@NgModule({
    imports: [
        RouterModule.forRoot(rootRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
