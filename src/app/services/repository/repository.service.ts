import { Injectable } from '@angular/core';
import { IRepositoryRawData, IRawCommit, IRawName } from '../../common/interfaces/repository-raw.interface';
import { Subject, ReplaySubject, Observable, combineLatest } from 'rxjs';
import { RepositoryDataService } from '../data/repository-data.service';
import { IRepository, IRepositoryCommit } from '../../common/interfaces/repository.interface';
import { map, switchMap, mergeMap, combineAll, filter } from 'rxjs/operators';

@Injectable()
export class RepositoryService {
    constructor(
        private readonly repositoryDataService: RepositoryDataService,
    ) { }

    public getRepositories(name: string): Observable<any> {
        return this.getRawRepositories(name).pipe(
            filter((rawData) => rawData?.data?.repositoryOwner?.pinnedItems?.nodes.length),
            switchMap((rawData: any) => {
                const repositoriesRaw = rawData?.data?.repositoryOwner?.pinnedItems?.nodes

                const repositoriesWithoutContributors: IRepository[] = this.mapRepositoriesData(repositoriesRaw)

                return combineLatest(repositoriesWithoutContributors.map((repo) => {
                    return this.repositoryDataService.getContributorsPerRepo('vmware', repo.name)
                        .pipe(
                            map((contributorsRaw) => ({
                                ...repo,
                                contributors: contributorsRaw
                                    .map((contributor) => ({ name: contributor.login, commits: contributor.contributions })),
                            })),
                        );
                }));
            }),
        );
    }

    public getRepositoryByName(name: string): Observable<IRepository> {
        return this.getRawRepositoryByName(name).pipe(
            map((rawData) => {
                if (rawData?.data?.errors?.length) {
                    return null
                };
                const repositoryRaw = rawData?.data?.repositoryOwner?.repository
                return this.mapRepositoryData(repositoryRaw);
            }),
        )
    }

    public getRawRepositories(name: string): Observable<any> {
        return this.repositoryDataService.getPinnedRepositoriesRawData(name)
    }

    public getRawRepositoryByName(name: string): Observable<any> {
        return this.repositoryDataService.getRepositoryByName(name)
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

    private mapRepositoryData(rawRepository: IRepositoryRawData): IRepository {
        const repository: IRepository = {} as IRepository;
        repository.name = rawRepository.name;
        repository.readmeMd = rawRepository?.readmeMd?.text
        repository.readmeRst = rawRepository?.readmeRst?.text
        repository.commits = rawRepository.ref?.target?.history?.edges
            .map((rawCommit: IRawCommit) => {
                const commit: IRepositoryCommit = {} as IRepositoryCommit
                commit.message = rawCommit?.node?.messageHeadline;
                commit.date = rawCommit?.node?.pushedDate
                commit.contributor = rawCommit?.node?.committer?.user?.login
                commit.sha = rawCommit?.node?.oid

                return commit
            })

        return repository;
    }
}
