import React from "react";

type CircleProps = {
    colour: string;
    pct?: number;
};

type TextProps = {
    percentage: number;
    color: string;
};

type PieProps = {
    percentage: number;
    colour: string;
};

const cleanPercentage = (percentage: number): number => {
    const tooLow = !Number.isFinite(+percentage) || percentage < 0;
    const tooHigh = percentage > 100;
    return tooLow ? 0 : tooHigh ? 100 : +percentage;
};

const Circle: React.FC<CircleProps> = ({ colour: color, pct }) => {
    const r = 70;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - (pct ?? 0)) * circ) / 100;
    return (
        <circle
            r={r}
            cx={100}
            cy={100}
            fill="transparent"
            stroke={strokePct !== circ ? color : "lightgrey"}
            strokeWidth={"1rem"}
            strokeDasharray={circ}
            strokeDashoffset={pct ? strokePct : 0}
            strokeLinecap="round"
        ></circle>
    );
};

const Text: React.FC<TextProps> = ({ percentage, color }) => {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={"1.5em"}
            fontWeight={"600"}
            fill={color}
        >
            {percentage.toFixed(0)}%
        </text>
    );
};

const Pie: React.FC<PieProps> = ({ percentage, colour }) => {
    const pct = cleanPercentage(percentage);
    return (
        <svg width={200} height={200}>
            <g transform={`rotate(-90 ${"100 100"})`}>
                <Circle colour="lightgrey" />
                <Circle colour={colour} pct={pct} />
            </g>
            <Text percentage={pct} color={colour} />
        </svg>
    );
};

export default Pie;
