import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable()
export class GraphqlService {
    constructor(private readonly apollo: Apollo) { }

    public query(query: any, params?: any): Observable<any> {
        return this.apollo.query<any>({
            query,
            variables: params,
            fetchPolicy: 'no-cache'
        });
    }
}
