import { Injectable } from '@angular/core';
import { IRepositoryRawData, IRawCommit, IRawName } from '../../common/interfaces/repository-raw.interface';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { RepositoryDataService } from '../data/repository-data.service';
import { IRepository, IRepositoryCommit } from '../../common/interfaces/repository.interface';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class RepositoryService {
    constructor(
        private readonly repositoryDataService: RepositoryDataService,
    ) { }

    public readonly selectedRepository$ = new ReplaySubject<IRepository>(1)

    public getRepositories(name: string): Observable<IRepository[]> {
        return this.getRawRepositories(name).pipe(
            map((rawData) => {
                const repositoriesRaw = rawData?.data?.repositoryOwner.pinnedItems.nodes
                if (!repositoriesRaw.length) {
                    return []
                }
                const repositoriesWithoutContributors: IRepository[] = this.mapRepositoriesData(repositoriesRaw)

                return repositoriesWithoutContributors
            }),
        )
    }

    public getRepositoryByName(name: string): Observable<IRepository> {
        return this.getRawRepositoryByName(name).pipe(
            map((rawData) => {
                if (rawData?.data?.errors?.length) {
                    return null
                };
                console.log(rawData);
                const repositoryRaw = rawData?.data?.repositoryOwner?.repository
                const repository: IRepository = {} as IRepository;
                repository.name = repositoryRaw.name;
                repository.readmeMd = repositoryRaw?.readmeMd?.text
                repository.readmeRst = repositoryRaw?.readmeRst?.text
                repository.commits = repositoryRaw.ref?.target?.history?.edges
                    .map((rawCommit: IRawCommit) => {
                        const commit: IRepositoryCommit = {} as IRepositoryCommit
                        commit.message = rawCommit?.node?.messageHeadline;
                        commit.date = rawCommit?.node?.pushedDate
                        commit.contributor = rawCommit?.node?.committer?.user?.login
                        commit.sha = rawCommit?.node?.oid

                        return commit
                    })

                return repository;
            }),
        )
    }

    public getRawRepositories(name: string): Observable<any> {
        return this.repositoryDataService.getPinnedRepositoriesRawData(name)
    }

    public async getRawRepositoryByName1(name: string): Promise<any> {
        return this.repositoryDataService.getRepositoryByName(name).toPromise();
        const rawData = await this.repositoryDataService.getRepositoryByName('clarity').toPromise();
        if (rawData?.data?.errors?.length) {
            return []
        };
        return rawData?.data?.repositoryOwner?.repository
    }

    public getRawRepositoryByName(name: string): Observable<any> {
        return this.repositoryDataService.getRepositoryByName(name)
    }

    public selectRepository(repository: IRepository) {
        this.selectedRepository$.next(repository);
    }

    private mapRepositoriesData(rawRepositories: IRepositoryRawData[]): IRepository[] {
        return rawRepositories.map((node: IRepositoryRawData) => {
            const repository: IRepository = {} as IRepository;
            repository.name = node.name;
            repository.readmeMd = node?.readmeMd?.text
            repository.readmeRst = node?.readmeRst?.text
            repository.license = node.licenseInfo
            repository.commitsCount = node.ref?.target?.history?.totalCount
            repository.commits = node.ref?.target?.history?.edges
                .map((rawCommit: IRawCommit) => {
                    const commit: IRepositoryCommit = {} as IRepositoryCommit
                    commit.message = rawCommit?.node?.messageHeadline;
                    commit.date = rawCommit?.node?.pushedDate
                    commit.contributor = rawCommit?.node?.committer?.user?.login
                    commit.sha = rawCommit?.node?.oid

                    return commit
                })
            repository.releases = node.releases.nodes.map((rawRelease: IRawName) => rawRelease.name)
            repository.branches = node.refs.nodes.map((rawBranch: IRawName) => rawBranch.name)
            return repository;
        });
    }
}
