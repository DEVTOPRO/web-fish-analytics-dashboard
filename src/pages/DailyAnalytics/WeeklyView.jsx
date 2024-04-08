import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";

const colors = scaleOrdinal(schemeCategory10).range();


const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  } 
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

 function TriangleBar (props)  {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

export default function CustomBar(props) {
  return (
    <BarChart
      width={900}
      height={450}
      data={props.weeklyDate}
      margin={{
        top: 20,
        right: 20,
        left: 15,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar
        dataKey="count"
        fill="#8884d8"
        shape={<TriangleBar />}
        label={{ position: "top" }}
      >
        {props.weeklyDate.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
  );
}
