import Aside from "../Aside";
import TodoList from "./TodoList";
import { useState, createContext, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import getTasksForUser from "../../api/tasks";
import Spinner from "../Spinner";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

interface TaskContext {
    tasks: TodoListTask[];
    addTask: (task: TodoListTask) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, task: any) => void;
    // handleNewError: (errorMessage: string) => void;
    setTasks: (newTasks: TodoListTask[]) => void;
    updateTaskState: (tempId: number, createdTask: TodoListTask) => void;
    revertLastState: (tempId: number) => void;
}

export const TaskContext = createContext<TaskContext>({} as TaskContext);

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [tasks, setTasks] = useState<TodoListTask[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<string>("");

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const data = await getTasksForUser(
                    "/api/todo-list-tasks-without-closed"
                );
                setTasks(data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const addTask = (task: TodoListTask) => {
        setTasks([...tasks, task]);
    };

    // const handleNewError = (errorMessage: string) => {
    //     setError(errorMessage);
    // };

    const updateTaskState = (tempId: number, createdTask: TodoListTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === tempId ? createdTask : task))
        );
    };

    const revertLastState = (tempId: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== tempId));
    };

    const removeTask = (id: number) =>
        setTasks(tasks.filter((task) => task.id !== id));

    const editTask = (id: number, task: any) => {
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
                <div className={colsAside + " h-full"}>
                    <Aside isAsideOpen={isAsideOpen} type={"todo-list"} />
                </div>
                <TaskContext.Provider
                    value={{
                        tasks,
                        addTask,
                        removeTask,
                        editTask,
                        // handleNewError,
                        setTasks,
                        updateTaskState,
                        revertLastState,
                    }}
                >
                    <div
                        className={` text-white bg-[#161922] h-full ${colMain}`}
                    >
                        {isLoading ? (
                            <div className="col-start-6 flex justify-center items-center h-screen ">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="grid grid-cols-12 px-6 md:px-12 gap-5 text-white pt-10 md:pt-15 ">
                                <TodoList status="Todo" tasks={tasks} />
                                <TodoList status="Doing" tasks={tasks} />
                                <TodoList status="Done" tasks={tasks} />
                            </div>
                        )}
                    </div>
                </TaskContext.Provider>
            </DndProvider>
        </>
    );
}
