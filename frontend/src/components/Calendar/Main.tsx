import { getMonth } from "../../helpers/utils";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import { useContext, useState, useEffect, createContext } from "react";
import GlobalContext from "../../context/CalendarContext";
import Aside from "../Aside";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import getTasksForUser, { manageTaskAPI } from "../../api/tasks";
import Spinner from "../Spinner";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

interface CalendarContext {
    setIsDraggingInUse: (condition: boolean) => void;
    isDraggingInUse: boolean;
    tasks: CalendarTask[];
    addTask: (task: CalendarTask) => void;
    // handleNewError: (errorMessage: string) => void;
    setTasks: (newTasks: CalendarTask[]) => void;
    updateTaskState: (tempId: number, createdTask: CalendarTask) => void;
    revertLastState: (tempId: number) => void;
}
export const CalendarContext = createContext<CalendarContext>(
    {} as CalendarContext
);

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex } = useContext(GlobalContext);
    const [tasks, setTasks] = useState<CalendarTask[]>([]);
    const [isDraggingInUse, setIsDraggingInUse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState<string>("");

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const data = await getTasksForUser(
                    "/api/calendar-tasks-without-closed"
                );
                setTasks(data.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const addTasks = (id: number, date: string) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, date: date };
            }
            return task;
        });
        setTasks(newTasks);
        manageTaskAPI(`/api/calendar-tasks/${id}`, { date: date }, "PATCH");
    };

    const deleteTask = (id: number) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
        const currentDate = new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

        manageTaskAPI(
            `/api/calendar-tasks/${id}`,
            { closed_at: currentDate },
            "PATCH"
        );
    };

    const addTask = (task: CalendarTask) => {
        setTasks([...tasks, task]);
    };

    // const handleNewError = (errorMessage: string) => {
    //     setError(errorMessage);
    // };

    const updateTaskState = (tempId: number, createdTask: CalendarTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === tempId ? createdTask : task))
        );
    };

    const revertLastState = (tempId: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== tempId));
    };

    return (
        <>
            <div className={colsAside + " h-full"}>
                <Aside isAsideOpen={isAsideOpen} type={"calendar"} />
            </div>
            <CalendarContext.Provider
                value={{
                    setIsDraggingInUse,
                    isDraggingInUse,
                    tasks,
                    addTask,
                    setTasks,
                    // handleNewError,
                    updateTaskState,
                    revertLastState,
                }}
            >
                <DndProvider backend={HTML5Backend}>
                    <div
                        className={`p-3 sm:p-6 ${colMain} h-screen bg-[#161922] `}
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <CalendarHeader deleteTask={deleteTask} />
                                <Month
                                    month={currentMonth}
                                    tasks={tasks}
                                    addTasks={addTasks}
                                />
                            </>
                        )}
                    </div>
                </DndProvider>
            </CalendarContext.Provider>
        </>
    );
}
