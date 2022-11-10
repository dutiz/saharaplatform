import Link from 'next/link'
import React from 'react'
import SVG from 'react-inlinesvg'

export default function RecentOrderSecton({ orders }) {
  return (
    <div className="lg:col-8">
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
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(order.total)}
                      x{order.orderedProducts[0].quantity}
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
                    <Link href={`/orders/${order._id}`} target="_blank">
                      <SVG src="/svg/three-dots.svg" className="fill-current w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link href="/admin/orders" legacyBehavior>
          <a className="mt-5 hover:underline ">View All</a>
        </Link>
      </div>
    </div>
  )
}
