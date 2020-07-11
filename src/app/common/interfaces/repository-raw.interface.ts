export interface IRepositoryRawData {
    name: string,
    object: {
        text: string
    },
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
