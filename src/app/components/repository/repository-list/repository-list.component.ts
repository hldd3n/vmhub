import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService, } from '../../../services/repository/repository.service';
import { SubscribedComponent } from '../../shared/subscribed.component';
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
import { IRepository } from '../../../common/interfaces/repository.interface';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent extends SubscribedComponent implements AfterViewInit {

    public repositories: IRepository[] = []
    public sort = ClrDatagridSortOrder.DESC;
    public loading = true;

    constructor(
        private readonly router: Router,
        private readonly repositoryService: RepositoryService,
        private _activatedRoute: ActivatedRoute,
    ) {
        super()
    }

    ngAfterViewInit(): void {
        this.repositoryService.getRepositories('vmware')
            .pipe(tap((repos) => console.log(repos)))
            .subscribe((repositories) => {
                this.repositories = repositories;
                this.loading = false;
            })
    }

    public handleRowClick(repository: IRepository): void {
        this.router.navigate(['vmware', 'repositories', `${repository.name}`])
    }
}
