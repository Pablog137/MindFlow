import Aside from "../Aside";
import TodoList from "./TodoList";
import { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { todoListData } from "../../data/chartsData";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

interface TaskContext {
    tasks: TodoListTask[];
    addTask: (task: TodoListTask) => void;
    removeTask: (id: string | number) => void;
    editTask: (id: string | number, task: TodoListTask) => void;
    setTasks: (tasks: TodoListTask[]) => void;
}

export const TaskContext = createContext<TaskContext>({} as TaskContext);

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [tasks, setTasks] = useState<TodoListTask[]>(todoListData);

    const addTask = (task: TodoListTask) => setTasks([...tasks, task]);

    const removeTask = (id: string | number) =>
        setTasks(tasks.filter((task) => task.id !== id));

    const editTask = (id: string | number, task: TodoListTask) => {
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
                        <TodoList status="Todo" tasks={tasks} />
                        <TodoList status="Doing" tasks={tasks} />
                        <TodoList status="Done" tasks={tasks} />
                    </div>
                </TaskContext.Provider>
            </DndProvider>
        </>
    );
}
