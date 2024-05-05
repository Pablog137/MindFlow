import { useEffect, useState } from "react";
import Pie from "../Charts/Pie";
import { todoListData, calendarTasksData } from "../../data/chartsData";
import CustomBarChart from "../Charts/CustomBarChart";
import CustomPieChart from "../Charts/CustomPieChart";
import Spinner from "../Spinner";

export default function Stats({
    period,
    type,
}: {
    period: string;
    type: string;
}) {
    const [tasksData, setTasksData] = useState<
        (TodoListTask | CalendarListTask)[] | undefined
    >();
    const [isLoading, setIsLoading] = useState(true);
    const [periodStartDate, setPeriodStartDate] = useState<Date | null>(null);
    const [periodEndDate, setPeriodEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const startDate = getPeriodStartDate();
        const endDate = getPeriodEndDate();

        setPeriodStartDate(startDate);
        setPeriodEndDate(endDate);
        if (type === "todoList") setTasksData(todoListData);
        else setTasksData(calendarTasksData);
        setIsLoading(false);
    }, [period, type]);

    const getPeriodStartDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const dayOfWeek = date.getDay();
        let startDate: Date | null;
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
        let endDate: Date | null;

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

    const getTotalnewTasksByDate = (): (TodoListTask | CalendarListTask)[] => {
        const filteredTodoListData =
            tasksData?.filter((task) => {
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

    const getTotalClosedTasksByDate = (): (
        | TodoListTask
        | CalendarListTask
    )[] => {
        const filteredTodoListData =
            tasksData?.filter((task) => {
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
    const getTotalPercentage = (
        method: () => (TodoListTask | CalendarListTask)[]
    ) => {
        return tasksData ? (100 * method().length) / tasksData.length : 0;
    };

    const countTasksByDifficultyByDate = () => {
        const counts: any = {};

        if (tasksData && periodStartDate && periodEndDate) {
            tasksData.forEach((task) => {
                const created_at_date = new Date(task.created_at);
                if (
                    created_at_date >= periodStartDate &&
                    created_at_date <= periodEndDate
                ) {
                    let key: string;
                    if (type === "todoList" && "difficulty" in task) {
                        key = (task as TodoListTask).difficulty;
                    } else if (type === "calendarTasks" && "tag" in task) {
                        key = (task as CalendarListTask).tag;
                    } else {
                        return;
                    }
                    if (counts[key]) {
                        counts[key]++;
                    } else {
                        counts[key] = 1;
                    }
                }
            });
        }
        return counts;
    };

    const totalData = (): number => {
        let totalAmount = 0;
        const tasksByProperty = countTasksByDifficultyByDate();
        for (const key in tasksByProperty) {
            totalAmount += tasksByProperty[key];
        }
        return totalAmount;
    };

    const prepareChartData = (): { id: string; value: number }[] => {
        const tasksByProperty = countTasksByDifficultyByDate();
        const chartData = [];
        for (const key in tasksByProperty) {
            chartData.push({
                id: key,
                value: (tasksByProperty[key] * 100) / totalData(),
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
                    tasksData?.filter((task) => {
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
                    tasksData?.filter((task) => {
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

    return isLoading ? (
        <div className="flex justify-center pt-20">
            <Spinner />
        </div>
    ) : (
        <div className="p-5 flex flex-col gap-6 ">
            <div className="grid xl:grid-cols-2 gap-4">
                <div className="bg-[#2A3041] p-10 rounded-sm flex items-center">
                    <CustomPieChart
                        prepareChartData={prepareChartData}
                        type={type}
                    />
                </div>
                <div className="bg-[#2A3041] p-10 rounded-sm flex flex-col items-center">
                    <CustomBarChart
                        getClosedTasksDataForBarChart={
                            getClosedTasksDataForBarChart
                        }
                        getNewTasksDataForBarChart={getNewTasksDataForBarChart}
                    />
                </div>
            </div>

            <div className="flex justify-center bg-[#2A3041] items-center gap-5 sm:gap-10 text-gray-500 font-semibold rounded-sm ">
                <div className="flex items-center w-1/2 xl:w-1/5 2xl:w-1/6">
                    <Pie
                        percentage={getTotalPercentage(
                            getTotalClosedTasksByDate
                        )}
                        colour={"green"}
                    />
                    <h2 className="text-sm sm:text-xl">Closed Tasks</h2>
                </div>
                <div className="flex items-center w-1/2 xl:w-1/5 2xl:w-1/6">
                    <Pie
                        percentage={getTotalPercentage(getTotalnewTasksByDate)}
                        colour={"tomato"}
                    />
                    <h2 className="text-sm sm:text-xl">New Tasks</h2>
                </div>
            </div>
        </div>
    );
}
