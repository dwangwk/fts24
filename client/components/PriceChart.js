import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PriceChart = ({ priceData = [] }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (Array.isArray(priceData) && priceData.length > 0) {
      console.log("this is happening");
      const parsedData = {
        labels: priceData.map(item => new Date(item[0]).toLocaleDateString('en-GB')),
        datasets: [{
          label: 'Price',
          data: priceData.map(item => item[1]),
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        }],
      };
      console.log("labels: ", parsedData.labels);
      console.log("data: ", parsedData.datasets[0].data);
      setChartData(parsedData);
    } else {
      console.log("this is not happening");
    }
  }, [priceData]);

  return (
    <div>
    {chartData.datasets && chartData.datasets[0].data && (
      <Line  
      data={chartData} />
    )}
  </div>
  );
};

export default PriceChart;
