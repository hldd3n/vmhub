export interface IRepository {
    name: string,
    readme: string,
    license: IRepositoryLicense,
    contributors: IContributor[],
    commitsCount: number;
    commits: IRepositoryCommit[],
    releases: string[],
    branches: string[],
}

export interface IContributor {
    name: string,
    commits: number,
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