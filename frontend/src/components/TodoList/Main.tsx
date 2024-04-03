import Aside from "../../components/Dashboard/Aside";
import TodoList from "./TodoList";
import { useState } from "react";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

const initialTasks: Task[] = [
    {
        id: 1,
        status: "To do",
        difficulty: 1,
        description: "Create a new task",
        due_date: "2022-12-31",
    },
    {
        id: 2,
        status: "Doing",
        difficulty: 2,
        description: "Create a new task",
        due_date: "2022-12-31",
    },
    {
        id: 3,
        status: "Done",
        difficulty: 3,
        description: "Create a new task",
        due_date: "2022-12-31",
    },
];

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const todoTasks = tasks.filter((task) => task.status === "To do");
    const doingTasks = tasks.filter((task) => task.status === "Doing");
    const doneTasks = tasks.filter((task) => task.status === "Done");
    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };
    const removeTask = (id : string | number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <>
            <div className="grid grid-cols-12 ">
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <div
                    className={`grid grid-cols-12 gap-5 text-white bg-[#161922] px-6 md:px-12 pt-10 h-full lg:h-screen  ${colMain}`}
                >
                    <TodoList
                        status="To do"
                        tasks={todoTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                    />
                    <TodoList
                        status="Doing"
                        tasks={doingTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                    />
                    <TodoList
                        status="Done"
                        tasks={doneTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                    />
                </div>
            </div>
        </>
    );
}
