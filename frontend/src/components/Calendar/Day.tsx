import dayjs from "dayjs";

type Props = {
    day: dayjs.Dayjs;
    rowIdx: number;
};

export default function Day({ day, rowIdx }: Props) {
    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-blue-600 text-white rounded-full w-7"
            : "";
    }
    return (
        <div className="text-white border border-gray-200 flex flex-col">
            <header className="flex flex-col items-center">
                {rowIdx === 0 && (
                    <p className="text-sm mt-1">
                        {day.format("ddd").toUpperCase()}
                    </p>
                )}
                <p
                    className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
                >
                    {day.format("DD")}
                </p>
            </header>
        </div>
    );
}
