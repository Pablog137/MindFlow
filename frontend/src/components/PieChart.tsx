import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({ data , width, height}) {
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
