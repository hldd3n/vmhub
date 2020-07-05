import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'home', redirectTo: ''},
    // { path: 'not-found', component: NotFoundComponent },
    { path: 'list', loadChildren: './components/components.module#ComponentsModule'},

    // {path: '**', redirectTo:'/not-found', pathMatch: 'full'}
];



@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
