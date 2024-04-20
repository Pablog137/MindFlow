import { PieChart } from "@mui/x-charts/PieChart";

type PieChartData = {
    label: string;
    value: number;
};

type Props = {
    data: PieChartData[];
    width: number;
    height: number;
};

export default function BasicPie({ data, width, height }: Props) {
    return (
        <PieChart
            series={[
                {
                    data,
                },
            ]}
            width={width}
            height={height}
        />
    );
}
