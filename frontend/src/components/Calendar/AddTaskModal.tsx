import { useState, useEffect, useContext } from "react";
import { TaskTag } from "../../common/utils/enum";
import FORM_CONTANTS from "../../common/utils/constants";
import { createCalendarTaskAPI } from "../../api/tasks";
import { CalendarContext } from "./Main";

export default function AddTask() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagText, setTagText] = useState("");
    const [tag, setTag] = useState<Tag | null>(null);
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { updateTaskState, revertLastState, addTask } =
        useContext(CalendarContext);

    useEffect(() => {
        if (hasSubmitted) validateForm();
    }, [description, date, tag, hasSubmitted]);

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
        setDescription("");
        setDate("");
        setHasSubmitted(false);
        setFeedbackMessage(false);
        setErrorMessage("");
    };

    const handleResetForm = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        resetForm();
    };

    const onClickTag = (tg: Tag) => {
        if (tag && tag.Type === tg.Type) {
            setTag(null);
        } else {
            setTag(tg);
        }
    };

    const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!validateForm()) {
            return;
        }
        const tempId = Date.now();
        const newTasks = {
            id: tempId,
            tag: tag?.Type as TaskTag,
            content: description,
            date: date,
            closed_at: null,
            created_at: new Date().toISOString(),
        };

        addTask(newTasks);
        createCalendarTaskAPI(
            "/api/calendar-tasks",
            newTasks,
            "POST",
            updateTaskState,
            revertLastState,
            // handleNewError
        );
        toggleModal();
        resetForm();
    };

    const validateForm = () => {
        const currentDate = new Date();
        const selectedDate = new Date(date);

        if (!tag) {
            setErrorMessage(FORM_CONTANTS.ERROR_MESSAGE_SELECT_TAG);
            setFeedbackMessage(false);
            return false;
        } else if (description.trim() === "" || date.trim() === "") {
            setErrorMessage(FORM_CONTANTS.ERROR_MESSAGE_FILL_FIELDS);
            setFeedbackMessage(false);
            return false;
        } else if (selectedDate < currentDate) {
            setErrorMessage(FORM_CONTANTS.ERROR_MESSAGE_INVALID_DATE);
            setFeedbackMessage(false);
            return false;
        }
        setFeedbackMessage(true);
        setErrorMessage("");
        return true;
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
                        <form
                            className="p-4 md:p-5"
                            onSubmit={handleSubmitForm}
                        >
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 py-2">
                                    <label
                                        htmlFor="tag"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Task Tag{" "}
                                        <span className="text-red-700 text-sm">
                                            *
                                        </span>
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
                                        Description{" "}
                                        <span className="text-red-700 text-sm">
                                            *
                                        </span>
                                    </label>
                                    <textarea
                                        id="description"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write task description here"
                                        maxLength={40}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        value={description}
                                    ></textarea>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="dudate"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Date{" "}
                                        <span className="text-red-700 text-sm">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                        value={date}
                                    />
                                </div>
                            </div>
                            {errorMessage && (
                                <div
                                    className="flex items-center justify-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
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
                            {feedbackMessage && (
                                <div
                                    className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
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
                                        {FORM_CONTANTS.FEEDBACK_MESSAGE_SUCCESS}
                                    </div>
                                </div>
                            )}
                            <div className="flex justify-evenly">
                                <button
                                    type="submit"
                                    className="text-white bg-purple-500 hover:bg-purple-700 inline-flex items-center  focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Create Task
                                </button>
                                <button
                                    onClick={handleResetForm}
                                    className="text-white bg-red-400 hover:bg-red-500 inline-flex items-center  focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
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
