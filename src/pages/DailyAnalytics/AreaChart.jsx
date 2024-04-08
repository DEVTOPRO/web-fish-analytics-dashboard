import React from 'react';



// Main component to hold the cards
export default function AreaChart (props) {
  // Mock data for fish detection
  const fishCounts = {
    today: 120, // Number of fishes detected today
    yesterday: 95 // Number of fishes detected yesterday
  };
  const Card = ({ title, count }) => {
  
    return(
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      textAlign: 'center',
      // backgroundColor: '#f9f9f9'
      background:"linear-gradient(to right top, #968eff, #00bbff, #00dcff, #00f2c0, #63fb4c)"
    }}>
      <h2>{title}</h2>
      <p>{count} Fishes Detected</p>
    </div>)
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      <Card title="Today" count={props.totalEventsCount.today} />
      <Card title="Yesterday" count={props.totalEventsCount.yestday} />
    </div>
  );
};

