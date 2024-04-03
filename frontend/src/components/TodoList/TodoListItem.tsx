import { useState } from "react";
import ModalEditTask from "./ModalEditTask";

type Props = {
    priority: number;
    description: string;
    due_date: string;
    id: string | number;
    removeTask: (id: string | number) => void;
    tasks: Array<Task>;
    editTask: (id: string | number, task: Task) => void;
};

const priorityLevels = ["Easy", "Medium", "Hard"];
const priorityColors = ["green", "yellow", "red"];

export default function TodoListItem({
    priority,
    description,
    due_date,
    id,
    removeTask,
    tasks,
    editTask,
}: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        // resetForm();
    };
    return (
        <div className="p-5 bg-white rounded-lg">
            {/* <span
                className={`font-bold text-${
                    difficultyColors[difficulty - 1]
                }-500`}
            > */}
            <div className="flex justify-between items-center">
                <span
                    className={`font-bold text-${
                        priorityColors[priority - 1]
                    }-500`}
                >
                    {priorityLevels[priority - 1]}
                </span>
                <button>
                    <i
                        className="fa-regular fa-pen-to-square text-lg text-green-500 hover:text-green-600 hover:text-xl"
                        onClick={toggleModal}
                    ></i>
                </button>
            </div>

            <p className="text-xl py-6">{description}</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <i className="fa-regular fa-clock text-purple-300 mr-4 text-lg"></i>
                    <span className="text-sm text-gray-500">{due_date}</span>
                </div>
                <button>
                    <i
                        className="fa-solid fa-trash text-red-500 hover:text-red-300 hover:text-xl text-lg"
                        onClick={() => removeTask(id)}
                    ></i>
                </button>
            </div>
            <ModalEditTask
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                id={id}
                tasks={tasks}
                editTask={editTask}
            />
        </div>
    );
}
