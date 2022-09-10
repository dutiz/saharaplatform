import axios from 'axios'

import DashboardCart from '@/components/DashboardCart'
import Admin from '@/components/layout/Admin'

export default function index({ products, orders }) {
  return (
    <Admin title="Dashboard Admin - Next">
      <div className="row">
        <div className="col-12">
          <h3 className="text-xl font-semibold text-red-500">Dashboard</h3>
          <p className="mt-5">Welcome to Sahara Admin!</p>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <DashboardCart />
            <DashboardCart />
            <DashboardCart />
            <DashboardCart />
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-6">
          <div className="bg-gray-300">
            <h3 className="text-xl font-semibold text-red-500"> Orders Summary</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="text-lg">Orders</p>
            {orders.map((order) => (
              <p key={order._id}>{order.customer}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="col-6">
        <p className="text-lg">Products</p>
        {products.map((product) => (
          <p key={product._id}>{product.title}</p>
        ))}
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
  const menuOrders = await axios.get('http://localhost:3000/api/orders')
  const menuProducts = await axios.get('http://localhost:3000/api/products')

  return {
    props: {
      orders: menuOrders.data,
      products: menuProducts.data,
    },
  }
}
