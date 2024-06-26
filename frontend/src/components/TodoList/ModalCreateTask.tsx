import { useState, useEffect } from "react";
import RatingStar from "./RatingStar";
import { TaskContext } from "./Main";
import { useContext } from "react";
import FORM_CONTANTS from "../../common/utils/constants";
import { createTaskAPI } from "../../api/tasks";

type Props = {
    status: string;
};

export default function ModalCreateTask({ status }: Props) {
    const { addTask } = useContext(TaskContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [difficultyLevel, setDifficultylevel] = useState(1);
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { updateTaskState, revertLastState } =
        useContext(TaskContext);

    useEffect(() => {
        if (hasSubmitted) validateForm();
    }, [content, dueDate, hasSubmitted]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        resetForm();
    };

    const changePriorityLevel = (difficulty: number) => {
        setDifficultylevel(difficulty);
    };

    const resetForm = () => {
        setDifficultylevel(1);
        setContent("");
        setDueDate("");
        setHasSubmitted(false);
        setFeedbackMessage(false);
        setErrorMessage("");
    };

    const createTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!validateForm()) {
            return;
        }
        const tempId = Date.now();

        const newTask = {
            id: tempId,
            content,
            difficulty: difficultyLevel,
            due_date: dueDate,
            status: status.toLowerCase() as Status,
            closed_at: null,
            created_at: new Date().toISOString(),
        };
        addTask(newTask);
        createTaskAPI(
            "/api/todo-list-tasks",
            newTask,
            "POST",
            updateTaskState,
            revertLastState,
            // handleNewError
        );
        resetForm();
        toggleModal();
    };

    const handleResetForm = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        resetForm();
    };

    const validateForm = () => {
        const currentDate = new Date();
        const selectedDate = new Date(dueDate);
        if (content.trim() === "" || dueDate.trim() === "") {
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
                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md flex justify-center items-center gap-4"
                onClick={toggleModal}
            >
                <i className="fa-solid fa-plus"></i>
                <p>Add a task</p>
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
                        <form className="p-4 md:p-5" onSubmit={createTask}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 flex justify-between">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Difficulty level{" "}
                                        <span className="text-red-700 text-sm">
                                            *
                                        </span>
                                    </label>
                                    <div className="flex gap-2">
                                        <RatingStar
                                            id={1}
                                            changePriorityLevel={
                                                changePriorityLevel
                                            }
                                            priorityLevel={difficultyLevel}
                                        />
                                        <RatingStar
                                            id={2}
                                            changePriorityLevel={
                                                changePriorityLevel
                                            }
                                            priorityLevel={difficultyLevel}
                                        />
                                        <RatingStar
                                            id={3}
                                            changePriorityLevel={
                                                changePriorityLevel
                                            }
                                            priorityLevel={difficultyLevel}
                                        />
                                    </div>
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
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                        value={content}
                                    ></textarea>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="due-date"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Due Date{" "}
                                        <span className="text-red-700 text-sm">
                                            *
                                        </span>
                                    </label>
                                    <input
                                        type="date"
                                        id="due-date"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) =>
                                            setDueDate(e.target.value)
                                        }
                                        value={dueDate}
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
