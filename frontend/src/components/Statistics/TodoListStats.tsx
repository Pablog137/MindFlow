import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Pie from "../Pie";
import { todoListData } from "../../data/chartsData";
import { BarChart } from "@mui/x-charts/BarChart";

export default function TodoListStats({ period }: { period: string }) {
    const [todoListTasks, setTodoListTasks] = useState<TodoListTask[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [periodStartDate, setPeriodStartDate] = useState<Date | null>(null);
    const [periodEndDate, setPeriodEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const startDate = getPeriodStartDate();
        const endDate = getPeriodEndDate();

        setPeriodStartDate(startDate);
        setPeriodEndDate(endDate);
        setTodoListTasks(todoListData);
        setIsLoading(false);
    }, [period]);

    const getPeriodStartDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const dayOfWeek = date.getDay();
        let startDate;
        switch (period) {
            case "thisMonth":
                startDate = new Date(year, month, 1);
                break;
            case "thisWeek":
                startDate = new Date(date.setDate(date.getDate() - dayOfWeek));
                break;
            case "lastWeek":
                startDate = new Date(
                    date.setDate(date.getDate() - dayOfWeek - 7)
                );
                break;
            case "lastMonth":
                startDate = new Date(year, month - 1, 1);
                break;
            default:
                startDate = null;
        }
        return startDate;
    };

    const getPeriodEndDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const dayOfMonth = date.getDate();
        const dayOfWeek = date.getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        let endDate;

        switch (period) {
            case "thisMonth":
                endDate = new Date(year, month, dayOfMonth);
                break;
            case "thisWeek":
                endDate = new Date(
                    date.setDate(date.getDate() - dayOfWeek + 6)
                );
                break;
            case "lastWeek":
                endDate = new Date(
                    date.setDate(date.getDate() - dayOfWeek - 1)
                );
                break;
            case "lastMonth":
                endDate = new Date(year, month - 1, lastDayOfMonth);
                break;
            default:
                endDate = null;
        }

        return endDate;
    };

    const getTotalnewTasksByDate = (): TodoListTask[] => {
        const filteredTodoListData =
            todoListTasks?.filter((task) => {
                const taskDate = new Date(task.created_at);
                return (
                    periodStartDate !== null &&
                    periodEndDate !== null &&
                    taskDate >= periodStartDate &&
                    taskDate <= periodEndDate
                );
            }) || [];
        return filteredTodoListData;
    };

    const getTotalClosedTasksByDate = (): TodoListTask[] => {
        const filteredTodoListData =
            todoListTasks?.filter((task) => {
                const taskClosedDate = task.closed_at
                    ? new Date(task.closed_at)
                    : null;
                return (
                    taskClosedDate !== null &&
                    periodStartDate !== null &&
                    periodEndDate !== null &&
                    taskClosedDate >= periodStartDate &&
                    taskClosedDate <= periodEndDate
                );
            }) || [];
        return filteredTodoListData;
    };
    const getTotalPercentage = (method: () => TodoListTask[]) => {
        return todoListTasks
            ? (100 * method().length) / todoListTasks.length
            : 0;
    };

    const countTasksByDifficultyByDate = () => {
        const difficultyCounts: any = {};
        if (todoListTasks && periodStartDate && periodEndDate) {
            todoListTasks.forEach((task) => {
                const created_at_date = new Date(task.created_at);
                if (
                    created_at_date >= periodStartDate &&
                    created_at_date <= periodEndDate
                ) {
                    const difficulty = task.difficulty;

                    if (difficultyCounts[difficulty]) {
                        difficultyCounts[difficulty]++;
                    } else {
                        difficultyCounts[difficulty] = 1;
                    }
                }
            });
        }
        return difficultyCounts;
    };

    const totalData = () => {
        let totalAmount = 0;
        const tasksByDifficulty = countTasksByDifficultyByDate();
        for (const task in tasksByDifficulty) {
            totalAmount += tasksByDifficulty[task];
        }
        return totalAmount;
    };

    const prepareChartData = () => {
        const tasksByDifficulty = countTasksByDifficultyByDate();
        const chartData = [];

        for (const difficulty in tasksByDifficulty) {
            chartData.push({
                id: difficulty,
                value: (tasksByDifficulty[difficulty] * 100) / totalData(),
            });
        }
        return chartData;
    };

    const getNewTasksDataForBarChart = (): number[] => {
        const newTasksData = [];
        if (periodStartDate && periodEndDate) {
            const currentDate = new Date(periodStartDate);

            while (currentDate <= periodEndDate) {
                const currentDateISOString = currentDate
                    .toISOString()
                    .split("T")[0];
                const newTasksCount =
                    todoListTasks?.filter((task) => {
                        const taskDate = new Date(task.created_at)
                            .toISOString()
                            .split("T")[0];
                        return taskDate === currentDateISOString;
                    }).length || 0;
                newTasksData.push(newTasksCount);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        return newTasksData;
    };

    const getClosedTasksDataForBarChart = (): number[] => {
        const closedTasksData = [];
        if (periodStartDate && periodEndDate) {
            const currentDate = new Date(periodStartDate);

            while (currentDate <= periodEndDate) {
                const currentDateISOString = currentDate
                    .toISOString()
                    .split("T")[0];
                const closedTasksCount =
                    todoListTasks?.filter((task) => {
                        if (task.closed_at) {
                            const taskDate = new Date(task.closed_at)
                                ?.toISOString()
                                .split("T")[0];
                            return taskDate === currentDateISOString;
                        }
                        return false;
                    }).length || 0;
                closedTasksData.push(closedTasksCount);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        return closedTasksData;
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
                            <h2 className="text-xl font-semibold pb-4 text-center">
                                Difficulty level of new tasks
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
                                data: getNewTasksDataForBarChart(),
                                color: "tomato",
                            },
                            {
                                data: getClosedTasksDataForBarChart(),
                                color: "green",
                            },
                        ]}
                        width={700}
                        height={400}
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
                                getTotalClosedTasksByDate
                            )}
                            colour={"green"}
                        />
                        <h2 className="text-xl">Closed Tasks</h2>
                    </div>
                    <div className="flex items-center">
                        <Pie
                            percentage={getTotalPercentage(
                                getTotalnewTasksByDate
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
