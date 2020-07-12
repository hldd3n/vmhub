import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../services/repository/repository.service';
import { SubscribedComponent } from '../../shared/subscribed.component';
import { takeUntil } from 'rxjs/operators';
import { IRepository } from '../../../common/interfaces/repository.interface';
import { Router } from '@angular/router';
import { GITHUB } from '../../../constants/endpoints';

@Component({
    selector: 'app-repository-details',
    templateUrl: './repository-details.component.html',
    styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent extends SubscribedComponent implements OnInit {

    public repositoryData: IRepository

    constructor(
        private readonly repositoryService: RepositoryService,
        private readonly router: Router,
    ) {
        super()
    }

    ngOnInit(): void {
        this.repositoryService
            .selectedRepository$
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((repository) => {
                console.log('subRepo', repository);
                this.repositoryData = repository;
            });
    }

    handleDownloadPatch(commitResourcePath: string): void {
        const url = `${GITHUB.DOMAIN}/${commitResourcePath}.patch`
        window.open(url)
    }

    handleBack(): void {
        this.router.navigate(['vmware', 'repositories'])
    }
}
