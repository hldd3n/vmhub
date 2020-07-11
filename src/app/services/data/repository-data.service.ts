import { Injectable } from '@angular/core';
import { GraphqlService } from './base/graphql.service';
import { Observable } from 'rxjs';
import { getPinnedRepositories } from './graphql';
import { RequesterService } from '../requester.service';

@Injectable()
export class RepositoryDataService { 
    constructor (
        private readonly graphqlService: GraphqlService,
        private readonly requesterService: RequesterService,
    ) { }

    public getPinnedRepositoriesRawData(login: string): Observable<any> {
        return this.graphqlService.query(getPinnedRepositories);
    }

    public getContributersPerRepo(repoName: string) {
        return this.requesterService.post('super', {body: 'body'});
    }
}
