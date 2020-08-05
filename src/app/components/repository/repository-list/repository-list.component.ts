import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService, } from '../../../services/repository/repository.service';
import { SubscribedComponent } from '../../shared/subscribed.component';
import { ClrDatagridSortOrder } from '@clr/angular';
import { IRepository } from '../../../common/interfaces/repository.interface';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
    selector: 'app-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent extends SubscribedComponent implements OnInit {

    public repositories: IRepository[] = []
    public sort = ClrDatagridSortOrder.DESC;
    public loading = true;

    constructor(
        private readonly router: Router,
        private readonly repositoryService: RepositoryService,
    ) {
        super()
    }

    ngOnInit(): void {
        this.repositoryService.getRepositories('vmware')
            .pipe(
                filter((result) => result !== undefined),
                takeUntil(this.componentDestroyed$),
            )
            .subscribe((repositories) => {
                this.repositories = repositories;
                this.loading = false;
            })
    }

    public handleRowClick(repository: IRepository): void {
        this.router.navigate(['vmware', 'repositories', `${repository.name}`])
    }
}
