import Aside from "../Aside";
import TodoList from "./TodoList";
import { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { initialTasks } from "../../data/initialdata";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

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
                </TaskContext.Provider>
            </DndProvider>
        </>
    );
}
