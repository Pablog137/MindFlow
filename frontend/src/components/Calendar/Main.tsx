import { getMonth } from "../../helpers/utils";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import { useContext, useState, useEffect, createContext } from "react";
import GlobalContext from "../../context/CalendarContext";
import Aside from "../Aside";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { calendarTasksData } from "../../data/chartsData";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export const DragContext = createContext({});

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex } = useContext(GlobalContext);
    const [tasks, setTasks] = useState<CalendarTask[]>(calendarTasksData);
    const [isDraggingInUse, setIsDraggingInUse] = useState(false);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    const addTasks = (id: string | number, date: string) => {
        const newTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, date: date };
            }
            return task;
        });
        setTasks(newTasks);
    };

    const deleteTask = (id: string | number) => {
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
                        <CalendarHeader
                            addTask={addTask}
                            deleteTask={deleteTask}
                        />
                        <Month
                            month={currentMonth}
                            tasks={tasks}
                            addTasks={addTasks}
                        />
                    </div>
                </DndProvider>
            </DragContext.Provider>
        </>
    );
}
