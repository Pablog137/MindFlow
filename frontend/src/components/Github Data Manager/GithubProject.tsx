import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Card } from "../../data/github";

const icons = {
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

export default function GithubProject() {
    const { state } = useLocation();
    const { repo } = state;
    const [repoInfo, setRepoInfo] = useState<Card | null>(repo);

    console.log(repoInfo);

    return (
        <>
            <i className="fa-regular fa-circle-left text-white text-xl pt-5 ps-5"></i>

            <div className="grid grid-cols-12 px-10 py-5 md:px-20 md:py-10 xl:px-28 xl:pt-12">
                <div className="col-span-6 text-white">
                    <h1 className="text-3xl font-semibold">{repoInfo?.name}</h1>
                    <p className="text-md py-4">{repoInfo?.description}</p>
                    <ul>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${
                                    icons.visibility[repoInfo?.visibility]
                                } text-purple-300`}
                            ></i>
                            <p>Visibility : {repoInfo?.visibility}</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <i className={`${icons.issues} text-red-300`}></i>
                            <p>Issues : {repoInfo?.issueCount}</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${icons.commits} text-green-300`}
                            ></i>
                            <p>Commits : {repoInfo?.commitsCount}</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${icons.lastUpdatedAt} text-blue-300`}
                            ></i>
                            <p>Last updated at : {repoInfo?.lastUpdatedAt}</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${icons.createdAt} text-yellow-300`}
                            ></i>
                            <p>Created At : {repoInfo?.createdAt}</p>
                        </li>
                        <li className="flex items-center gap-2">
                            <i
                                className={`${icons.cloneUrl} text-indigo-300`}
                            ></i>
                            <p>Clone URL : {repoInfo?.cloneUrl}</p>
                        </li>
                    </ul>
                    <div className="text-white mt-20 text-xl">
                        <h2>Contributors</h2>
                        <ul>
                            {repoInfo?.contributors.map(
                                (contributor, index) => (
                                    <li key={index}>{contributor}</li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="text-white mt-20 text-xl">
                        <h2>Languages</h2>
                        <ul>
                            {repoInfo?.languages.map((language, index) => (
                                <li key={index}>{language}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-6 text-black grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 bg-white rounded-sm p-10 ">
                        <h2 className="text-xl text-center  font-semibold pb-4">
                            Last issues
                        </h2>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Provident fugiat enim sit sequi accusamus eius
                        aut, ex accusantium quo voluptas molestias, dolorum
                        nulla adipisci odit quis. Pariatur quisquam in nisi?
                        Dignissimos necessitatibus minus odit assumenda quam,
                        excepturi quisquam expedita error ipsa debitis facere
                        aliquid soluta nostrum nam eligendi atque laudantium
                        explicabo. Aliquid optio maiores, iste quo error vel sed
                        aliquam.
                    </div>
                    <div className="col-span-12 md:col-span-6 bg-white rounded-sm p-10 ">
                        <h2 className="text-xl text-center  font-semibold pb-4">
                            Last issues
                        </h2>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Provident fugiat enim sit sequi accusamus eius
                        aut, ex accusantium quo voluptas molestias, dolorum
                        nulla adipisci odit quis. Pariatur quisquam in nisi?
                        Dignissimos necessitatibus minus odit assumenda quam,
                        excepturi quisquam expedita error ipsa debitis facere
                        aliquid soluta nostrum nam eligendi atque laudantium
                        explicabo. Aliquid optio maiores, iste quo error vel sed
                        aliquam.
                    </div>
                </div>
            </div>
        </>
    );
}
