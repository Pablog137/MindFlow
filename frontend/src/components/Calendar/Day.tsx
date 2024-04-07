import dayjs from "dayjs";

type Props = {
    day: dayjs.Dayjs;
    tasks: CalendarTask[];
};

type PriorityColors = {
    [key: number]: string;
};

const priorityColors: PriorityColors = {
    1: "bg-red-200",
    2: "bg-yellow-200",
    3: "bg-green-200",
};

export default function Day({ day, tasks }: Props) {
    return (
        <div className="border border-gray-200 flex flex-col p-1 min-h-20">
            <header className="flex flex-col items- justify-start">
                <p className={`text-md p-1 my-1 font-bold text-gray-500 ml-2`}>
                    {day.format("D")}
                </p>
            </header>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="p-2">
                        <p
                            className={`text-sm font-regular p-1 rounded-md ${
                                priorityColors[task.priority]
                            }`}
                        >
                            {task.description}
                        </p>
                        {/* <p className="text-xs">{task.priority}</p> */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
