import Aside from "../Aside";
import RepoCard from "./CardProject";
import { useState, useEffect, useCallback } from "react";
import { Repo } from "../../data/github";
import Spinner from "../Spinner";
import SearchRepo from "./SearchProject";
import { getGithubUserData } from "../../helpers/localstorage";
import GithubLogin from "./GithubDataUser";

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
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [githubUserData, setGithubUserData] = useState<GithubData>(
        getGithubUserData()
    );

    useEffect(() => {
        if (githubUserData && githubUserData.username) {
            callRepositoriesRequest();
        }
    }, [githubUserData]);

    const callRepositoriesRequest = useCallback(() => {
        const URL = `https://api.github.com/search/repositories?q=user:${githubUserData.username}`;
        setIsLoading(true);
        fetch(URL, {
            headers: {
                Authorization: `Bearer ${githubUserData.access_token}`,
            },
            method: "GET",
        })
            .then((res) => {
                if (!res.ok) {
                    if (res.status === 401) {
                        setShowLogin(true);
                    } else {
                        throw new Error(`Error: ${res.status}`);
                    }
                }
                return res.json();
            })
            .then((data) => {
                const reposWithData = data.items.filter(
                    (repo) => repo.language !== null && hasCommits(repo)
                );
                setRepositories(reposWithData);
                setFilteredRepositories(reposWithData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch repositories:", error);
                setIsLoading(false);
            });
    }, [githubUserData]);

    function hasCommits(repo: Repo) {
        const updated_at = new Date(repo.updated_at);
        const pushed_at = new Date(repo.pushed_at);
        return updated_at.getTime() !== pushed_at.getTime();
    }

    return (
        <>
            {showLogin ? (
                <GithubLogin
                    isAsideOpen={isAsideOpen}
                    colsAside={colsAside}
                    colMain={colMain}
                    errorMessage="Bad credentials, please login again."
                />
            ) : (
                <>
                    <div className={colsAside}>
                        <Aside isAsideOpen={isAsideOpen} type={"github"} />
                    </div>
                    <div className={`bg-[#161922] ${colMain}`}>
                        {isLoading ? (
                            <div className="col-start-6 flex justify-center items-center h-screen">
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
                                        className={`px-8 pt-10 md:px-20 md:pt-20 grid grid-cols-12 gap-6 height`}
                                    >
                                        {filteredRepositories.map(
                                            (card, index) => (
                                                <RepoCard
                                                    key={index}
                                                    repo={card}
                                                    githubUserData={
                                                        githubUserData
                                                    }
                                                    setGithubUserData={
                                                        setGithubUserData
                                                    }
                                                />
                                            )
                                        )}
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
            )}
        </>
    );
}
