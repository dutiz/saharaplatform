import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
import React from 'react'
import { useState } from 'react'
import SVG from 'react-inlinesvg'
import { useDispatch, useSelector } from 'react-redux'

import Admin from '@/components/layout/Admin'
import OrderedProductsSection from '@/components/sections/OrderedProductsSection'

import { addProduct, removeProduct, reset } from '../../../redux/tableSlice'

export default function AdminTable({ table, products }) {
  const tableCart = useSelector((state) => state.tableCart)
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  let price = 0

  async function createOrder() {
    try {
      const res = await axios.put('https://sahara-food.netlify.app/api/tables/' + table._id, {
        total: table.total + tableCart.total,
        orderedProducts: [...table.orderedProducts, ...tableCart.products],
        status: 1,
      })
      if (res.status === 200) {
        dispatch(reset())
        Router.reload()
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
  async function handleClick(id) {
    const menus = await axios.get('https://sahara-food.netlify.app/api/products/' + id)
    dispatch(addProduct({ ...menus.data, price, quantity }))
  }
  async function handleClose() {
    try {
      const res = await axios.post('https://sahara-food.netlify.app/api/archive/', {
        customer: table.customer,
        tblnumber: table.tblnumber,
        total: table.total,
        status: table.status,
        orderedProducts: table.orderedProducts,
      })
      if (res.status === 201) {
        await axios.put(`https://sahara-food.netlify.app/api/tables/${table._id}`, {
          total: 0,
          customer: '',
          orderedProducts: [],
          status: 0,
        })
        Router.reload()
      }
    } catch (err) {
      //eslint-disable-next-line no-console
      console.log(err)
    }
  }
  return (
    <Admin title={`Admin Table Id ${table.tblnumber}`}>
      <div className="row">
        <div className="col-12">
          <h1 className="text-xl">Table No. {table.tblnumber}</h1>
          <h2 className="mt-5">Table Status: {table.status === 0 ? 'Free' : 'Busy'}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          {tableCart.quantity >= 1 && (
            <div className="col-12">
              <table className="w-full text-left">
                <tbody>
                  <tr className="bg-gray-300">
                    <th className="px-6 py-5 text-xl">Product</th>
                    <th className="px-6 py-5 text-xl">Price</th>
                    <th className="px-6 py-5 text-xl">Quantity</th>
                    <th className="px-6 py-5 text-xl">Total</th>
                  </tr>
                  {tableCart.products.map((cart) => (
                    <tr key={cart._id}>
                      <td className="py-4 flex items-center">
                        <p className="ml-6 text-xl">{cart.title}</p>
                      </td>
                      <td className="px-6 text-xl font-semibold">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(cart.price)}
                      </td>
                      <td className="px-6 text-xl">{cart.quantity}</td>
                      <td className="px-6 text-xl font-semibold">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(cart.price * cart.quantity)}
                      </td>
                      <td>
                        <button onClick={() => dispatch(removeProduct(cart))}>
                          <SVG src="/svg/bin.svg" className="w-8 h-8 mr-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="my-2 text-xl font-semibold">
                Total:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(tableCart.total)}
              </p>
              <button
                className="px-6 py-4 border text-pink-500 border-pink-500 hover:bg-pink-500 bg-transparent hover:text-white rounded-3xl transition-all ease-in-out duration-500"
                onClick={() => createOrder()}
              >
                Complete
              </button>
            </div>
          )}
          {table.orderedProducts.length >= 1 && (
            <>
              <OrderedProductsSection orderedProducts={table.orderedProducts} />
              <p className="mt-2 text-xl font-semibold">
                Total:{' '}
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(table.total)}
              </p>
              <button
                className="mt-5 px-6 py-4 border text-pink-500 border-pink-500 hover:bg-pink-500 bg-transparent hover:text-white rounded-3xl transition-all ease-in-out duration-500"
                onClick={() => handleClose()}
              >
                Close
              </button>
            </>
          )}
        </div>
        <div className="lg:col-6 mt-3 lg:mt-0">
          <div className="row my-5">
            <div className="col-12">
              <h2 className="my-3 text-3xl font-semibold">Choose the size for your pizza</h2>
              <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 md:gap-8">
                <button
                  className="px-6 py-4 border text-pink-500 border-pink-500 hover:bg-pink-500 bg-transparent hover:text-white rounded-3xl transition-all ease-in-out duration-500"
                  onClick={() => setSize(0)}
                >
                  Small
                </button>
                <button
                  className="px-6 py-4 border text-pink-500 border-pink-500 hover:bg-pink-500 bg-transparent hover:text-white rounded-3xl transition-all ease-in-out duration-500"
                  onClick={() => setSize(1)}
                >
                  Medium
                </button>
                <button
                  className="px-6 py-4 border text-pink-500 border-pink-500 hover:bg-pink-500 bg-transparent hover:text-white rounded-3xl transition-all ease-in-out duration-500"
                  onClick={() => setSize(2)}
                >
                  Large
                </button>
              </div>
            </div>
            <div className="row mt-5">
              {products.map((product) => (
                <div key={product._id} className="col-6 mb-5  ">
                  <div className="bg-gray-300 p-8 shadow-lg">
                    <div className="row justify-center">
                      <Image src={product.img} width={200} height={200} alt={product.title} />
                      <div className="mt-3 row items-center">
                        <div className="col-6">
                          <h2 className="font-extrabold text-2xl mt-3 lg:mt-0">{product.title}</h2>
                          <p className="font-semibold text-2xl">
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD',
                            }).format(product.prices[size])}
                          </p>
                        </div>
                        <input
                          onChange={(e) => setQuantity(e.target.value)}
                          type="number"
                          placeholder="QTY"
                          className="my-5"
                        />
                        <button
                          className="px-6 py-4 border text-pink-500 border-pink-500 hover:bg-pink-500 bg-transparent hover:text-white rounded-3xl transition-all ease-in-out duration-500"
                          onClick={() => {
                            price = product.prices[size]
                            handleClick(product._id)
                          }}
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
  const res = await axios.get(`https://sahara-food.netlify.app/api/tables/${ctx.params.id}`)
  const menu = await axios.get('https://sahara-food.netlify.app/api/products')
  return {
    props: {
      table: res.data,
      products: menu.data,
    },
  }
}
