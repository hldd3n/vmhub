import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RepositoryListComponent } from './repository/repository-list/repository-list.component';
import { HeaderComponent } from './header/header.component';
import { RepositoryDetailsComponent } from './repository/repository-details/repository-details.component';
import { RepositoryCommitsComponent } from './repository/repository-commits/repository-commits.component';

const routes: Routes = [{
    path: '', component: HeaderComponent,
    children: [{
        path: 'repositories', component: RepositoryListComponent,
    }, {
        path: 'repositories/:name', component: RepositoryDetailsComponent,
        children: [{
            path: 'repositories/:name/commits', component: RepositoryCommitsComponent,
        }]
    }, {
        path: '', redirectTo: 'repositories', pathMatch: 'full',
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
