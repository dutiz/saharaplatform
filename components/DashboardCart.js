import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import SVG from 'react-inlinesvg'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

export const options = {
  responsive: true,
  elements: {
    line: {
      tension: 0.4,
    },
  },
}
const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'Octomber',
  'November',
  'December',
]

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      data: [18, 22, 17, 20, 23, 14, 14, 17],
      borderColor: 'rgb(227, 54, 107)',
      backgroundColor: 'rgba(255, 68, 255, 0.27)',
    },
  ],
}

export default function DashboardCart({ svg, title, children }) {
  return (
    <div className="col-4 mt-5">
      <div className="rounded-md  bg-white p-3">
        <div className="flex flex-row items-center">
          <div className="col-6  ml-3">
            <p className="text-2xl">{title}</p>
            <p>{children}</p>
          </div>
          <div className="col-4 flex flex-col items-end">
            <SVG
              style={{ color: 'rgb(227, 54, 107)' }}
              src={`/svg/${svg}`}
              className="fill-current  w-10 h-10"
            />
          </div>
        </div>
        <Line className="mt-3" options={options} data={data} />
      </div>
    </div>
  )
}
