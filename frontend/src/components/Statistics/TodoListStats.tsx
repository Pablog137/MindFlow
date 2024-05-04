import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Pie from "../Pie";
import { todoListData } from "../../data/chartsData";
import { BarChart } from "@mui/x-charts/BarChart";

export default function TodoListStats({ period }: { period: string }) {
    const [todoListTasks, setTodoListTasks] = useState<TodoListTask[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTodoListTasks(todoListData);
        setIsLoading(false);
    }, []);

    // Returns current day month
    const getCurrentDayMonth = (): number => {
        return new Date().getDate();
    };

    // Returns current day week
    const getCurrentDayWeek = (): number => {
        return new Date().getDay();
    };

    const getFirstDayOfLastWeek = (): Date => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const firstDayOfLastWeek = new Date(today);
        firstDayOfLastWeek.setDate(today.getDate() - dayOfWeek - 6);
        return firstDayOfLastWeek;
    };

    const getLastDayOfLastWeek = (): Date => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const lastDayOfLastWeek = new Date(today);
        lastDayOfLastWeek.setDate(today.getDate() - dayOfWeek);
        return lastDayOfLastWeek;
    };

    const getFilteredNewTasksForPeriod = (): TodoListTask[] => {
        switch (period) {
            case "lastMonth":
                return getTotalnewTasks(getCurrentDayMonth());
            case "lastWeek":
                return getTotalnewTasksByDate(
                    getFirstDayOfLastWeek(),
                    getLastDayOfLastWeek()
                );
            case "thisWeek":
                return getTotalClosedTasks(getCurrentDayWeek());
            default:
                return [];
        }
    };
    const getFilteredClosedTasksForPeriod = (): TodoListTask[] => {
        switch (period) {
            case "lastMonth":
                return getTotalClosedTasks(getCurrentDayMonth());
            case "lastWeek":
                return getTotalClosedTasksByDate(
                    getFirstDayOfLastWeek(),
                    getLastDayOfLastWeek()
                );
            case "thisWeek":
                return getTotalClosedTasks(getCurrentDayWeek());
            default:
                return [];
        }
    };

    const getTotalnewTasks = (days: number) => {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - days);

        const filteredTodoListData =
            todoListTasks?.filter((task) => {
                const taskDate = new Date(task.created_at);
                return taskDate > startDate;
            }) || [];

        return filteredTodoListData;
    };
    const getTotalClosedTasks = (days: number) => {
        const currentDate = new Date();
        const startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - days);

        const filteredTodoListData =
            todoListTasks?.filter((task) => {
                const taskDate = task.closed_at
                    ? new Date(task.closed_at)
                    : null;
                return taskDate && taskDate > startDate;
            }) || [];

        return filteredTodoListData;
    };

    const getTotalnewTasksByDate = (
        startDate: Date,
        endDate: Date
    ): TodoListTask[] => {
        const filteredTodoListData =
            todoListTasks?.filter((task) => {
                const taskDate = new Date(task.created_at);
                return taskDate >= startDate && taskDate <= endDate;
            }) || [];
        return filteredTodoListData;
    };

    const getTotalClosedTasksByDate = (
        startDate: Date,
        endDate: Date
    ): TodoListTask[] => {
        const filteredTodoListData =
            todoListTasks?.filter((task) => {
                const taskClosedDate = task.closed_at
                    ? new Date(task.closed_at)
                    : null;
                return (
                    taskClosedDate &&
                    taskClosedDate >= startDate &&
                    taskClosedDate <= endDate
                );
            }) || [];
        return filteredTodoListData;
    };

    const getTotalPercentage = (method: () => TodoListTask[]) => {
        return todoListTasks
            ? (100 * method().length) / todoListTasks.length
            : 0;
    };

    const countTasksByDifficulty = () => {
        const difficultyCounts: any = {};
        if (todoListTasks) {
            todoListTasks.forEach((task) => {
                const difficulty = task.difficulty;
                if (difficultyCounts[difficulty]) {
                    difficultyCounts[difficulty]++;
                } else {
                    difficultyCounts[difficulty] = 1;
                }
            });
            return difficultyCounts;
        }
        return {};
    };

    const totalData = () => {
        let totalAmount = 0;
        const tasksByDifficulty = countTasksByDifficulty();
        for (const task in tasksByDifficulty) {
            totalAmount += tasksByDifficulty[task];
        }
        return totalAmount;
    };

    const prepareChartData = () => {
        const tasksByDifficulty = countTasksByDifficulty();
        const chartData = [];

        for (const difficulty in tasksByDifficulty) {
            chartData.push({
                id: difficulty,
                value: (tasksByDifficulty[difficulty] * 100) / totalData(),
            });
        }
        return chartData;
    };

    return (
        <div className="p-5 flex flex-col gap-6 ">
            {/*TODO Tags*/}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2A3041] p-10 rounded-sm flex items-center">
                    <div className="grid grid-cols-10 items-center">
                        <div className="col-span-7">
                            <PieChart
                                series={[
                                    {
                                        data: prepareChartData(),
                                        highlightScope: {
                                            faded: "global",
                                            highlighted: "item",
                                        },
                                        faded: {
                                            innerRadius: 30,
                                            additionalRadius: -30,
                                            color: "gray",
                                        },
                                    },
                                ]}
                                width={500}
                                height={230}
                            />
                        </div>
                        <div className="col-span-3">
                            <h2 className="text-xl font-semibold pb-4">
                                Difficulty level
                            </h2>
                            <ul className=" list-none flex flex-col gap-2 font-semibold">
                                <li className="flex gap-2">
                                    <div className="bg-[#2E96FF] opacity-1 w-5 h-5"></div>
                                    <p>Easy</p>
                                </li>
                                <li className="flex gap-2">
                                    <div className="bg-[#02B2AF] opacity-1 w-5 h-5"></div>
                                    <p>Medium</p>
                                </li>
                                <li className="flex gap-2">
                                    <div className="bg-[#B800D8] opacity-1 w-5 h-5"></div>
                                    <p>Hard</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-[#2A3041] p-10 rounded-sm flex flex-col items-center">
                    <BarChart
                        series={[
                            {
                                data: [4, 6],
                                color: "tomato",
                            },
                            {
                                data: [3, 5],
                                color: "green",
                            },
                        ]}
                        width={500}
                        height={350}
                    />

                    <ul className=" list-none flex gap-4 font-semibold">
                        <li className="flex gap-2">
                            <div className="bg-[green] opacity-1 w-5 h-5"></div>
                            <p>Closed tasks</p>
                        </li>
                        <li className="flex gap-2">
                            <div className="bg-[tomato] opacity-1 w-5 h-5"></div>
                            <p>Created tasks</p>
                        </li>
                    </ul>
                </div>
            </div>

            {/*TODO completed and created tasks*/}

            {isLoading ? (
                <h5>Is loading</h5>
            ) : (
                <div className="flex justify-center bg-[#2A3041] items-center gap-10 px-14 pt-20 py-10 text-gray-500 font-semibold rounded-sm ">
                    <div className="flex items-center">
                        <Pie
                            percentage={getTotalPercentage(
                                getFilteredClosedTasksForPeriod
                            )}
                            colour={"green"}
                        />
                        <h2 className="text-xl">Closed Tasks</h2>
                    </div>
                    <div className="flex items-center">
                        <Pie
                            percentage={getTotalPercentage(
                                getFilteredNewTasksForPeriod
                            )}
                            colour={"tomato"}
                        />
                        <h2 className="text-xl">New Tasks</h2>
                    </div>
                </div>
            )}
        </div>
    );
}
