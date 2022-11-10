import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DailyBarChart({ orders, tables }) {
  const hours = Array.from({ length: new Date().getHours() + 1 }, (_, i) => i)
  const dailyOrders = []
  const dailyTables = []

  var ordersIncome = 0
  orders.forEach((element) => {
    if (element.createdAt.split('T')[0] === new Date().toISOString().split('T')[0]) {
      ordersIncome = ordersIncome + element.total
    }
  })
  var tablesIncome = 0
  tables.forEach((element) => {
    if (element.createdAt.split('T')[0] === new Date().toISOString().split('T')[0]) {
      tablesIncome = tablesIncome + element.total
    }
  })
  hours.forEach((hour) => {
    var count = 0
    tables.forEach((element) => {
      if (element.createdAt.split('T')[0] === new Date().toISOString().split('T')[0]) {
        if (new Date(element.createdAt).getHours() === hour) {
          count = count + element.total
        }
      }
    })
    dailyTables.push(count)
  })
  hours.forEach((hour) => {
    var count = 0
    orders.forEach((element) => {
      if (element.createdAt.split('T')[0] === new Date().toISOString().split('T')[0]) {
        if (new Date(element.createdAt).getHours() === hour) {
          count = count + element.total
        }
      }
    })
    dailyOrders.push(count)
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
  }
  const labels = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ]
  const data = {
    labels,
    datasets: [
      {
        label: 'Orders Income',
        data: dailyOrders,
        backgroundColor: 'rgba(255, 68, 255, 0.5)',
      },
      {
        label: 'Tables Income',
        fill: true,
        data: dailyTables,
        backgroundColor: 'rgba(234, 191, 249 , 0.5)',
      },
    ],
  }
  return (
    <div className="lg:col-6">
      <div className="rounded-md  bg-white p-3">
        <h1 className="text-3xl font-semibold">Daily Revenue</h1>
        <div className="row">
          <div className="col-6">
            <p className="mt-4">Orders Income</p>
            <p className="mt-2 md:text-2xl text-xl">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                ordersIncome
              )}
            </p>
          </div>
          <div className="col-6">
            <p className="mt-4">Tables Income</p>
            <p className="mt-2 md:text-2xl text-xl">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                tablesIncome
              )}
            </p>
          </div>
        </div>
        <Bar className="mt-3" options={options} data={data} />
      </div>
    </div>
  )
}
