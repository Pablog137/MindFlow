import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import BasicPie from "../PieChart";
import {
    IconShowProject,
    CommitShowProject,
    ContributorShowProject,
    IssueShowProject,
    Language,
    IssueColors,
} from "../../data/github";

const icons: IconShowProject = {
    visibility: {
        public: "fa fa-globe",
        private: "fa fa-lock",
    },
    issues: "fa fa-exclamation-circle",
    commits: "fa fa-code-branch",
    lastUpdatedAt: "fa-regular fa-clock",
    createdAt: "fa-regular fa-calendar-alt",
    cloneUrl: "fa fa-copy",
};

const issueColors: IssueColors = {
    bug: "bg-red-300",
    feature: "bg-green-300",
    enhancement: "bg-blue-300",
    documentation: "bg-yellow-300",
};

export default function GithubIndividualProject() {
    const { state } = useLocation();
    const { repo, commitCount } = state;
    const [repoInfo] = useState(repo);
    const [contributors, setContributors] = useState<ContributorShowProject[]>(
        []
    );
    const [languages, setLanguages] = useState<Language[]>([]);
    const [commits, setCommits] = useState<CommitShowProject[]>([]);
    const [issues, setIssues] = useState<IssueShowProject[]>([]);

    function getFormattedDate(date: string) {
        const newDate = new Date(date);
        return newDate.toISOString().split("T")[0];
    }

    async function fetchData(url: string, API_TOKEN: string): Promise<any> {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        });
        const data = await response.json();
        return data.message ? [] : data;
    }

    useEffect(() => {
        const API_TOKEN = import.meta.env.VITE_GIT_TOKEN;
        const URLS = [
            repoInfo.contributors_url,
            repoInfo.languages_url,
            repoInfo.commits_url.replace("{/sha}", ""),
            repoInfo.issues_url.replace("{/number}", ""),
        ];

        async function fetchDataAndSetState() {
            try {
                const [
                    contributorsData,
                    languagesData,
                    commitsData,
                    issuesData,
                ] = await Promise.all(
                    URLS.map((url) => fetchData(url, API_TOKEN))
                );

                setContributors(contributorsData);
                setLanguages(languagesData);
                setCommits(commitsData);
                setIssues(issuesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchDataAndSetState();
    }, []);

    const navigateToMainPage = () => {
        window.history.back();
    };
    const getTotalLines = (): number => {
        return Object.values(languages).reduce((acc, lines) => acc + lines, 0);
    };

    const getVisibilityIcon = () => {
        return icons.visibility[
            repoInfo.visibility as keyof typeof icons.visibility
        ];
    };

    return (
        <>
            <i
                className="fa-regular fa-circle-left text-white text-xl pt-5 ps-5"
                onClick={navigateToMainPage}
            ></i>

            <div className="grid grid-cols-12 px-10 py-5 md:px-10 md:py-10 xl:px-14 xl:pt-20 gap-2">
                <div className="col-span-12 2xl:col-span-3 grid">
                    <div className="col-span-12 md:col-span-6 bg-white rounded-sm p-8 ">
                        <h2 className="text-xl text-center font-bold pb-4">
                            Last commits
                        </h2>

                        {commits &&
                            commits.map((commit) => (
                                <ul
                                    key={commit.node_id}
                                    className="bg-gray-100 p-6 rounded-md mb-4"
                                >
                                    <li className="flex items-center pb-5">
                                        <img
                                            src={commit.author?.avatar_url}
                                            alt=""
                                            style={{ width: "25px" }}
                                        />
                                        <h3 className="text-lg font-bold mx-auto">
                                            {commit.author?.login}
                                        </h3>
                                    </li>

                                    <li className="text-md gap-2 flex items-center  mb-2">
                                        <i className="fa-regular fa-message text-green-400"></i>
                                        <span>{commit.commit.message}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <i
                                            className={`${icons.createdAt} text-purple-400`}
                                        ></i>
                                        <p>
                                            Commited At :{" "}
                                            {commit.commit.committer.date}
                                        </p>
                                    </li>
                                </ul>
                            ))}
                    </div>
                </div>
                <div className="col-span-12 2xl:col-span-6 text-black rounded-md justify-center items-center px-6 2xl:px-12 py-12 md:py-6 bg-gray-200 text-md lg:text-lg">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-6">
                        {repoInfo?.name}
                    </h1>
                    <p className="py-4">{repoInfo?.description}</p>
                    <ul className="mt-6 flex flex-col gap-2">
                        <li className="flex items-center gap-2">
                            <i
                                className={`${getVisibilityIcon()} text-purple-300 mr-1`}
                            ></i>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800">
                                    Visibility :{" "}
                                </p>
                                <span>{repoInfo.visibility}</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-2">
                            <i className={`${icons.issues} text-red-300`}></i>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800">
                                    Issues :{" "}
                                </p>
                                <span>{repoInfo.open_issues_count}</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${icons.commits} text-green-300`}
                            ></i>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800">
                                    Commits :{" "}
                                </p>
                                <span>{commitCount}</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${icons.lastUpdatedAt} text-blue-300`}
                            ></i>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800">
                                    Last updated at :{" "}
                                </p>
                                <span>
                                    {getFormattedDate(repoInfo.updated_at)}
                                </span>
                            </div>
                        </li>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${icons.createdAt} text-purple-400`}
                            ></i>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800">
                                    Created At :{" "}
                                </p>
                                <span>{repoInfo.created_at}</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-2 ">
                            <i
                                className={`${icons.cloneUrl} text-indigo-300`}
                            ></i>
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold text-gray-800">
                                    Clone URL:{" "}
                                </p>
                                <div className="whitespace-normal">
                                    <span>{repoInfo.clone_url}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div className="text-white mt-20 text-xl grid grid-cols-12 ">
                        <div className="col-span-12 sm:col-span-6 flex items-center flex-col mb-6 2xl:mb-0">
                            <h2 className="text-gray-400 text-2xl font-bold">
                                Contributors
                            </h2>
                            <ul className="mt-5 text-black flex flex-wrap md:pr-5">
                                {contributors &&
                                    contributors.map((contributor, index) => (
                                        <Tooltip
                                            title={contributor.login}
                                            arrow
                                            key={index}
                                        >
                                            <li className="flex-shrink-0 mr-3 mb-3">
                                                <img
                                                    src={contributor.avatar_url}
                                                    alt=""
                                                    style={{ width: "40px" }}
                                                />
                                            </li>
                                        </Tooltip>
                                    ))}
                            </ul>
                        </div>
                        <div className="text-black text-xl col-span-12 sm:col-span-6 flex items-center flex-col">
                            <h2 className="text-gray-400 text-2xl font-bold">
                                Languages
                            </h2>
                            {languages && (
                                <BasicPie
                                    data={Object.entries(languages).map(
                                        ([language, lines]) => {
                                            return {
                                                label: language,
                                                value: (
                                                    (parseInt(lines) /
                                                        getTotalLines()) *
                                                    100
                                                ).toFixed(2),
                                            };
                                        }
                                    )}
                                    width={400}
                                    height={200}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-12 2xl:col-span-3 text-black grid  gap-4">
                    <div className="col-span-12 md:col-span-6 bg-white rounded-sm p-8 ">
                        <h2 className="text-xl text-center font-bold pb-4">
                            Last Issues
                        </h2>
                        {issues &&
                            issues.map((issue) => (
                                <ul
                                    key={issue.id}
                                    className="bg-gray-100 p-6 rounded-md mb-4"
                                >
                                    <li className="flex items-center pb-5">
                                        <img
                                            src={issue.user.avatar_url}
                                            alt=""
                                            style={{ width: "25px" }}
                                        />
                                        <h3 className="text-lg font-bold mx-auto">
                                            {issue.user.login}
                                        </h3>
                                    </li>

                                    <li className="text-lg font-semibold pb-4 text-center">
                                        {issue.title}
                                    </li>
                                    <li className="text-md mb-2">
                                        Status : {issue.state}
                                    </li>
                                    <li className="text-md flex items-center gap-2 mb-2">
                                        <p>{issue.labels[0].name}</p>
                                        <span
                                            className={`${
                                                issueColors[
                                                    issue.labels[0].name
                                                ]
                                            } p-1 w-5 h-4 rounded-2xl
                                                } flex justify-center items-center text-xs font-bold text-gray-800`}
                                        ></span>
                                    </li>
                                    <li className="text-md">
                                        Created At : {issue.created_at}
                                    </li>
                                </ul>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
