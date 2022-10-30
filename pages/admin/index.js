import axios from 'axios'

import DashboardCart from '@/components/DashboardCart'
import Dropdown from '@/components/Dropdown'
import Admin from '@/components/layout/Admin'
import TrendingSection from '@/components/sections/TrendingSection'

export default function index({ orders, products }) {
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
        <DashboardCart svg="orders.svg" title={orders.length}>
          Orders
        </DashboardCart>
        <DashboardCart svg="admin-customers.svg" title={orders.length}>
          Customer
        </DashboardCart>
        <DashboardCart svg="income.svg" title={orders.length}>
          Income
        </DashboardCart>
      </div>
      {/* RecentOrdersSection */}
      <div className="row my-5">
        <div className="col-8">
          <div className="bg-white rounded-md p-3">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <table className="w-full pt-5">
              <tbody>
                {orders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(0, 6)
                  .map((order) => (
                    <tr className="shadow-none hover:shadow-xl " key={order._id}>
                      <td>
                        <p className="font-bold">{order.orderedProducts[0].title}</p>
                        <p>{order._id.slice(0, 7)}</p>
                      </td>
                      <td>
                        <p className="font-bold">{order.customer}</p>
                        <p className="mt-3">{order.address}</p>
                      </td>
                      <td>
                        <p>
                          $ {order.total} x{order.orderedProducts[0].quantity}
                        </p>
                      </td>
                      <td>
                        <p className="mx-5 text-center px-3 py-1 rounded-lg text-white bg-gradient-to-r from-orange-500 to-red-500">
                          {order.status === 0
                            ? 'Preparing'
                            : order.status === 1
                            ? 'On the way'
                            : 'Delivered'}
                        </p>
                      </td>
                      <td>
                        <Dropdown />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
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

  return {
    props: {
      orders: menuOrders.data,
      products: menuProducts.data,
    },
  }
}
