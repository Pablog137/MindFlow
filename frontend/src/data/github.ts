export type Card = {
    id: number;
    name: string;
    lastUpdatedAt: string;
    visibility: string;
    issueCount: number;
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

type Language = {
    [key: string]: number;
};

type Commit = {
    id: number;
    message: string;
    createdAt: string;
    committer: string;
    img: string;
};

export const cards: Card[] = [
    {
        id: 1,
        name: "Project A",
        lastUpdatedAt: "2024-04-09",
        visibility: "Public",
        issueCount: 5,
        commitsCount: 10,
        languages: [
            {
                PHP: 10000,
                Javascript: 5000,
            },
        ],
        description:
            "An incredible project that is revolutionizing the world of web development.",
        createdAt: "2024-01-15",
        cloneUrl: "https://github.com/project-a",
        contributors: [
            {
                name: "user1",
                img: "../../../public/images/user.png",
            },
            {
                name: "user2",
                img: "../../../public/images/user.png",
            },
            {
                name: "user3",
                img: "../../../public/images/user.png",
            },
        ],
        issues: [
            {
                id: 1,
                title: "Fix Bug on the home page",
                status: "Open",
                createdAt: "2024-03-25",
                name: "Bug",
                color: "red",
                img: "../../../public/images/user.png",
                creator: "user1",
            },
            {
                id: 2,
                title: "Implement new chat functionality",
                status: "In progress",
                createdAt: "2024-02-18",
                name: "Feature",
                color: "green",
                img: "../../../public/images/user.png",
                creator: "user1",
            },
        ],
        commits: [
            {
                id: 1,
                message: "Fixed syntax error in the main file",
                createdAt: "2024-03-30",
                committer: "user1",
                img: "../../../public/images/user.png",
            },
            {
                id: 2,
                message: "Added new user profile page",
                createdAt: "2024-03-28",
                committer: "user2",
                img: "../../../public/images/user.png",
            },
        ],
    },
    {
        id: 2,
        name: "Project B",
        lastUpdatedAt: "2024-04-08",
        visibility: "Private",
        issueCount: 2,
        commitsCount: 8,
        languages: [
            {
                PHP: 10000,
                Javascript: 5000,
            },
        ],
        description: "A web application for task management.",
        createdAt: "2024-02-10",
        cloneUrl: "https://github.com/project-b",
        contributors: [
            {
                name: "user1",
                img: "../../../public/images/user.png",
            },
            {
                name: "user2",
                img: "../../../public/images/user.png",
            },
            {
                name: "user3",
                img: "../../../public/images/user.png",
            },
            {
                name: "user1",
                img: "../../../public/images/user.png",
            },
            {
                name: "user2",
                img: "../../../public/images/user.png",
            },
            {
                name: "user3",
                img: "../../../public/images/user.png",
            },
        ],
        issues: [
            {
                id: 1,
                title: "Update homepage design",
                status: "In progress",
                createdAt: "2024-03-20",
                name: "Bug",
                color: "red",
                img: "../../../public/images/user.png",
                creator: "user1",
            },
            {
                id: 2,
                title: "Resolve security issue in the backend",
                status: "Open",
                createdAt: "2024-04-01",
                name: "Bug",
                color: "red",
                img: "../../../public/images/user.png",
                creator: "user1",
            },
        ],
        commits: [
            {
                id: 1,
                message: "Optimized task search algorithm",
                createdAt: "2024-03-25",
                committer: "user4",
                img: "../../../public/images/user.png",
            },
            {
                id: 2,
                message: "Added email notification functionality",
                createdAt: "2024-03-22",
                committer: "user5",
                img: "../../../public/images/user.png",
            },
        ],
    },
    {
        id: 3,
        name: "Project C",
        lastUpdatedAt: "2024-04-05",
        visibility: "Public",
        issueCount: 3,
        commitsCount: 12,
        languages: [
            {
                PHP: 10000,
                Javascript: 5000,
            },
        ],
        description: "An educational platform for learning programming.",
        createdAt: "2024-03-01",
        cloneUrl: "https://github.com/project-c",
        contributors: [
            {
                name: "user1",
                img: "../../../public/images/user.png",
            },
            {
                name: "user2",
                img: "../../../public/images/user.png",
            },
            {
                name: "user3",
                img: "../../../public/images/user.png",
            },
        ],
        issues: [
            {
                id: 1,
                title: "Fix logic error in the exercises module",
                status: "In progress",
                createdAt: "2024-03-28",
                name: "Bug",
                color: "red",
                img: "../../../public/images/user.png",
                creator: "user1",
            },
            {
                id: 2,
                title: "Update third-party libraries",
                status: "Open",
                createdAt: "2024-04-02",
                name: "Bug",
                color: "red",
                img: "../../../public/images/user.png",
                creator: "user1",
            },
        ],
        commits: [
            {
                id: 1,
                message: "Added new practice exercises",
                createdAt: "2024-03-30",
                committer: "user6",
                img: "../../../public/images/user.png",
            },
            {
                id: 2,
                message: "Improved integration with authentication API",
                createdAt: "2024-04-01",
                committer: "user8",
                img: "../../../public/images/user.png",
            },
        ],
    },
];
