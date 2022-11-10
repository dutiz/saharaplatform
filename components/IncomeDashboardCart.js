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

export default function IncomeDashboardCart({ svg, data, children }) {
  const months = Array.from({ length: new Date().getMonth() }, (_, i) => i + 1)
  const arr = []
  var total = 0
  data.forEach((element) => {
    total = total + element.total
  })
  months.forEach((month) => {
    var count = 0
    data.forEach((element) => {
      if (new Date(element.createdAt).getMonth() === month) {
        count = count + element.total
      }
    })
    arr.push(count)
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''

            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y)
            }
            return label
          },
        },
      },
    },
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
  const chartData = {
    labels,
    datasets: [
      {
        label: `${children}`,
        fill: true,
        data: arr,
        borderColor: 'rgb(227, 54, 107)',
        backgroundColor: 'rgba(255, 68, 255, 0.27)',
      },
    ],
  }
  return (
    <div className="lg:col-4 mt-5">
      <div className="rounded-md  bg-white p-3">
        <div className="flex flex-row items-center">
          <div className="col-6  ml-3">
            <p className="text-2xl">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
            </p>
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
        <Line className="mt-3" options={options} data={chartData} />
      </div>
    </div>
  )
}
