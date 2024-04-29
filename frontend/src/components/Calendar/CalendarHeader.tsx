import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../../context/CalendarContext";
import AddTask from "./AddTaskModal";
import DeleteTask from "./DeleteTask";
import { useDrop } from "react-dnd";

type Props = {
    addTask: (Task: CalendarTask) => void;
    deleteTask: (id: string | number) => void;
};

export default function CalendarHeader({ addTask, deleteTask }: Props) {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);

    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }

    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }

    function handleReset() {
        setMonthIndex(
            monthIndex === dayjs().month()
                ? monthIndex + Math.random()
                : dayjs().month()
        );
    }

    const [, drop] = useDrop({
        accept: "TASK",
        drop: (task: CalendarTask) => deleteTask(task.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <header className="py-6 flex items-center justify-between px-2">
            <button
                onClick={handleReset}
                className="border rounded py-2 px-4 text-white hover:border-purple-500"
            >
                Today
            </button>
            <div className="flex flex-col justify-center items-center">
                <div className="flex items-center">
                    <button
                        onClick={handlePrevMonth}
                        className="flex items-center hover:border-purple-500"
                    >
                        <span className="material-icons-outlined cursor-pointer text-purple-500 mx-2">
                            chevron_left
                        </span>
                    </button>
                    <h2 className=" text-center text-md md:text-xl 2xl:text-3xl text-white font-bold">
                        {dayjs(new Date(dayjs().year(), monthIndex)).format(
                            "MMMM YYYY"
                        )}
                    </h2>
                    <button
                        onClick={handleNextMonth}
                        className="flex items-center"
                    >
                        <span className="material-icons-outlined cursor-pointer text-purple-500 mx-2">
                            chevron_right
                        </span>
                    </button>
                </div>
                <DeleteTask drop={drop} />
            </div>

            <AddTask addTask={addTask} />
        </header>
    );
}
