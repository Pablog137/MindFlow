import Aside from "../../components/Dashboard/Aside";
import RepoCard from "./RepoCard";
import { useState, useEffect } from "react";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        callRepositoriesRequest();
    }, []);

    function callRepositoriesRequest() {
        const username = "Pablog137";
        const URL = `https://api.github.com/search/repositories?q=user:${username}`;
        const API_TOKEN = "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";

        fetch(URL, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setRepositories(data.items);
            });
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
                    {repositories.map((card, index) => (
                        <RepoCard key={index} repo={card} />
                    ))}
                </div>
            </div>
        </>
    );
}
