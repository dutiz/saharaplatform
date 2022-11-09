import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import { useState } from 'react'
import usePagination from 'utils/usePagination'

import Admin from '@/components/layout/Admin'

const Button = ({ children, className, disabled, ...other }) => {
  const style = `px-4 py-2 border  ${className} ${
    disabled
      ? 'border-gray-400 text-gray-500 cursos-not-allowed'
      : 'border-pink-500 hover:bg-pink-500 hover:text-white'
  } uppercase text-sm transition-all ease-in-out duration-200 focus:outline-none`
  return (
    <button disabled={disabled} className={style} {...other}>
      {children}
    </button>
  )
}
export default function Orders({ orders }) {
  const [orderList, setOrderList] = useState(orders)
  async function handleStatus(id) {
    const item = orderList.filter((order) => order._id === id)[0]
    const currentStatus = item.status
    try {
      const res = await axios.put('http://localhost:3000/api/orders/' + id, {
        status: currentStatus + 1,
      })
      setOrderList([res.data, ...orderList.filter((order) => order._id !== id)])
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
    Router.reload()
  }
  const _DATA = usePagination(orders, 10)
  const arr = Array.from({ length: _DATA.maxPage }, (_, i) => i + 1)
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
                <td className="text-center">Customer Name</td>
                <td>Location</td>
                <td>Amount</td>
                <td>Payment</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {_DATA
                .currentData(orders)
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
                    <td>{order.address}</td>
                    <td>
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(order.total)}
                    </td>
                    <td>{order.method === 0 ? <span>cash</span> : <span>paid</span>}</td>
                    <td>
                      {order.status === 0
                        ? 'Preparing'
                        : order.status === 1
                        ? 'On the way'
                        : 'Delivered'}
                    </td>
                    <td>
                      <button
                        className="px-3 py-2 border border-pink-500 rounded-md text-black hover:bg-pink-500 hover:text-white transition-all ease-in-out duration-500"
                        onClick={() => handleStatus(order._id)}
                      >
                        Next Action
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="my-5 inline-flex items-center">
            <Button disabled={_DATA.currentPage == 1} className="mr-4" onClick={() => _DATA.prev()}>
              Previous
            </Button>
            {arr.map((e) => (
              <Button
                key={e}
                className={`mr-4 ${
                  _DATA.currentPage === e ? 'bg-pink-500 text-white' : 'bg-white text-black'
                }`}
                onClick={() => _DATA.jump(e)}
              >
                {e}
              </Button>
            ))}
            <Button disabled={_DATA.currentPage == _DATA.maxPage} onClick={() => _DATA.next()}>
              Next
            </Button>
          </div>
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
  const ordersRes = await axios.get('http://localhost:3000/api/orders')

  return {
    props: {
      orders: ordersRes.data,
    },
  }
}
