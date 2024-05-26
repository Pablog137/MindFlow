import { useState, useEffect } from "react";

import Aside from "../Aside";
import Header from "./Header";
import Stats from "./Stats";
import getTasksForUser from "../../api/tasks";
import Spinner from "../Spinner";

type Props = {
    isAsideOpen: boolean;
    colsAside: string;
    colMain: string;
};

export default function Main({ isAsideOpen, colsAside, colMain }: Props) {
    const [period, setPeriod] = useState<Period>("thisWeek");
    const [type, setType] = useState<Type>("todoList");
    const [isLoading, setIsLoading] = useState(false);
    const [tasksData, setTasksData] = useState<(TodoListTask | CalendarTask)[]>(
        []
    );

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                let data;
                if (type === "todoList") {
                    data = await getTasksForUser("/api/todo-list-tasks");
                } else {
                    data = await getTasksForUser("/api/calendar-tasks");
                }

                setIsLoading(false);
                if (type === "todoList") setTasksData(data.data);
                else setTasksData(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [type]);
    return (
        <>
            <div className={colsAside}>
                <Aside isAsideOpen={isAsideOpen} type={"statistics"} />
            </div>
            <div
                className={`text-white bg-[#161922] px-6 md:px-12 pt-10 md:pt-14 height ${colMain}`}
            >
                {isLoading ? (
                    <div className="flex justify-center items-center h-full ">
                        <Spinner />
                    </div>
                ) : (
                    <>
                        <Header
                            setPeriod={setPeriod}
                            period={period}
                            setType={setType}
                            type={type}
                        />
                        <main className="pt-10">
                            <Stats
                                period={period}
                                type={type}
                                tasksData={tasksData}
                            />
                        </main>
                    </>
                )}
            </div>
        </>
    );
}
