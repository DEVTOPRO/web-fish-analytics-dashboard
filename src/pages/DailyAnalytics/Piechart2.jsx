import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';



export default function PieChart2(props){
    // Mock data representing the number of videos with and without fish
    let percentage=(props.data.totalScore/props.data.today)*100;
    console.log(percentage);
const data = [
    { name: 'Fish avalible Score', value:percentage  }, // Example value for videos with fish
    { name: 'Fish Pending Score', value: 100-percentage }, // Example value for videos without fish
  ];
  const COLORS = ['#0088FE', '#8884d8', '#FF2D2A']; // Colors for each slice
    return (
      <ResponsiveContainer width="70%" height={400}>
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

