import { Injectable } from '@angular/core';
import { RepositoryDataService } from '../data/repository-data.service';
import { IRepositoryCommit, IRepository } from '../../common/interfaces/repository.interface';
import { IRepositoryRawData, IRawCommit, IRawName } from '../../common/interfaces/repository-raw.interface';

@Injectable()
export class RepositoryService {
    constructor(
        private readonly repositoryDataService: RepositoryDataService,
    ) { }

    public async getRepositories(): Promise<IRepository[]> {
        const repositoriesRaw = await this.getRawRepositories()

        if (!repositoriesRaw.length) {
            return []
        }

        const repositoriesArray = repositoriesRaw.map((node: IRepositoryRawData) => {
            const repository: IRepository = {} as IRepository;
            repository.name = node.name;
            repository.readme = node.object?.text
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
        return repositoriesArray
    }
    public async getRawRepositories(): Promise<any> {
        const rawData = await this.repositoryDataService.getPinnedRepositoriesRawData('vmware').toPromise();
        if (rawData?.data?.errors?.length) {
            console.log(rawData)
            return []
        };
        console.log(rawData);
        return rawData?.data.repositoryOwner.pinnedItems.nodes
    }
}
