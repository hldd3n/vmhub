import { Injectable } from '@angular/core';
import { GraphqlService } from './base/graphql.service';
import { Observable } from 'rxjs';
import { getPinnedRepositories, getRepositoryByName } from './graphql';
import { RequesterService } from '../requester.service';
import { GITHUB } from '../../constants/endpoints';

@Injectable()
export class RepositoryDataService {
    constructor (
        private readonly graphqlService: GraphqlService,
        private readonly requesterService: RequesterService,
    ) { }

    public getPinnedRepositoriesRawData(login: string): Observable<any> {
        return this.graphqlService.query(getPinnedRepositories, { login });
    }

    public getRepositoryByName(reponame: string): Observable<any> {
        console.log(name);
        return this.graphqlService.query(getRepositoryByName, { reponame })
    }

    public getContributorsPerRepo(ownerName, repoName: string) {
        const url = `${GITHUB.API}/repos/${ownerName}/${repoName}/contributors?q=contributions&order=desc?&per_page=5&page=1`
        return this.requesterService.get(url);
    }
}
