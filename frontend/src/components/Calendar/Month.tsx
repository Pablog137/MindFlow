import React from "react";
import Day from "./Day";
import { Dayjs } from "dayjs";

type Props ={
    month: Dayjs[][];
}

export default function Month({ month } : Props) {
    return (
        <div className="flex-1 grid grid-cols-7 grid-rows-5 h-screen">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                        <Day day={day} key={idx} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    );
}
