import { useState } from "react";
import Aside from "../Aside";
import Header from "./Header";
import GithubStats from "./GithubStats";
import TodoListStats from "./TodoListStats";
import CalendarStats from "./CalendarStats";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

const StatsComponent = (period: Period) => ({
    github: <GithubStats period={period} />,
    todoList: <TodoListStats period={period} />,
    calendarTasks: <CalendarStats period={period} />,
});

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [period, setPeriod] = useState<Period>("lastWeek");
    const [type, setType] = useState<Type>("github");

    const DynamicStatsComponent = StatsComponent(period);

    return (
        <>
            <>
                <div className={colsAside}>
                    <Aside isAsideOpen={isAsideOpen} />
                </div>
                <div
                    className={`text-white bg-[#161922] px-6 md:px-12 pt-10 md:pt-20 h-100 ${colMain}`}
                >
                    <Header
                        setPeriod={setPeriod}
                        period={period}
                        setType={setType}
                        type={type}
                    />
                    <main className="pt-20">{DynamicStatsComponent[type]}</main>
                </div>
            </>
        </>
    );
}
