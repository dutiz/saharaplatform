import axios from 'axios'

import DailyBarChart from '@/components/DailyBarChart'
import DashboardCart from '@/components/DashboardCart'
import IncomeDashboardCart from '@/components/IncomeDashboardCart'
import Admin from '@/components/layout/Admin'
import RevenueChart from '@/components/RevenueChart'
import RecentOrderSecton from '@/components/sections/RecentOrderSecton'
import TrendingSection from '@/components/sections/TrendingSection'

export default function index({ orders, products, tables }) {
  const TodayDate = new Date().toISOString().split('T')[0]
  const dailyOrdersFinded = orders.filter((order) => order.createdAt.split('T')[0] === TodayDate)
  const productsOrdered = []
  dailyOrdersFinded.forEach((order) => {
    order.orderedProducts.forEach((o) => {
      productsOrdered.push(o)
    })
  })
  var counter = []
  productsOrdered.forEach(function (obj) {
    var key = obj._id
    counter[key] = (counter[key] || 0) + obj.quantity
  })

  return (
    <Admin title="Dashboard - Sahra Food">
      <div className="row">
        <div className="col-12">
          <h2 className="text-3xl font-bold">Welcome Admin</h2>
          <p className="mt-5 font-semibold">Welcome to Sahara Food!</p>
        </div>
      </div>
      <div className="row">
        <DashboardCart svg="orders.svg" title={orders.length} data={orders}>
          Orders
        </DashboardCart>
        <DashboardCart svg="admin-customers.svg" data={orders}>
          Customers
        </DashboardCart>
        <IncomeDashboardCart svg="income.svg" data={orders}>
          Incomes
        </IncomeDashboardCart>
      </div>
      <div className="row mt-8">
        {/* Revenue Chart  */}
        <RevenueChart orders={orders} tables={tables} />
        <DailyBarChart orders={orders} tables={tables} />
      </div>
      <div className="row my-8">
        {/* RecentOrdersSection */}
        <RecentOrderSecton orders={orders} />
        {/* Daily Trending Menus */}
        <TrendingSection dailyOrdersFinded={dailyOrdersFinded} order={counter} p={products} />
      </div>
    </Admin>
  )
}
export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || ''

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }
  const menuOrders = await axios.get('https://sahara-food.netlify.app/api/orders')
  const menuProducts = await axios.get('https://sahara-food.netlify.app/api/products')
  const archiveTables = await axios.get('https://sahara-food.netlify.app/api/archive')
  return {
    props: {
      orders: menuOrders.data,
      products: menuProducts.data,
      tables: archiveTables.data,
    },
  }
}
