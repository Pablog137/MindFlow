import { getLocalStorage, setLocalStorage } from "../../helpers/localstorage";
import Aside from "../Dashboard/Aside";
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
                    import.meta.env.VITE_GITHUB_ID
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
            "http://localhost:8000/api/getAccessToken?code=" + codeParam
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.data) {
                    setLocalStorage("githubData", JSON.stringify(data.data));
                    window.location.href = "/github"
                }
            });
    }

    return (
        <>
            <div className={colsAside}>
                <Aside isAsideOpen={isAsideOpen} />
            </div>
            <div className={`bg-[#161922] ${colMain} h-screen`}>
                <div className="flex flex-col mt-20 justify-center items-center text-white">
                    <h1 className="py-10">Bienvenido a mi aplicación</h1>
                    <button
                        onClick={loginWithGithub}
                        className="bg-purple-400 p-2 rounded-md"
                    >
                        Iniciar sesión con GitHub
                    </button>
                </div>
            </div>
        </>
    );
}
