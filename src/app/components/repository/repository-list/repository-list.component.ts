import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { RepositoryService } from '../../../services/repository/repository.service';
import { SubscribedComponent } from '../../shared/subscribed.component';
import { ClrDatagridSortOrder } from '@clr/angular';

@Component({
    selector: 'app-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent extends SubscribedComponent implements OnInit {

    public repositories: any[] = []
    public sort = ClrDatagridSortOrder.DESC;

    constructor(
        private readonly router: Router,
        private readonly repositoryService: RepositoryService,
        private _activatedRoute: ActivatedRoute,
    ) {
        super()
     }

    ngOnInit(): void {
        this.repositoryService
            .getRepositories()
            .pipe(takeUntil(
                this.componentDestroyed$
            ))
            .subscribe((repositories) => {
                console.log(repositories);
            });
    }

    public handleRowClick(repository): void {
        console.log(repository.name);
        this.router.navigate(['repositories', `${repository.name}`])
    }
}
