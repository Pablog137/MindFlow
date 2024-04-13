import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Card } from "../../data/github";
import Tooltip from "@mui/material/Tooltip";
import BasicPie from "../PieChart";

type Icon = {
    [key: string]: string | { [key: string]: string };
};
const icons: Icon = {
    visibility: {
        Public: "fa fa-globe",
        Private: "fa fa-lock",
    },
    issues: "fa fa-exclamation-circle",
    commits: "fa fa-code-branch",
    lastUpdatedAt: "fa-regular fa-clock",
    createdAt: "fa-regular fa-calendar-alt",
    cloneUrl: "fa fa-copy",
};

type IssueColors = {
    [key: string]: string;
};
const issueColors: IssueColors = {
    Bug: "bg-red-300",
    Feature: "bg-green-300",
    Enhancement: "bg-blue-300",
    Documentation: "bg-yellow-300",
};

export default function GithubIndividualProject() {
    const { state } = useLocation();
    const { repo } = state;
    const [repoInfo] = useState<Card | null>(repo);

    const navigateToMainPage = () => {
        window.history.back();
    };

    const getTotalLines = () => {
        return Object.values(repo.languages[0]).reduce(
            (acc, curr) => acc + curr,
            0
        );
    };

    return (
        <>
            <i
                className="fa-regular fa-circle-left text-white text-xl pt-5 ps-5"
                onClick={navigateToMainPage}
            ></i>

            <div className="grid grid-cols-12 px-10 py-5 md:px-10 md:py-10 xl:px-14 xl:pt-20 gap-2">
                <div className="col-span-12 lg:col-span-3 grid">
                    <div className="col-span-12 md:col-span-6 bg-white rounded-sm p-8 ">
                        <h2 className="text-xl text-center font-bold pb-4">
                            Last commits
                        </h2>

                        {repoInfo?.commits.map((commit) => (
                            <ul
                                key={commit.id}
                                className="bg-gray-100 p-6 rounded-md mb-4"
                            >
                                <li className="flex items-center pb-5">
                                    <img
                                        src={commit.img}
                                        alt=""
                                        style={{ width: "25px" }}
                                    />
                                    <h3 className="text-lg font-bold mx-auto">
                                        {commit.committer}
                                    </h3>
                                </li>

                                <li className="text-md gap-2 flex items-center mb-2">
                                    <i className="fa-regular fa-message text-green-400"></i>
                                    <span>{commit.message}</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <i
                                        className={`${icons.createdAt} text-purple-400`}
                                    ></i>
                                    <p>Commited At : {commit.createdAt}</p>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6 text-black rounded-md justify-center items-center px-8 lg:px-12 py-12 md:py-6 bg-gray-200 text-lg">
                    <h1 className="text-4xl font-semibold text-center mb-6">
                        {repoInfo?.name}
                    </h1>
                    <p className="py-4">{repoInfo?.description}</p>
                    <ul className="mt-6 flex flex-col gap-2">
                        <li className="flex items-center gap-2">
                            <i
                                className={`${
                                    icons.visibility[repoInfo?.visibility]
                                } text-purple-300 mr-1`}
                            ></i>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800">
                                    Visibility :{" "}
                                </p>
                                <span>{repoInfo?.visibility}</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-2">
                            <i className={`${icons.issues} text-red-300`}></i>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800">
                                    Issues :{" "}
                                </p>
                                <span>{repoInfo?.issueCount}</span>
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
                                <span>{repoInfo?.commitsCount}</span>
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
                                <span>{repoInfo?.lastUpdatedAt}</span>
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
                                <span>{repoInfo?.createdAt}</span>
                            </div>
                        </li>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${icons.cloneUrl} text-indigo-300`}
                            ></i>
                            <div className="flex items-center gap-2">
                                <p className="font-semibold text-gray-800">
                                    Clone URL:{" "}
                                </p>
                                <span>{repoInfo?.cloneUrl}</span>
                            </div>
                        </li>
                    </ul>
                    <div className="text-white mt-20 text-xl grid grid-cols-12 ">
                        <div className="col-span-12 2xl:col-span-6 flex items-center flex-col mb-6 2xl:mb-0">
                            <h2 className="text-gray-400 text-2xl font-bold">
                                Contributors
                            </h2>
                            <ul className="mt-5 text-black flex flex-wrap md:pr-5">
                                {repoInfo?.contributors.map(
                                    (contributor, index) => (
                                        <Tooltip
                                            title={contributor.name}
                                            arrow
                                            key={index}
                                        >
                                            <li className="flex-shrink-0 mr-3 mb-3">
                                                <img
                                                    src={contributor.img}
                                                    alt=""
                                                    style={{ width: "35px" }}
                                                />
                                            </li>
                                        </Tooltip>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="text-black text-xl col-span-12 2xl:col-span-6 flex items-center flex-col">
                            <h2 className="text-gray-400 text-2xl font-bold">
                                Languages
                            </h2>
                            <BasicPie
                                data={
                                    repoInfo?.languages.map((languageObj) => {
                                        return Object.entries(languageObj).map(
                                            ([language, lines]) => {
                                                return {
                                                    label: language,
                                                    value: (
                                                        (lines /
                                                            getTotalLines()) *
                                                        100
                                                    ).toFixed(2),
                                                };
                                            }
                                        );
                                    })[0]
                                }
                                width={400}
                                height={200}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-3 text-black grid  gap-4">
                    <div className="col-span-12 md:col-span-6 bg-white rounded-sm p-8 ">
                        <h2 className="text-xl text-center font-bold pb-4">
                            Last Issues
                        </h2>
                        {repoInfo?.issues.map((issue) => (
                            <ul
                                key={issue.id}
                                className="bg-gray-100 p-6 rounded-md mb-4"
                            >
                                <li className="flex items-center pb-5">
                                    <img
                                        src={issue.img}
                                        alt=""
                                        style={{ width: "25px" }}
                                    />
                                    <h3 className="text-lg font-bold mx-auto">
                                        {issue.creator}
                                    </h3>
                                </li>

                                <li className="text-lg font-semibold pb-4 text-center">
                                    {issue.title}
                                </li>
                                <li className="text-md mb-2">
                                    Status : {issue.status}
                                </li>
                                <li className="text-md flex items-center gap-2 mb-2">
                                    <p>{issue.name}</p>
                                    <span
                                        className={`${
                                            issueColors[issue.name]
                                        } p-1 w-5 h-4 rounded-2xl
                                                } flex justify-center items-center text-xs font-bold text-gray-800`}
                                    ></span>
                                </li>
                                <li className="text-md">
                                    Created At : {issue.createdAt}
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
