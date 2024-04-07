import { useState } from "react";
import ModalEditTask from "./ModalEditTask";
import { TaskContext } from "./Main";
import { useContext } from "react";
import { useDrag } from "react-dnd";

type Props = {
    task: Task;
    id: string | number;
    tasks: Array<Task>;
};

const priorityLevels = ["Easy", "Medium", "Hard"];
const priorityColors = ["green", "yellow", "red"];

export default function TodoListItem({ task, id, tasks }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    const color = priorityColors[task.priority - 1];
    return (
        <div
            ref={drag}
            className={`p-5 bg-white rounded-lg ${isDragging && "hidden"}`}
        >
            <div className="flex justify-between items-center">
                <span className={`font-bold text-${color}-500`}>
                    {priorityLevels[task.priority - 1]}
                </span>
                <button>
                    <i
                        className="fa-regular fa-pen-to-square text-lg text-green-500 hover:text-green-600 hover:text-xl"
                        onClick={toggleModal}
                    ></i>
                </button>
            </div>

            <p className="text-xl py-6">{task.description}</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <i className="fa-regular fa-clock text-purple-300 mr-4 text-lg"></i>
                    <span className="text-sm text-gray-500">
                        {task.due_date}
                    </span>
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
            />
        </div>
    );
}
