import Aside from "../Aside";
import RepoCard from "./RepoCard";
import Spinner from "../Spinner";
import SearchRepo from "./SearchProject";
import GithubLogin from "./GithubDataUser";
import useRepositories from "../../hooks/useRepositories";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const {
        repositories,
        filteredRepositories,
        setFilteredRepositories,
        showLogin,
        isLoading,
        githubUserData,
        setGithubUserData,
    } = useRepositories();

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
