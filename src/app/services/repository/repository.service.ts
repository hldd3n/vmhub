import { Injectable } from '@angular/core';
import { RepositoryDataService } from '../data/repository-data.service';
import { IRepositoryCommit, IRepository } from '../../common/interfaces/repository.interface';
import { IRepositoryRawData, IRawCommit, IRawName } from '../../common/interfaces/repository-raw.interface';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable()
export class RepositoryService {
    constructor(
        private readonly repositoryDataService: RepositoryDataService,
    ) { }

    public readonly selectedRepository$ = new ReplaySubject<IRepository>(1)

    public async getRepositories(): Promise<IRepository[]> {
        const repositoriesRaw = await this.getRawRepositories()

        if (!repositoriesRaw.length) {
            return []
        }

        const repositoriesWithoutContributors: IRepository[] = repositoriesRaw.map((node: IRepositoryRawData) => {
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
                    commit.resourcePath = rawCommit?.node?.resourcePath

                    return commit
                })
            repository.releases = node.releases.nodes.map((rawRelease: IRawName) => rawRelease.name)
            repository.branches = node.refs.nodes.map((rawBranch: IRawName) => rawBranch.name)
            return repository;
        });

        const repositoriesArray = await Promise.all(repositoriesWithoutContributors.map(async (repository: IRepository) => {
            const contributors = await this.repositoryDataService.getContributorsPerRepo('vmware', repository.name).toPromise();
            repository.contributors = contributors.map((contributor) => ({ name: contributor.login, commits: contributor.contributions }) )
            return repository;
        }))
        console.log(repositoriesArray)
        return repositoriesArray
    }

    public async getRawRepositories(): Promise<any> {
        const rawData = await this.repositoryDataService.getPinnedRepositoriesRawData('vmware').toPromise();
        if (rawData?.data?.errors?.length) {
            return []
        };
        console.log(rawData);
        return rawData?.data?.repositoryOwner.pinnedItems.nodes
    }

    public selectRepository(repository: IRepository) {
        this.selectedRepository$.next(repository);
    }
}
