import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import Pie from "../Pie";
import { todoListData } from "../../data/chartsData";

export default function GithubStats({ period }: { period: string }) {
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

    return (
        <>
            {/*TODO Tags*/}
            <PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 10, label: "series A" },
                            { id: 1, value: 15, label: "series B" },
                            { id: 2, value: 20, label: "series C" },
                        ],
                    },
                ]}
                width={400}
                height={200}
            />
            {/*TODO completed and created tasks*/}

            {isLoading ? (
                <h5>Is loading</h5>
            ) : (
                <>
                    <Pie
                        percentage={getTotalPercentage(
                            getFilteredClosedTasksForPeriod
                        )}
                        colour={"green"}
                    />
                    <Pie
                        percentage={getTotalPercentage(
                            getFilteredNewTasksForPeriod
                        )}
                        colour={"tomato"}
                    />
                </>
            )}
        </>
    );
}
