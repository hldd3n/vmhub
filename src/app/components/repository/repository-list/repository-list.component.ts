import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService, } from '../../../services/repository/repository.service';
import { SubscribedComponent } from '../../shared/subscribed.component';
import { ClrDatagridSortOrder } from '@clr/angular';
import { IRepository } from '../../../common/interfaces/repository.interface';

@Component({
    selector: 'app-repository-list',
    templateUrl: './repository-list.component.html',
    styleUrls: ['./repository-list.component.scss']
})
export class RepositoryListComponent extends SubscribedComponent implements OnInit {

    public repositories: IRepository[] = []
    public sort = ClrDatagridSortOrder.DESC;

    constructor(
        private readonly router: Router,
        private readonly repositoryService: RepositoryService,
        private _activatedRoute: ActivatedRoute,
    ) {
        super()
     }

    async ngOnInit(): Promise<void> {
        this.repositoryService.getRepositories('vmware')
            .subscribe((repositories) => this.repositories = repositories)
    }

    public handleRowClick(repository: IRepository): void {
        this.repositoryService.selectRepository(repository)
        this.router.navigate(['vmware', 'repositories', `${repository.name}`])
    }
}
