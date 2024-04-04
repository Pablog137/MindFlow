import ModalCreateTask from "./ModalCreateTask";
import TodoListItem from "./TodoListItem";
import { useDrop } from "react-dnd";
import { TaskContext } from "./Main";
import { useContext } from "react";

type Props = {
    status: string;
    tasks: Array<Task>;
};

export default function TodoList({ status, tasks }: Props) {
    const { setTasks } = useContext(TaskContext);

    const [{ isOver }, drop] = useDrop({
        accept: "CARD",
        drop: (task: Task) => addTaskToList(task.id, status),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const addTaskToList = (id: string | number, status: string) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, status };
            }
            return task;
        });
        setTasks(newTasks);
    };

    return (
        <div
            ref={drop}
            className={`col-span-12 lg:col-span-4 bg-[#EBECF0] text-black rounded-lg p-6 border-2 border-purple-500 flex flex-col  ${
                isOver ? "bg-[#c6c8cc]" : ""
            } `}
        >
            <h2 className="text-xl text-center font-bold pb-3">{status}</h2>
            <div className={`flex flex-col gap-2 flex-grow`}>
                {tasks.map(
                    (task) =>
                        task.status === status && (
                            <TodoListItem
                                key={task.id}
                                id={task.id}
                                task={task}
                                tasks={tasks}
                            />
                        )
                )}
            </div>
            <div className="flex justify-center pt-6">
                <ModalCreateTask status={status} />
            </div>
        </div>
    );
}
