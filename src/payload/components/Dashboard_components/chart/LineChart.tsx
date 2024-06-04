import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      // rtl: true,
      // textDirection: "rtl",
      labels: {
        font: {
          size: 20,
          color: '#fff',
        },
      },
    },
  },
}

interface Props {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
  }[]
}
const LineChart: React.FC<{ chartData: Props }> = props => {
  return <Line data={props.chartData} options={options} />
}

export default LineChart
