import ModalCreateTask from "./ModalCreateTask";
import TodoListItem from "./TodoListItem";

type Task = {
    id: number | string;
    status: string;
    difficulty: number;
    description: string;
    due_date: string;
};

type Props = {
    status: string;
    tasks: Array<Task>;
    addTask: (task: Task) => void;
};

export default function TodoList({ status, tasks, addTask }: Props) {
    return (
        <div className="col-span-12 lg:col-span-4 bg-[#EBECF0] text-black rounded-lg p-6 border-2 border-purple-500 flex flex-col ">
            <h2 className="text-xl text-center font-bold pb-3">{status}</h2>
            <div className="flex flex-col gap-2 flex-grow">
                {tasks.map((task) => {
                    return (
                        <TodoListItem
                            key={task.id}
                            difficulty={task.difficulty}
                            description={task.description}
                            due_date={task.due_date}
                        />
                    );
                })}
            </div>
            <div className="flex justify-center pt-6">
                <ModalCreateTask addTask={addTask} status={status} />
            </div>
        </div>
    );
}
