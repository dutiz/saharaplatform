import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { useState } from 'react'
import SVG from 'react-inlinesvg'

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
    Router.reload()
  }
  return (
    <Admin>
      <div className="row">
        <div className="col-12">
          <h1 className="text-4xl font-semibold">Orders</h1>
          <table className="mt-5 w-full bg-white rounded-lg">
            <thead className="px-4 py-2">
              <tr>
                <td className="px-3">Order Id</td>
                <td className="px-3">Date</td>
                <td>Customer Name</td>
                <td>Location</td>
                <td>Amount</td>
                <td>Payment</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr className="border-b border-black" key={order._id}>
                    <td>
                      <Link href={`/orders/${order._id}`}>
                        <span>
                          <abbr style={{ textDecoration: 'none' }} title={order._id}>
                            {order._id.slice(0, 10)}...
                          </abbr>
                        </span>
                      </Link>
                    </td>
                    {}
                    <td>{order.createdAt}</td>
                    <td className="text-center">{order.customer}</td>
                    <td className="">{order.address}</td>
                    <td>$ {order.total}</td>
                    <td>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                    <td>{status[order.status]}</td>
                    <td>
                      <button className="px-3 py-2" onClick={() => handleStatus(order._id)}>
                        <SVG src="/svg/three-dots.svg" className="w-5 h-5" />
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
