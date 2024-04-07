import React from "react";
import Day from "./Day";
import { Dayjs } from "dayjs";

type Props = {
    month: Dayjs[][];
    tasks: CalendarTask[];
};

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default function Month({ month, tasks }: Props) {
    const getTasks = (day: Dayjs) => {
        return tasks.filter((task) => task.date === day.format("YYYY-MM-DD"));
    };
    return (
        <div className="bg-[#F0F0F8] rounded-lg p-4 border-2 border-purple-500">
            <div className="grid grid-cols-5">
                {weekDays.map((day, idx) => (
                    <div
                        key={idx}
                        className={`text-center text-sm border text-gray-600 font-semibold bg-white p-3`}
                    >
                        {day}
                    </div>
                ))}
            </div>
            <div className="flex-1 grid grid-cols-5 grid-rows-5 bg-white text-black ">
                {month.map((row, i) => (
                    <React.Fragment key={i}>
                        {row
                            .filter((day) => day.day() >= 1 && day.day() <= 5)
                            .map((day, idx) => (
                                <Day
                                    key={idx}
                                    day={day}
                                    tasks={getTasks(day)}
                                />
                            ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
