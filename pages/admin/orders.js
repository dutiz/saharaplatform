import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'

import Admin from '@/components/layout/Admin'

export default function Orders({ orders }) {
  const [orderList, setOrderList] = useState(orders)
  const status = ['preparing', 'on the way', 'delivered']

  async function handleStatus(id) {
    const item = orderList.filter((order) => order._id === id)[0]
    const currentStatus = item.status

    try {
      const res = await axios.put('https://sahara-food.netlify.app/api/orders/' + id, {
        status: currentStatus + 1,
      })
      setOrderList([res.data, ...orderList.filter((order) => order._id !== id)])
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
  return (
    <Admin>
      <div className="row">
        <div className="col-12">
          <h1 className="text-4xl font-semibold">Orders</h1>
          <table>
            <thead>
              <tr>
                <td>Order Id</td>
                <td>Customer Name</td>
                <td>Total</td>
                <td>Payment</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <Link href={`/orders/${order._id}`}>
                      <a>
                        <span>
                          <abbr style={{ textDecoration: 'none' }} title={order._id}>
                            {order._id.slice(0, 10)}...
                          </abbr>
                        </span>
                      </a>
                    </Link>
                  </td>
                  <td>{order.customer}</td>
                  <td>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button className="px-3 py-2" onClick={() => handleStatus(order._id)}>
                      Next Stage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  const ordersRes = await axios.get('https://sahara-food.netlify.app/api/orders')

  return {
    props: {
      orders: ordersRes.data,
    },
  }
}
