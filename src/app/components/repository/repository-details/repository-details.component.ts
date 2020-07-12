import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../../services/repository/repository.service';
import { SubscribedComponent } from '../../shared/subscribed.component';
import { takeUntil } from 'rxjs/operators';
import { IRepository } from '../../../common/interfaces/repository.interface';
import { Router } from '@angular/router';
import { GITHUB } from '../../../constants/endpoints';
import { RequesterService } from '../../../services/requester.service';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-repository-details',
    templateUrl: './repository-details.component.html',
    styleUrls: ['./repository-details.component.scss']
})
export class RepositoryDetailsComponent extends SubscribedComponent implements OnInit {

    public repositoryData: IRepository
    constructor(
        private readonly repositoryService: RepositoryService,
        private readonly requester: RequesterService,
        private readonly router: Router,
    ) {
        super()
    }

    ngOnInit(): void {
        this.repositoryService
            .selectedRepository$
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe((repository) => {
                this.repositoryData = repository;
            });
    }

    handleDownloadPatch(sha: string): void {
        const url = `${GITHUB.API}/repos/vmware/${this.repositoryData.name}/commits/${sha}`
        this.requester
            .download(url)
            .subscribe(blob => saveAs(blob, `${sha}.txt`))
    }

    handleBack(): void {
        this.router.navigate(['vmware', 'repositories'])
    }
}
