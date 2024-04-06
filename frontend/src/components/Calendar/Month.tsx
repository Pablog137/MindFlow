import React from "react";
import Day from "./Day";
import { Dayjs } from "dayjs";

type Props ={
    month: Dayjs[][];
}

export default function Month({ month } : Props) {
    return (
        <div className="flex-1 grid grid-cols-5 grid-rows-5 h-screen">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row
                        .filter((day) => day.day() >= 1 && day.day() <= 5)
                        .map((day, idx) => (
                            <Day day={day} key={idx} rowIdx={i} />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );
}
