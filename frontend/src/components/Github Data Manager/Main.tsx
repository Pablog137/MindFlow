import Aside from "../../components/Dashboard/Aside";
import RepoCard from "./RepoCard";
import { useState, useEffect } from "react";
import { Repo } from "../../data/github";
import Spinner from "../Spinner";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [repositories, setRepositories] = useState<Repo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        callRepositoriesRequest();
    }, []);

    function callRepositoriesRequest() {
        const username = "Pablog137";
        const URL = `https://api.github.com/search/repositories?q=user:${username}`;
        setIsLoading(true);
        fetch(URL, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_GIT_TOKEN}`,
            },
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                const reposWithData: Repo[] = data.items.filter(
                    (repo: Repo) => repo.language !== null && hasCommits(repo)
                );
                setRepositories(reposWithData);
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
            <div className="grid grid-cols-12 ">
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>

                <div
                    className={`text-white bg-[#161922] px-8 pt-20 md:px-20 md:pt-40 grid grid-cols-12 gap-6 height ${colMain}`}
                >
                    {isLoading ? (
                        <div className="col-start-6 flex justify-center items-center ">
                            <Spinner />
                        </div>
                    ) : (
                        repositories &&
                        repositories.map((card, index) => (
                            <RepoCard key={index} repo={card} />
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
