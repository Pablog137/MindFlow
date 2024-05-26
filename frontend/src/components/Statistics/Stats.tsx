import { useEffect, useState } from "react";
import Pie from "../Charts/Pie";
import CustomBarChart from "../Charts/CustomBarChart";
import CustomPieChart from "../Charts/CustomPieChart";
import Spinner from "../Spinner";

// const difficultyLevels = ["Easy", "Medium", "Hard"];

const difficultyLevels: { [key: number]: string } = {
    1: "Easy",
    2: "Medium",
    3: "Hard",
};

type Props = {
    period: string;
    type: string;
    tasksData: (TodoListTask | CalendarTask)[];
};

export default function Stats({ period, type, tasksData }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [periodStartDate, setPeriodStartDate] = useState<Date | null>(null);
    const [periodEndDate, setPeriodEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const startDate = getPeriodStartDate();
        const endDate = getPeriodEndDate();

        setPeriodStartDate(startDate);
        setPeriodEndDate(endDate);
        setIsLoading(false);
    }, [period, type]);

    const getPeriodStartDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
        let startDate = null;

        switch (period) {
            case "thisMonth":
                startDate = new Date(year, month, 1);
                break;
            case "thisWeek":
                startDate = new Date(date);
                startDate.setDate(date.getDate() - dayOfWeek + 1);
                break;
            case "lastWeek":
                startDate = new Date(date);
                startDate.setDate(date.getDate() - dayOfWeek - 6);
                break;
            case "lastMonth":
                startDate = new Date(year, month - 1, 1);
                break;
            default:
                startDate = null;
        }

        startDate?.setHours(0, 0, 0);
        return startDate;
    };

    const getPeriodEndDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const dayOfMonth = date.getDate();
        const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
        const currentMinutes = date.getMinutes();
        const currentHours = date.getHours();
        const currentSeconds = date.getSeconds();
        let endDate = null;

        switch (period) {
            case "thisMonth":
                endDate = new Date(year, month, dayOfMonth);
                break;
            case "thisWeek":
                endDate = new Date(date);
                endDate.setDate(
                    date.getDate() - dayOfWeek + (dayOfWeek === 0 ? 0 : 7)
                );
                break;
            case "lastWeek":
                endDate = new Date(date);
                endDate.setDate(date.getDate() - dayOfWeek);
                break;
            case "lastMonth":
                endDate = new Date(year, month - 1, lastDayOfMonth - 1);
                break;
            default:
                endDate = null;
        }

        endDate?.setHours(currentHours, currentMinutes, currentSeconds);
        return endDate;
    };

    const getTotalnewTasksByDate = (): (TodoListTask | CalendarTask)[] => {
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

    const getTotalClosedTasksByDate = (): (TodoListTask | CalendarTask)[] => {
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
        method: () => (TodoListTask | CalendarTask)[]
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
                    created_at_date <= periodEndDate &&
                    task.closed_at === null
                ) {
                    let key: string;
                    if (type === "todoList" && "difficulty" in task) {
                        key =
                            difficultyLevels[(task as TodoListTask).difficulty];
                    } else if (type === "calendarTasks" && "tag" in task) {
                        key = (task as CalendarTask).tag;
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
            const currentTime = new Date().toLocaleString("en-US", {
                timeZone: "Europe/Madrid",
            });
            const currentDate = new Date(currentTime);

            periodEndDate.setHours(
                currentDate.getHours(),
                currentDate.getMinutes(),
                currentDate.getSeconds()
            );

            const startDate = new Date(periodStartDate);
            const endDate = new Date(periodEndDate);
            newTasksData.push(0);
            while (startDate <= endDate) {
                const newTasksCount =
                    tasksData?.filter((task) => {
                        const taskDate = new Date(task.created_at);
                        const currentEndDate = new Date(startDate);
                        currentEndDate.setHours(23, 59, 59);
                        return (
                            taskDate >= startDate && taskDate <= currentEndDate
                        );
                    }).length || 0;
                newTasksData.push(newTasksCount);
                startDate.setDate(startDate.getDate() + 1);
            }
        }
        return newTasksData;
    };

    const getClosedTasksDataForBarChart = (): number[] => {
        const newTasksData = [];
        if (periodStartDate && periodEndDate) {
            const currentTime = new Date().toLocaleString("en-US", {
                timeZone: "Europe/Madrid",
            });
            const currentDate = new Date(currentTime);

            periodEndDate.setHours(
                currentDate.getHours(),
                currentDate.getMinutes(),
                currentDate.getSeconds()
            );

            const startDate = new Date(periodStartDate);
            const endDate = new Date(periodEndDate);
            newTasksData.push(0);
            while (startDate <= endDate) {
                const newTasksCount =
                    tasksData?.filter((task) => {
                        if (task.closed_at) {
                            const taskDate = new Date(task.closed_at);
                            const currentEndDate = new Date(startDate);
                            currentEndDate.setHours(23, 59, 59);
                            return (
                                taskDate >= startDate &&
                                taskDate <= currentEndDate
                            );
                        }
                    }).length || 0;
                newTasksData.push(newTasksCount);
                startDate.setDate(startDate.getDate() + 1);
            }
        }
        return newTasksData;
    };

    return isLoading ? (
        <div className="flex justify-center pt-20 height">
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
