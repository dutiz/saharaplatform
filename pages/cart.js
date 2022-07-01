import Layout from '@/components/layout/Layout'
import React from 'react'
import Image from 'next/image'
import SVG from 'react-inlinesvg'
import Button from '@/components/Button'

export default function cart() {
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
                <tr className="">
                  <td className="py-4 flex items-center">
                    <Image src="/images/products/pizza.png" width="150" height="150" />
                    <p className="ml-6 text-3xl">Santorini</p>
                  </td>
                  <td className='px-6'>extra1</td>
                  <td className="px-6 text-xl font-semibold">$ 23.5</td>
                  <td className="px-6 text-xl">1</td>
                  <td className="px-6 text-xl font-semibold">$ 14</td>
                  <td>
                    <button onClick={() => console.log("delete")}>
                      <SVG src='/svg/bin.svg' className='w-8 h-8 mr-3'/>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="col-4 text-right">
            <Button onClick={() => console.log("checkout")}>Procced to checkout</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
