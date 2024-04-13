import { Link } from "react-router-dom";

type Card = {
    id: number;
    name: string;
    lastUpdatedAt: string;
    visibility: string;
    issueCount: number;
    commitsCount: number;
    languages: string[];
    description: string;
    createdAt: string;
    cloneUrl: string;
    contributors: string[];
    issues: Issue[];
    commits: Commit[];
};

type Issue = {
    id: number;
    title: string;
    status: string;
    createdAt: string;
};

type Commit = {
    id: number;
    message: string;
    createdAt: string;
    committer: string;
};

const icons = {
    visibility: {
        Public: "fa fa-globe",
        Private: "fa fa-lock",
    },
    issues: "fa fa-exclamation-circle",
    commits: "fa fa-code-branch",
    lastUpdatedAt: "fa-regular fa-clock",
};
export default function RepoCard({ repo }: { repo: Card }) {
    return (
        <div className="bg-white rounded-md col-span-12 md:col-span-6 xl:col-span-4 p-2 max-h-96 flex flex-col justify-between ">
            <h1 className="text-black text-center text-xl lg:text-2xl font-bold">
                {repo.name}
            </h1>
            <ul className="text-gray-700 font-semibold px-4 pt-10 text-md lg:px-8 lg:text-lg">
                <li className="flex justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <i
                            className={`${icons.lastUpdatedAt} text-purple-300`}
                        ></i>
                        <p>Last updated at :</p>
                    </div>
                    <span>{repo.lastUpdatedAt}</span>
                </li>
                <li className="flex justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <i
                            className={`${
                                icons.visibility[repo.visibility]
                            } text-purple-300`}
                        ></i>
                        <p>Visibility :</p>
                    </div>
                    <span>{repo.visibility}</span>
                </li>
                <li className="flex justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <i className={`${icons.issues} text-purple-300`}></i>
                        <p>Issues :</p>
                    </div>
                    <span>{repo.issueCount}</span>
                </li>
                <li className="flex justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <i className={`${icons.commits} text-purple-300`}></i>
                        <p>Commits :</p>
                    </div>
                    <span>{repo.commitsCount}</span>
                </li>
            </ul>
            <div className="flex justify-center mt-5">
                <Link to={`viewRepo/${repo.id}`} state={{ repo }}>
                    <button className="bg-purple-500 text-white font-bold py-1 lg:py-2 px-4 lg:px-8 text-md lg:text-lg rounded-md">
                        Details
                    </button>
                </Link>
            </div>
        </div>
    );
}
