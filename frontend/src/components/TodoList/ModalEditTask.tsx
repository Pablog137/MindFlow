import { useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import { TaskContext } from "./Main";
import { useContext } from "react";
import FORM_CONTANTS from "../../common/utils/constants";
import { manageTaskAPI } from "../../api/tasks";

type Props = {
    toggleModal: () => void;
    isModalOpen: boolean;
    id: number;
    tasks: Array<TodoListTask>;
    status: string;
};

export default function ModalEditTask({
    toggleModal,
    isModalOpen,
    id,
    tasks,
    status,
}: Props) {
    const { editTask } = useContext(TaskContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState(false);
    const [difficultyLevel, setDifficultyLevel] = useState(1);
    const [content, setContent] = useState("");
    const [dueDate, setDueDate] = useState<string | null>("");
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (hasSubmitted) validateForm();
    }, [content, dueDate, hasSubmitted]);

    useEffect(() => {
        const task = tasks.find((task) => task.id === id);
        if (task) {
            setDifficultyLevel(task.difficulty);
            setContent(task.content);
            setDueDate(task.due_date);
        }
    }, []);

    const changePriorityLevel = (difficulty: number) => {
        setDifficultyLevel(difficulty);
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (!validateForm()) {
            return;
        }
        const newTask = {
            status,
            difficulty: difficultyLevel,
            content,
            due_date: dueDate,
            closed_at: null,
        };

        const task = tasks.find((task) => task.id === id);
        if (task) {
            editTask(task.id, { ...task, ...newTask });
            toggleModal();
        }
        manageTaskAPI(`/api/todo-list-tasks/${id}`, newTask, "PUT");
    };

    const validateForm = () => {
        if (dueDate === null && content.trim() === null) {
            setErrorMessage(FORM_CONTANTS.ERROR_MESSAGE_FILL_FIELDS);
            setFeedbackMessage(false);
            return false;
        } else {
            const currentDate = new Date();
            const selectedDate = dueDate !== null ? new Date(dueDate) : null;

            if (content.trim() === "" || dueDate === null) {
                setErrorMessage(FORM_CONTANTS.ERROR_MESSAGE_FILL_FIELDS);
                setFeedbackMessage(false);
                return false;
            } else if (selectedDate !== null && selectedDate < currentDate) {
                setErrorMessage(FORM_CONTANTS.ERROR_MESSAGE_INVALID_DATE);
                setFeedbackMessage(false);
                return false;
            }
            setFeedbackMessage(true);
            setErrorMessage("");
            return true;
        }
    };

    return (
        <>
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
                                Edit Task
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
                        <form className="p-4 md:p-5" onSubmit={handleEdit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2 flex justify-between">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Priority level
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
                                        Description
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
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        id="due-date"
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        onChange={(e) =>
                                            setDueDate(e.target.value)
                                        }
                                        value={dueDate || ""}
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

                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="text-white bg-purple-500 hover:bg-purple-700 inline-flex items-center  focus:ring-4 focus:outline-none font-semibold rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Edit Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
