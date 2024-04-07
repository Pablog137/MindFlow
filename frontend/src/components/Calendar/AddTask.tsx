import { useState } from "react";

export default function AddTask() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagText, setTagText] = useState("");
    const [tag, setTag] = useState<Tag | null>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        resetForm();
    };

    type Tag = {
        Type: string;
        Color: string;
    };

    const tags: Tag[] = [
        {
            Type: "Personal",
            Color: "bg-blue-200",
        },
        {
            Type: "Work",
            Color: "bg-green-200",
        },
        {
            Type: "Study",
            Color: "bg-yellow-200",
        },
        {
            Type: "Other",
            Color: "bg-red-200",
        },
    ];

    const resetForm = () => {
        setTag(null);
        setTagText("");
    };

    const onClickTag = (tg: Tag) => {
        if (tag && tag.Type === tg.Type) {
            setTag(null);
        } else {
            setTag(tg);
        }
    };

    return (
        <>
            <button
                onClick={toggleModal}
                className="border rounded py-2 px-4 text-white hover:border-purple-500 "
            >
                Add task
            </button>

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
                                Create New Task
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
                        <form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 py-2">
                                    <label
                                        htmlFor="tag"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Task Tag
                                    </label>
                                    <div className="flex items-center justify-center space-x-2">
                                        {tags.map((tg, idx) => (
                                            <div
                                                key={idx}
                                                className={`p-1 w-10 h-7 rounded-2xl ${tg.Color} flex justify-center items-center   text-xs font-bold text-gray-800`}
                                                onMouseEnter={() => {
                                                    if (tagText !== tg.Type) {
                                                        setTagText(tg.Type);
                                                    }
                                                }}
                                                onMouseLeave={() =>
                                                    setTagText("")
                                                }
                                                onClick={() => onClickTag(tg)}
                                            >
                                                {tag &&
                                                    tag.Type === tg.Type && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 448 512"
                                                            className="h-6 fill-white"
                                                        >
                                                            <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                                                        </svg>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                    {tag ? (
                                        <p className="text-center pt-3 text-sm text-gray-600">
                                            {tag.Type}
                                        </p>
                                    ) : tagText !== "" ? (
                                        <p className="text-center pt-3 text-sm text-gray-600">
                                            {tagText}
                                        </p>
                                    ) : (
                                        <p className="text-center pt-3 text-sm text-gray-600">
                                            Select a tag
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write task description here"
                                        maxLength={15}
                                    ></textarea>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="dudate"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="text-white bg-purple-500 hover:bg-purple-700 inline-flex items-center  focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
