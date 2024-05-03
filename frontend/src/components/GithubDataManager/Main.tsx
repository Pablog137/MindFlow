import Aside from "../Aside";
import RepoCard from "./CardProject";
import { useState, useEffect } from "react";
import { Repo } from "../../data/github";
import Spinner from "../Spinner";
import SearchRepo from "./SearchProject";
import { getGithubUserData } from "../../helpers/localstorage";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [repositories, setRepositories] = useState<Repo[]>([]);
    const [filteredRepositories, setFilteredRepositories] = useState<Repo[]>(
        []
    );
    const [isLoading, setIsLoading] = useState(false);
    const [githubUserData, setGithubUserData] = useState<GithubData>(
        getGithubUserData()
    );

    useEffect(() => {
        callRepositoriesRequest();
    }, []);

    function callRepositoriesRequest() {
        const URL = `https://api.github.com/search/repositories?q=user:${githubUserData.username}`;
        setIsLoading(true);
        fetch(URL, {
            headers: {
                Authorization: `Bearer ${githubUserData.access_token}`,
            },
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                const reposWithData: Repo[] = data.items.filter(
                    (repo: Repo) => repo.language !== null && hasCommits(repo)
                );
                setRepositories(reposWithData);
                setFilteredRepositories(reposWithData);
                setIsLoading(false);
            });
    }

    function hasCommits(repo: Repo) {
        const updated_at = new Date(repo.updated_at);
        const pushed_at = new Date(repo.pushed_at);
        return updated_at.getTime() !== pushed_at.getTime();
    }

    return (
        <>
            <div className={colsAside}>
                <Aside isAsideOpen={isAsideOpen} />
            </div>
            <div className={`bg-[#161922] ${colMain}`}>
                {isLoading ? (
                    <div className="col-start-6 flex justify-center items-center h-screen ">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <div className="text-white pt-10 md:pt-15 flex justify-center items-center">
                            <SearchRepo
                                originalRepos={repositories}
                                setRepos={setFilteredRepositories}
                            />
                        </div>
                        {filteredRepositories.length > 0 ? (
                            <div
                                className={`px-8 pt-10 md:px-20 md:pt-20 grid grid-cols-12 gap-6 height `}
                            >
                                {filteredRepositories &&
                                    githubUserData &&
                                    filteredRepositories.map((card, index) => (
                                        <RepoCard
                                            key={index}
                                            repo={card}
                                            githubUserData={githubUserData}
                                            setGithubUserData={
                                                setGithubUserData
                                            }
                                        />
                                    ))}
                            </div>
                        ) : (
                            <h1 className="text-red-500 text-2xl h-screen text-center mt-40">
                                There are not results :(
                            </h1>
                        )}
                    </>
                )}
            </div>
        </>
    );
}