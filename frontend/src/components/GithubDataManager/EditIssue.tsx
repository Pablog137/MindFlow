import { useState } from "react";
import { IssueShowProject } from "../../data/github";
import FORM_CONTANTS from "../../common/utils/constants";

type Props = {
    issue: IssueShowProject;
    setIssues: (issue: IssueShowProject[]) => void;
    issues: IssueShowProject[];
    repoName: string;
    githubUserData: GithubData;
};

export default function EditIssue({
    issue,
    setIssues,
    issues,
    repoName,
    githubUserData,
}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState(issue.title);
    const [errorMessage, setErrorMessage] = useState("");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        resetForm();
    };

    const resetForm = () => {
        setTitle(issue.title);
    };

    const handleOnChangeTitle = (newTitle: string) => {
        setTitle(newTitle);
        setErrorMessage("");
    };

    const handleOnSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() === "") {
            setErrorMessage(FORM_CONTANTS.ERROR_MESSAGE_FILL_FIELDS);
            return;
        }
        const updatedIssues = issues.map((i) => {
            if (i.id === issue.id) {
                return { ...i, title: title };
            }
            return i;
        });
        setIssues(updatedIssues);
        setIsModalOpen(false);
        editIssuePatch();
    };

    const editIssuePatch = () => {
        const URL = `https://api.github.com/repos/${githubUserData.username}/${repoName}/issues/${issue.number}`;
        fetch(URL, {
            method: "PATCH",
            body: JSON.stringify({
                title: title,
            }),
            headers: {
                Authorization: `Bearer ${githubUserData.access_token}`,
            },
        }).then((res) => res.json());
    };

    const handleResetForm = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        resetForm();
    };

    return (
        <>
            <i
                className="fa-regular fa-pen-to-square text-lg text-green-500 hover:text-green-600 hover:text-xl"
                aria-hidden="true"
                onClick={toggleModal}
            ></i>

            {isModalOpen && (
                <div
                    id="crud-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto overflow-x-hidden z-50 bg-white rounded-lg shadow-md p-4 md:p-5 w-full md:max-w-md"
                >
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Save
                            </h3>
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form
                            className="p-4 md:p-5"
                            onSubmit={handleOnSubmitForm}
                        >
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="title"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Title{" "}
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) =>
                                            handleOnChangeTitle(e.target.value)
                                        }
                                        value={title}
                                    />
                                </div>
                                {errorMessage && (
                                    <div
                                        className="col-span-2 flex items-center justify-center p-3 mb-3 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                                        role="alert"
                                    >
                                        <svg
                                            className="flex-shrink-0 inline w-4 h-4 me-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                        </svg>
                                        <span className="sr-only">Info</span>
                                        <div>
                                            <p>{errorMessage}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-evenly">
                                <button
                                    type="submit"
                                    className="text-white bg-green-400 hover:bg-green-700 inline-flex items-center  focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2 text-center"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleResetForm}
                                    className="text-white bg-red-400 hover:bg-red-500 inline-flex items-center  focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm px-4 py-2 text-center"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
