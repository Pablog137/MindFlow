import { useState } from "react";
import ModalEditTask from "./ModalEditTask";
import { TaskContext } from "./Main";
import { useContext } from "react";
import { useDrag } from "react-dnd";
import Tooltip from "@mui/material/Tooltip";
import { manageTaskAPI } from "../../api/tasks";
import RemoveItem from "../UI-Items/RemoveItem";

type Props = {
    task: TodoListTask;
    id: number;
    tasks: Array<TodoListTask>;
};

const priorityLevels = ["Easy", "Medium", "Hard"];
const priorityColors = ["green", "yellow", "red"];

export default function TodoListItem({ task, id, tasks }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { removeTask } = useContext(TaskContext);

    const [{ isDragging }, drag] = useDrag({
        type: "CARD",
        item: { id, status: task.status },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleDeleteTask = () => {
        removeTask(id);
        const currentDate = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        manageTaskAPI(
            `/api/todo-list-tasks/${id}`,
            { closed_at: currentDate },
            "PATCH"
        );
    };
    const color = priorityColors[task.difficulty - 1];
    return (
        <div
            ref={drag}
            className={`p-5 bg-white rounded-lg ${isDragging && "hidden"}`}
        >
            <div className="flex justify-between items-center">
                <span className={`font-bold text-${color}-500`}>
                    {priorityLevels[task.difficulty - 1]}
                </span>
                <Tooltip title="Edit" arrow>
                    <button>
                        <i
                            className="fa-regular fa-pen-to-square text-lg text-green-500 hover:text-green-600 hover:text-xl"
                            onClick={toggleModal}
                        ></i>
                    </button>
                </Tooltip>
            </div>

            <p className="text-xl py-6">{task.content}</p>
            <div
                className={`flex items-center ${
                    task.due_date ? "justify-between" : "justify-end"
                }`}
            >
                {task.due_date && (
                    <Tooltip title="Due date" arrow>
                        <div className="flex items-center">
                            <i className="fa-regular fa-clock text-purple-300 mr-4 text-lg"></i>
                            <span className="text-sm text-gray-500">
                                {task.due_date}
                            </span>
                        </div>
                    </Tooltip>
                )}
                {/* <Tooltip title="Delete" arrow>
                    <button>
                        <i
                            className="fa-solid fa-trash text-red-500 hover:text-red-300 hover:text-xl text-lg"
                            onClick={handleDeleteTask}
                        ></i>
                    </button>
                </Tooltip> */}
                <RemoveItem
                    id={id}
                    type="todolist"
                    handleDelete={handleDeleteTask}
                    isModalOpen={isDeleteModalOpen}
                    setIsModalOpen={setIsDeleteModalOpen}
                />
            </div>
            <ModalEditTask
                toggleModal={toggleModal}
                isModalOpen={isModalOpen}
                id={id}
                tasks={tasks}
                status={task.status}
            />
        </div>
    );
}
