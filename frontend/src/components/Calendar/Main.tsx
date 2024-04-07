import { getMonth } from "../../helpers/utils";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/CalendarContext";
import Aside from "../Dashboard/Aside";
import { TaskTag } from "../../enums/enum";

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

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex } = useContext(GlobalContext);
    const [tasks, setTasks] = useState<CalendarTask[]>(initialTasks);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    // const addTask = (task: CalendarTask) => {
    //     setTasks([...tasks, task]);
    // };

    return (
        <>
            <div className="grid grid-cols-12 h-screen">
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <div className={`p-6 ${colMain} `}>
                    <CalendarHeader />
                    <Month month={currentMonth} tasks={tasks} />
                </div>
            </div>
        </>
    );
}
