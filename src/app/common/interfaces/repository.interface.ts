export interface IRepository {
    name: string,
    readme: string,
    license: IRepositoryLicense,
    commitsCount: number;
    commits: IRepositoryCommit[],
    releases: string[],
    branches: string[],
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