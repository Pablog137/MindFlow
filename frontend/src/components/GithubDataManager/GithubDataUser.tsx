import { getLocalStorage, setLocalStorage } from "../../helpers/localstorage";
import Aside from "../Aside";
import { useEffect } from "react";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function GithubLogin({
    isAsideOpen,
    colsAside,
    colMain,
}: Props) {
    function loginWithGithub() {
        const accessToken = getLocalStorage("githubData");
        if (!accessToken) {
            window.location.assign(
                "https://github.com/login/oauth/authorize?client_id=" +
                    import.meta.env.VITE_GITHUB_ID +
                    "&scope=repo%20repo:status%20user"
            );
        }
    }

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");

        if (codeParam && getLocalStorage("githubData") === null) {
            getAccessToken(codeParam);
        }
    }, []);

    async function getAccessToken(codeParam: string) {
        await fetch(
            "http://localhost:8000/api/getAccessToken?code=" + codeParam,
            {
                headers: {
                    Authorization: `Bearer ${getLocalStorage("token")}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    setLocalStorage("githubData", JSON.stringify(data.data));
                    window.location.href = "/github";
                }
            });
    }

    return (
        <>
            <div className={colsAside}>
                <Aside isAsideOpen={isAsideOpen} />
            </div>
            <div className={`bg-[#161922] ${colMain} h-screen`}>
                <div className="flex flex-col mt-40 justify-center items-center text-white">
                    <h1 className="py-8 text-md md:text-lg lg:text-2xl">
                        To access this section you'll need to login with Github
                    </h1>
                    <i
                        className="fa-brands fa-github py-6"
                        style={{ fontSize: "4rem" }}
                    ></i>
                    <button
                        onClick={loginWithGithub}
                        className="bg-purple-400 p-2 rounded-md"
                    >
                        Login with github
                    </button>
                </div>
            </div>
        </>
    );
}
