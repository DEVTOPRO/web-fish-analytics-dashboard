import React, { FunctionComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     pv: 2400,
//   },
//   {
//     name: "Page B",
//     pv: 1398,
//   },
//   {
//     name: "Page C",
//     pv: 9800,
//   },
//   {
//     name: "Page D",
//     pv: 3908,
//   },
//   {
//     name: "Page E",
//     pv: 4800,
//   },
//   {
//     name: "Page F",
//     pv: 2390,
//   },
//   {
//     name: "Page G",
//     pv: 4300,
//   }
// ];

const CustomizedLabel= (props) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function LineCharts  (props) {
  return (
    <div>
    <LineChart
      width={580}
      height={500}
      data={props.dayCount}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="count" stroke="#8884d8">
        <LabelList content={<CustomizedLabel />} />
      </Line>
    </LineChart>
    </div>
  );
}
