import { getMonth } from "../../helpers/utils";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import { useContext, useState, useEffect, createContext } from "react";
import GlobalContext from "../../context/CalendarContext";
import Aside from "../Aside";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import getTasksForUser from "../../api/tasks";
import Spinner from "../Spinner";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export const DragContext = createContext({});

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex } = useContext(GlobalContext);
    const [tasks, setTasks] = useState<CalendarTask[]>([]);
    const [isDraggingInUse, setIsDraggingInUse] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const data = await getTasksForUser("/api/calendar-tasks");
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
    };

    const deleteTask = (id: number) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    const addTask = (task: CalendarTask) => {
        setTasks([...tasks, task]);
    };

    return (
        <>
            <div className={colsAside + " h-screen"}>
                <Aside isAsideOpen={isAsideOpen} />
            </div>
            <DragContext.Provider
                value={{ setIsDraggingInUse, isDraggingInUse }}
            >
                <DndProvider backend={HTML5Backend}>
                    <div className={`p-3 sm:p-6 ${colMain} bg-[#161922] `}>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <CalendarHeader
                                    addTask={addTask}
                                    deleteTask={deleteTask}
                                />
                                <Month
                                    month={currentMonth}
                                    tasks={tasks}
                                    addTasks={addTasks}
                                />
                            </>
                        )}
                    </div>
                </DndProvider>
            </DragContext.Provider>
        </>
    );
}
