import { getMonth } from "../../helpers/utils";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import { useContext, useState, useEffect } from "react";
import GlobalContext from "../../context/CalendarContext";
import Aside from "../Dashboard/Aside";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex } = useContext(GlobalContext);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <>
            <div className="grid grid-cols-12 h-screen">
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <div className={`p-10 ${colMain} `}>
                    <CalendarHeader />
                    <div className="">
                        <Month month={currentMonth} />
                    </div>
                </div>
            </div>
        </>
    );
}
