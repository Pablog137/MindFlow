import { getMonth } from "../../helpers/utils";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import { useContext, useState, useEffect, createContext } from "react";
import GlobalContext from "../../context/CalendarContext";
import Aside from "../Dashboard/Aside";
import { TaskTag } from "../../common/utils/enum";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

const initialTasks: CalendarTask[] = [
    {
        id: 1,
        tag: TaskTag.Work,
        description: "Complete project proposal",
        date: "2024-04-01",
    },
    {
        id: 2,
        tag: TaskTag.Personal,
        description: "Meeting with team",
        date: "2024-04-04",
    },
    {
        id: 6,
        tag: TaskTag.Other,
        description: "Prepare for presentation today jaja okay",
        date: "2024-04-04",
    },
    {
        id: 10,
        tag: TaskTag.Personal,
        description: "Prepare for presentation today jaja okay",
        date: "2024-04-04",
    },
    {
        id: 3,
        tag: TaskTag.Study,
        description: "Review code updates",
        date: "2024-04-09",
    },
    {
        id: 4,
        tag: TaskTag.Other,
        description: "Prepare presentation",
        date: "2024-04-12",
    },
    {
        id: 5,
        tag: TaskTag.Work,
        description: "Submit quarterly report",
        date: "2024-05-16",
    },
];

export const DragContext = createContext({});

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex } = useContext(GlobalContext);
    const [tasks, setTasks] = useState<CalendarTask[]>(initialTasks);
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
            <>
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <DragContext.Provider
                    value={{ setIsDraggingInUse, isDraggingInUse }}
                >
                    <DndProvider backend={HTML5Backend}>
                        <div className={`p-6 ${colMain} `}>
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
        </>
    );
}
