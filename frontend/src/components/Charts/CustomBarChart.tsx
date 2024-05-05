import { BarChart } from "@mui/x-charts/BarChart";

type Props = {
    getNewTasksDataForBarChart: () => number[];
    getClosedTasksDataForBarChart: () => number[];
};

export default function CustomBarChart({
    getNewTasksDataForBarChart,
    getClosedTasksDataForBarChart,
}: Props) {
    return (
        <>
            <BarChart
                series={[
                    {
                        data: getNewTasksDataForBarChart(),
                        color: "tomato",
                    },
                    {
                        data: getClosedTasksDataForBarChart(),
                        color: "green",
                    },
                ]}
                width={700}
                height={400}
            />

            <ul className=" list-none flex gap-4 font-semibold">
                <li className="flex gap-2">
                    <div className="bg-[green] opacity-1 w-5 h-5"></div>
                    <p>Closed tasks</p>
                </li>
                <li className="flex gap-2">
                    <div className="bg-[tomato] opacity-1 w-5 h-5"></div>
                    <p>Created tasks</p>
                </li>
            </ul>
        </>
    );
}
