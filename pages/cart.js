import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import SVG from 'react-inlinesvg'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@/components/Button'
import Layout from '@/components/layout/Layout'
import OrderDetail from '@/components/OrderDetail'

import { removeProduct, reset } from '../redux/cartSlice'

export default function Cart() {
  const cart = useSelector((state) => state.cart)
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  async function createOrder(data) {
    try {
      const res = await axios.post('https://sahara-food.netlify.app/api/orders', data)
      if (res.status === 201) {
        dispatch(reset())
        router.push(`/orders/${res.data._id}`)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
  return cart.products.length === 0 ? (
    <Layout title="Cart">
      <div className="container">
        <div className="row my-10">
          <div className="col-12 items-center text-center">
            <Image
              alt="non-ordering"
              className="mx-auto"
              src="/images/cart-background.png"
              width={300}
              height={300}
            />
            <p className="mt-5 font-bold text-xl">No items added to cart yet</p>
            <Button islink href="/menu" className="mt-5">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Layout title="Cart">
      <div className="container my-24">
        <div className="row">
          <div className="col-12 overflow-x-auto">
            <table className="w-full text-left">
              <tbody>
                <tr className="bg-gray-300">
                  <th className="px-6 py-5 text-xl">Product</th>
                  <th className="px-6 py-5 text-xl">Extras</th>
                  <th className="px-6 py-5 text-xl">Price</th>
                  <th className="px-6 py-5 text-xl">Quantity</th>
                  <th className="px-6 py-5 text-xl">Total</th>
                  <th></th>
                </tr>
                {cart.products.map((product) => (
                  <tr key={product._id}>
                    <td className="py-4 flex items-center">
                      <Image alt={product.title} src={product.img} width="150" height="150" />
                      <p className="ml-6 text-3xl">{product.title}</p>
                    </td>
                    <td className="px-6">
                      {product.extras.map((extra) => (
                        <span key={extra._id}>{extra.text} , </span>
                      ))}
                    </td>
                    <td className="px-6 text-xl font-semibold">
                      {' '}
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(product.price)}
                    </td>
                    <td className="px-6 text-xl">{product.quantity}</td>
                    <td className="px-6 text-xl font-semibold">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(product.price * product.quantity)}
                    </td>
                    <td>
                      <button onClick={() => dispatch(removeProduct(product))}>
                        <SVG src="/svg/bin.svg" className="w-8 h-8 mr-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-10 flex flex-row justify-end">
          <div className="col-6 text-right">
            <p>
              Subtotal:{' '}
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                cart.total
              )}
            </p>
            {open ? (
              <div>
                <Button onClick={() => setCash(true)} className="my-4">
                  Cash on Delivery
                </Button>
              </div>
            ) : (
              <Button onClick={() => setOpen(true)}>Procced to checkout</Button>
            )}
          </div>
        </div>
        {cash && (
          <OrderDetail
            total={cart.total}
            orderedProducts={cart.products}
            createOrder={createOrder}
            close={() => setCash(false)}
          />
        )}
      </div>
    </Layout>
  )
}
