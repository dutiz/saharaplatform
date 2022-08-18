import Layout from '@/components/layout/Layout'
import React, { useState } from 'react'
import Image from 'next/image'
import SVG from 'react-inlinesvg'
import Button from '@/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/router'
import { reset } from '../redux/cartSlice'
import OrderDetail from '@/components/OrderDetail'

export default function cart() {
  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total
  const currency = 'USD'
  const style = { layout: 'vertical' }
  const dispatch = useDispatch();
  const router = useRouter();

  async function createOrder(data) {
    console.log(data);
     try {
      const res = await axios.post('http://localhost:3000/api/orders', data)
      if(res.status === 201){
        dispatch(reset());
        router.push(`/orders/${res.data._id}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
                orderedProducts: cart.products
              })
            })
          }}  
        />
      </>
    )
  }
  return (
    <Layout title="Cart">
      <div className="container my-24">
        <div className="row">
          <div className="col-12">
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
                      <Image src={product.img} width="150" height="150" />
                      <p className="ml-6 text-3xl">{product.title}</p>
                    </td>
                    <td className="px-6">
                      {product.extras.map((extra) => (
                        <span key={extra._id}>{extra.text} , </span>
                      ))}
                    </td>
                    <td className="px-6 text-xl font-semibold">$ {product.price}</td>
                    <td className="px-6 text-xl">{product.quantity}</td>
                    <td className="px-6 text-xl font-semibold">
                      $ {product.price * product.quantity}
                    </td>
                    <td>
                      <button onClick={() => console.log('delete')}>
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
            <p>Subtotal: ${cart.total}</p>
            {open ? (
              <div>
                <Button onClick={() => setCash(true)} className="my-4">
                  Cash on Delivery
                </Button>
                <PayPalScriptProvider
                  options={{
                    'client-id':
                      'AWqc0gI-0DUqaqHqc4b8ybPbc6jFbIwYuAiGZPn50VbW3sP1t9NeMNbzBI-904kQSSfY29nr3eC8pv5u',
                    components: 'buttons',
                    currency: 'USD',
                    'disable-funding': 'credit,card',
                  }}
                >
                  <ButtonWrapper currency={currency} showSpinner={false} />
                </PayPalScriptProvider>
              </div>
            ) : (
              <Button onClick={() => setOpen(true)}>Procced to checkout</Button>
            )}
          </div>
        </div>
        {cash && <OrderDetail total={cart.total} orderedProducts={cart.products} createOrder={createOrder} />}
      </div>
    </Layout>
  )
}
