import Aside from "../../components/Dashboard/Aside";
import TodoList from "./TodoList";
import { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

const initialTasks: Task[] = [
    {
        id: 1,
        status: "To do",
        priority: 1,
        description: "Create a new task",
        due_date: "2022-12-31",
    },
    {
        id: 2,
        status: "Doing",
        priority: 2,
        description: "Create a new task",
        due_date: "2022-12-31",
    },
    {
        id: 3,
        status: "Done",
        priority: 3,
        description: "Create a new task",
        due_date: "2022-12-31",
    },
];

interface TaskContext {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (id: string | number) => void;
    editTask: (id: string | number, task: Task) => void;
    setTasks: (tasks: Task[]) => void;
}

export const TaskContext = createContext<TaskContext>({} as TaskContext);

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const addTask = (task: Task) => setTasks([...tasks, task]);

    const removeTask = (id: string | number) =>
        setTasks(tasks.filter((task) => task.id !== id));

    const editTask = (id: string | number, task: Task) => {
        setTasks(
            tasks.map((t) => {
                if (t.id === id) {
                    return task;
                }
                return t;
            })
        );
    };

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <TaskContext.Provider
                    value={{ tasks, addTask, removeTask, editTask, setTasks }}
                >
                    <div className="grid grid-cols-12 ">
                        <div className={colsAside}>
                            <Aside isAsideOpen={isAsideOpen} />
                        </div>
                        <div
                            className={`grid grid-cols-12 gap-5 text-white bg-[#161922] px-6 md:px-12 pt-10 h-full lg:h-screen  ${colMain}`}
                        >
                            <TodoList status="To do" tasks={tasks} />
                            <TodoList status="Doing" tasks={tasks} />
                            <TodoList status="Done" tasks={tasks} />
                        </div>
                    </div>
                </TaskContext.Provider>
            </DndProvider>
        </>
    );
}
