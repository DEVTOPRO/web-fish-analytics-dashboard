import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';



export default function PieChart2(props){
    // Mock data representing the number of videos with and without fish
const data = [
    { name: 'Videos With Fish', value: 6 }, // Example value for videos with fish
    { name: 'Videos Without Fish', value: 341 }, // Example value for videos without fish
    { name: 'Videos which may contain Fish', value: 13 },
  ];
  const COLORS = ['#0088FE', '#FFBB28', '#FF2D2A']; // Colors for each slice
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={(entry) => entry.name}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

