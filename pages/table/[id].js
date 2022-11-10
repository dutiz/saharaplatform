import axios from 'axios'
import Product from 'models/Product'
import Image from 'next/image'
import { Router } from 'next/router'
import { useState } from 'react'
import SVG from 'react-inlinesvg'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, reset } from 'redux/tableSlice'
import dbConnect from 'utils/mongo'

import Table from '/models/Table'
import Button from '@/components/Button'
import Layout from '@/components/layout/Layout'
import OrderedProductsSection from '@/components/sections/OrderedProductsSection'

export default function Tables({ table, products }) {
  const tableCart = useSelector((state) => state.tableCart)
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  let price = 0

  async function createOrder() {
    try {
      const res = await axios.put('https://sahara-food.netlify.app/api/tables/' + table._id, {
        total: tableCart.total,
        orderedProducts: tableCart.products,
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
  return (
    <Layout title={table.tblnumber}>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <h1>Table Number: {table.tblnumber}</h1>
            <h2 className="text-lg">{table.status === 0 ? 'Free' : 'Busy'}</h2>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-12">
            <h2 className="my-3 text-3xl font-semibold">Choose the size for your pizza</h2>
            <div className="grid gap-4 lg:grid-cols-8 md:grid-cols-2 md:gap-8">
              <Button onClick={() => setSize(0)}>Small</Button>
              <Button onClick={() => setSize(1)} className="">
                Medium
              </Button>
              <Button onClick={() => setSize(2)}>Large</Button>
            </div>
          </div>
          {products.map((product) => (
            <div key={product._id} className="col-6">
              <div className="lg:col-8 mt-8">
                <div className="bg-gray-300 p-8 shadow-lg">
                  <div className="row justify-center ">
                    <div className="md:col-6 flex flex-col items-center">
                      <Image src={product.img} width={208} height={208} alt="pizza-santorini" />
                    </div>
                    <div className="lg:col-6">
                      <h2 className="font-extrabold text-3xl mt-3 lg:mt-0">{product.title}</h2>
                      <p className="mt-3">{product.desc}</p>
                      <div className="mt-3 row items-center">
                        <div className="col-6">
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
                        <div className="col-6">
                          <Button
                            onClick={() => {
                              price = product.prices[size]
                              handleClick(product._id)
                            }}
                          >
                            Order
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {table.orderedProducts.length >= 1 && (
          <OrderedProductsSection orderedProducts={table.orderedProducts} />
        )}
        {tableCart.quantity >= 1 && (
          <div className="row">
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
                        <Image alt={cart.title} src={cart.img} width="150" height="150" />
                        <p className="ml-6 text-3xl">{cart.title}</p>
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
                        <button>
                          <SVG src="/svg/bin.svg" className="w-8 h-8 mr-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button onClick={() => createOrder()}>Complete</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    await dbConnect()
    const res = await Table.findById(params.id)
    const menuRes = await Product.find()
    return {
      props: {
        table: JSON.parse(JSON.stringify(res)),
        products: JSON.parse(JSON.stringify(menuRes)),
      },
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    return {
      notFound: true,
    }
  }
}
