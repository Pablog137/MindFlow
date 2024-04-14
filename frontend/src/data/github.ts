export type Card = {
    id: number;
    name: string;
    updated_at: string;
    visibility: string;
    open_issues_count: number;
    commitsCount: number;
    languages: Language[];
    description: string;
    createdAt: string;
    cloneUrl: string;
    contributors: Contributor[];
    issues: Issue[];
    commits: Commit[];
};

type Contributor = {
    name: string;
    img: string;
};

type Issue = {
    id: number;
    title: string;
    status: string;
    createdAt: string;
    name: string;
    color: string;
    img: string;
    creator: string;
};

export type Language = {
    [key: string]: number;
};

type Commit = {
    id: number;
    message: string;
    createdAt: string;
    committer: string;
    img: string;
};

// Show projects

export type Repo = {
    id: number;
    name: string;
    updated_at: string;
    visibility: string;
    open_issues_count: number;
    created_at: string;
    pushed_at: string;
    url: string;
    language?: string;
};

export type IconRepo = {
    visibility: {
        public: string;
        private: string;
    };
    issues: string;
    commits: string;
    lastUpdatedAt: string;
};

// Show Details Project

export type IconShowProject = {
    visibility: {
        public: string;
        private: string;
    };
    issues: string;
    commits: string;
    lastUpdatedAt: string;
    createdAt: string;
    cloneUrl: string;
};
export type CommitShowProject = {
    node_id: string;
    commit: {
        message: string;
        committer: {
            date: string;
        };
    };
    author: {
        login: string;
        avatar_url: string;
    };
};

export type ContributorShowProject = {
    login: string;
    avatar_url: string;
};

export type IssueShowProject = {
    id: number;
    title: string;
    state: string;
    created_at: string;
    labels: {
        name: string;
    }[];
    user: {
        avatar_url: string;
        login: string;
    };
};

export type IssueColors = {
    [key: string]: string;
};
