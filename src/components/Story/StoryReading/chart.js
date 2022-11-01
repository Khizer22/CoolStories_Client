import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Chart({chartData}) {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (chartData === null)
        return <p>LOADING</p>

    const options = {
        responsive: true,
        plugins: {
                legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Popularity over time (2022)',
                font: {
                    size: 25
                }
            }
        }
    };

    const data = {
        labels,
        datasets: [
          {
            label: 'Views',
            data: labels.map((val) => {
                if (chartData[0][val])
                    return chartData[0][val]
                else
                    return 0;
            }),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Downloads',
            data: labels.map((val) => {
                if (chartData[1][val])
                    return chartData[1][val]
                else
                    return 0;
            }),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };
      
  return <Line options={options} data={data} />;
}

export default Chart;
