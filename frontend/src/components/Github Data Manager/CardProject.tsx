import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Repo, IconRepo } from "../../data/github";
import { getGithubUserData } from "../../helpers/localstorage";

const icons: IconRepo = {
    visibility: {
        public: "fa fa-globe",
        private: "fa fa-lock",
    },
    issues: "fa fa-exclamation-circle",
    commits: "fa fa-code-branch",
    lastUpdatedAt: "fa-regular fa-clock",
};

type Props = {
    repo: Repo;
    githubUserData: GithubData;
    setGithubUserData: (data: GithubData) => void;
};

export default function RepoCard({
    repo,
    githubUserData,
    setGithubUserData,
}: Props) {
    const [commitCount, setCommitCount] = useState(0);

    useEffect(() => {
        if (!githubUserData) setGithubUserData(getGithubUserData());
        fetch(`${repo.url}/commits`, {
            headers: {
                Authorization: `Bearer ${githubUserData.access_token}`,
            },
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    setCommitCount(0);
                    return;
                }
                setCommitCount(data.length);
            });
    }, []);

    function getFormattedDate(date: string) {
        const newDate = new Date(date);
        return newDate.toISOString().split("T")[0];
    }

    function getVisibilityIcon() {
        return icons.visibility[
            repo.visibility as keyof typeof icons.visibility
        ];
    }

    return (
        <div className="bg-white rounded-md col-span-12 md:col-span-6 xl:col-span-4 p-4 max-h-96 flex flex-col justify-between ">
            <h1 className="text-black text-center text-xl lg:text-2xl font-bold">
                {repo.name}
            </h1>
            <ul className="text-gray-700 font-semibold px-4 pt-10 text-md xl:px-8 ">
                <li className="flex justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <i
                            className={`${icons.lastUpdatedAt} text-purple-300`}
                        ></i>
                        <p>Last updated at :</p>
                    </div>
                    <span>{getFormattedDate(repo.updated_at)}</span>
                </li>
                <li className="flex justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <i
                            className={`${getVisibilityIcon()} text-purple-300`}
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
                    <span>{repo.open_issues_count}</span>
                </li>
                <li className="flex justify-between pb-2">
                    <div className="flex items-center gap-2">
                        <i className={`${icons.commits} text-purple-300`}></i>
                        <p>Commits :</p>
                    </div>
                    <span>{commitCount}</span>
                </li>
            </ul>
            <div className="flex justify-center mt-5">
                <Link
                    to={`viewRepo/${repo.id}`}
                    state={{ repo, commitCount, githubUserData }}
                >
                    <button className="bg-purple-500 text-white font-bold py-1 lg:py-2 px-4 lg:px-8 text-md lg:text-lg rounded-md">
                        Details
                    </button>
                </Link>
            </div>
        </div>
    );
}
