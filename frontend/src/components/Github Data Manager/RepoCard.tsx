type Card = {
    name: string;
    lastUpdatedAt: string;
    visibility: string;
    issues: number;
    commits: number;
    languages: string[];
};

const icons = {
    visibility: {
        Public: "fa fa-globe",
        Private: "fa fa-lock",
    },
    issues: "fa fa-exclamation-circle",
    commits: "fa fa-code-branch",
    lastUpdatedAt: "fa-regular fa-clock",
};
export default function RepoCard({ repo }: { repo: Card }) {
    return (
        <div className="bg-white rounded-md col-span-4 p-2">
            <h1 className="text-black text-center text-xl font-bold">
                {repo.name}
            </h1>
            <ul className="text-gray-700 font-semibold p-4 text-sm">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <i
                            className={`${icons.lastUpdatedAt} text-purple-300`}
                        ></i>
                        <p>Last updated at :</p>
                    </div>
                    <span>{repo.lastUpdatedAt}</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <i
                            className={`${
                                icons.visibility[repo.visibility]
                            } text-purple-300`}
                        ></i>
                        <p>Visibility :</p>
                    </div>
                    <span>{repo.visibility}</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <i className={`${icons.issues} text-purple-300`}></i>
                        <p>Issues :</p>
                    </div>
                    <span>{repo.issues}</span>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <i className={`${icons.commits} text-purple-300`}></i>
                        <p>Commits :</p>
                    </div>
                    <span>{repo.commits}</span>
                </div>
            </ul>
            <div className="flex justify-center mt-5">
                <button className="bg-purple-500 text-white font-bold py-1 px-4 text-sm rounded-md">
                    Details
                </button>
            </div>
        </div>
    );
}
