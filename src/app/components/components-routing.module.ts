import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RepositoryListComponent } from './repository/repository-list/repository-list.component';

const routes: Routes = [{
    path: '', component: RepositoryListComponent,
    pathMatch: 'full'
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }
