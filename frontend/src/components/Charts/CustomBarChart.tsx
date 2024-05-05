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
        <div className="w-full h-72">
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
            />

            <ul className=" list-none flex gap-4 font-semibold justify-center items-center">
                <li className="flex gap-2">
                    <div className="bg-[green] opacity-1 w-5 h-5"></div>
                    <p>Closed tasks</p>
                </li>
                <li className="flex gap-2">
                    <div className="bg-[tomato] opacity-1 w-5 h-5"></div>
                    <p>Created tasks</p>
                </li>
            </ul>
        </div>
    );
}
