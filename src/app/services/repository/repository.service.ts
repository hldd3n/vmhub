import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { RepositoryDataService } from '../data/repository-data.service';

const repositories = [[{
    name: 'FirstRepo',
    license: 'none',
    commits: 15,
    contributors: ['ivan', 'dragan'],
    releases: '3.2.2',
    branches: ['master', 'develop'],
},{
    name: 'sec',
    license: 'da',
    commits: 33,
    contributors: ['opa', 'ilko'],
    releases: '4.2.2',
    branches: ['feature', 'epic'],
}]]

@Injectable()
export class RepositoryService {

    constructor(
        private readonly repositoryDataService: RepositoryDataService,
    ) { }

    public getRepositories(): Observable<any> {
        return this.repositoryDataService.getPinnedRepositories('vmware');
    }
}
