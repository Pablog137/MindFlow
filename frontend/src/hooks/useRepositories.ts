import { useState, useEffect } from "react";
import { getGithubUserData } from "../helpers/localstorage";

const useRepositories = () => {
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

    const callRepositoriesRequest = () => {
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
                    (repo: Repo) => repo.language !== null && hasCommits(repo)
                );
                setRepositories(reposWithData);
                setFilteredRepositories(reposWithData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch repositories:", error);
                setIsLoading(false);
            });
    };

    function hasCommits(repo: Repo) {
        const updated_at = new Date(repo.updated_at);
        const pushed_at = new Date(repo.pushed_at);
        return updated_at.getTime() !== pushed_at.getTime();
    }

    return {
        repositories,
        filteredRepositories,
        setFilteredRepositories,
        showLogin,
        isLoading,
        githubUserData,
        setGithubUserData,
    };
};

export default useRepositories;
