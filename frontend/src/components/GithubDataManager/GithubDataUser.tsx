import { getLocalStorage, setLocalStorage } from "../../helpers/localstorage";
import Aside from "../Aside";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
    errorMessage?: string;
};

export default function GithubLogin({
    isAsideOpen,
    colsAside,
    colMain,
    errorMessage,
}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    function loginWithGithub() {
        window.location.assign(
            "https://github.com/login/oauth/authorize?client_id=" +
                import.meta.env.VITE_CLIENT_ID +
                "&scope=repo%20repo:status%20user"
        );
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");

        if (codeParam) {
            getAccessToken(codeParam);
        }
    }, []);

    async function getAccessToken(codeParam: string) {
        setIsLoading(true);
        const url = "/api/getAccessToken?code=" + codeParam;
        await fetch(import.meta.env.VITE_SERVER + url, {
            headers: {
                Authorization: `Bearer ${getLocalStorage("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setIsLoading(false);
                if (data.data) {
                    setLocalStorage("githubData", JSON.stringify(data.data));
                    window.location.href = "/github";
                }
            });
    }

    return (
        <>
            <div className={colsAside}>
                <Aside isAsideOpen={isAsideOpen} type="github" />
            </div>
            <div className={`bg-[#161922] ${colMain} h-screen`}>
                <div className="flex flex-col mt-40 justify-center items-center text-white">
                    {errorMessage ? (
                        <h1 className="py-8 text-md md:text-lg lg:text-2xl">
                            {errorMessage}
                            <i className="fa-solid fa-circle-exclamation ms-2 text-yellow-300"></i>
                        </h1>
                    ) : (
                        <h1 className="py-8 text-md md:text-lg lg:text-2xl">
                            You need to login with Github to access this section
                        </h1>
                    )}
                    <i
                        className="fa-brands fa-github py-6"
                        style={{ fontSize: "4rem" }}
                    ></i>
                    <button
                        onClick={loginWithGithub}
                        className="bg-purple-400 p-2 rounded-md mb-10"
                    >
                        Login with github
                    </button>
                    {isLoading && <Spinner />}
                </div>
            </div>
        </>
    );
}
