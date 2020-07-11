import { Injectable } from '@angular/core';
import { GraphqlService } from './base/graphql.service';
import { Observable } from 'rxjs';
import { getPinnedRepositories } from './graphql';

@Injectable()
export class RepositoryDataService extends GraphqlService {
    public getPinnedRepositories(login: string): Observable<any> {
        return this.query(getPinnedRepositories);
    }
}
