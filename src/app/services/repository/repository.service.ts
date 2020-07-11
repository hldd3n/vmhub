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
}, {
    name: 'sec',
    license: 'da',
    commits: 33,
    contributors: ['opa', 'ilko'],
    releases: '4.2.2',
    branches: ['feature', 'epic'],
}]]

export interface IRawCommit {
    node: {
        messageHeadline: string
        pushedDate: string
        committer: {
            user: {
                login: string,
            },
        },
        resourcePath: string;
    }
}

export interface IRawName {
    name: string,
}

export interface IRepositoryRawData {
    name: string;
    licenseInfo: {
        name: string,
        description?: string,
    },
    ref: {
        target: {
            history: {
                totalCount: number,
                pageInfo: {
                    hasNextPage: boolean,
                    endCursor: string
                },
                edges: IRawCommit[],
            }
        }
    },
    releases: {
        nodes: IRawName[]
    }
    refs: {
        nodes: IRawName[]
    }
}

export interface IRepositoryLicense {
    name: string,
    description?: string,
}

export interface IRepositoryCommit {
    message: string,
    date: string,
    contributor: string,
    resourcePath: string,
}

export interface IRepository {
    name: string,
    license: IRepositoryLicense,
    commitsCount: number;
    commits: IRepositoryCommit[],
    releases: string[],
    branches: string[],
}

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
            repository.license = node.licenseInfo
            repository.commitsCount = node.ref.target.history.totalCount
            repository.commits = node.ref.target.history.edges
                .map((rawCommit: IRawCommit) => {
                    const commit: IRepositoryCommit = {} as IRepositoryCommit
                    commit.message = rawCommit?.node?.messageHeadline;
                    commit.date = rawCommit?.node?.pushedDate
                    console.log('rawNode', rawCommit?.node?.committer?.user)
                    commit.contributor = rawCommit?.node?.committer?.user?.login
                    commit.resourcePath = rawCommit?.node?.resourcePath

                    return commit
                })
            console.log('rlss', node.releases);
            repository.releases = node.releases.nodes.map((rawRelease: IRawName) => rawRelease.name)
            repository.branches = node.refs.nodes.map((rawBranch: IRawName) => rawBranch.name)
            return repository;

        });
        console.log(repositoriesArray)
        return repositoriesArray
    }
    public async getRawRepositories(): Promise<any> {
        const rawData = await this.repositoryDataService.getPinnedRepositoriesRawData('vmware').toPromise();
        if (rawData?.data?.errors?.length) {
            console.log(rawData)
            return []
        };

        return rawData?.data.repositoryOwner.pinnedItems.nodes
    }
}
