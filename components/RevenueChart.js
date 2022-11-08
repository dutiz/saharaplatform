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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

export default function RevenueChart({ orders, tables }) {
  const months = Array.from({ length: new Date().getMonth() }, (_, i) => i + 1)
  const arr = []
  const table = []
  var ordersIncome = 0
  var tablesIncome = 0

  orders.forEach((element) => {
    ordersIncome = ordersIncome + element.total
  })
  tables.forEach((element) => {
    tablesIncome = tablesIncome + element.total
  })
  months.forEach((month) => {
    var count = 0
    tables.forEach((element) => {
      if (new Date(element.createdAt).getMonth() === month) {
        count = count + element.total
      }
    })
    table.push(count)
  })
  months.forEach((month) => {
    var count = 0
    orders.forEach((element) => {
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
        label: 'Orders Income',
        fill: true,
        data: arr,
        borderColor: 'rgb(227, 54, 107)',
        backgroundColor: 'rgba(255, 68, 255, 0.27)',
      },
      {
        label: 'Tables Income',
        fill: true,
        data: table,
        borderColor: 'rgb(255, 149, 249)',
        backgroundColor: 'rgba(234, 191, 249 , 0.5)',
      },
    ],
  }
  return (
    <div className="col-6">
      <div className="rounded-md  bg-white p-3">
        <h1 className="text-3xl font-semibold">Monthly Revenue</h1>
        <div className="row">
          <div className="col-6">
            <p className="mt-4">Orders Income</p>
            <p className="mt-2 text-2xl">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                ordersIncome
              )}
            </p>
          </div>
          <div className="col-6">
            <p className="mt-4">Tables Income</p>
            <p className="mt-2 text-2xl">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                tablesIncome
              )}
            </p>
          </div>
        </div>
        <Line className="mt-3" options={options} data={chartData} />
      </div>
    </div>
  )
}
