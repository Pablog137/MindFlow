import dayjs from "dayjs";
import Task from "./Task";
import { useDrop } from "react-dnd";

type Props = {
    day: dayjs.Dayjs;
    tasks: CalendarTask[];
    addTasks: (id: string | number, date: string) => void;
};

export default function Day({ day, tasks, addTasks }: Props) {
    const [{ isOver }, drop] = useDrop({
        accept: "TASK",
        drop: (task: CalendarTask) =>
            addTasks(task.id, day.format("YYYY-MM-DD")),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={`border border-gray-200 flex flex-col p-1 min-h-20 ${isOver &&"bg-gray-200"}`}
        >
            <header className="flex flex-col items- justify-start">
                <p className={`text-md p-1 my-1 font-bold text-gray-500 ml-2`}>
                    {day.format("D")}
                </p>
            </header>
            <ul>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </ul>
        </div>
    );
}
