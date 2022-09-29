import Image from 'next/image'
import SVG from 'react-inlinesvg'

import Button from '../Button'

export default function TableCartSection({ tableCart, onClick }) {
  return (
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
            </tr>
            {tableCart.map((cart) => (
              <tr key={cart._id}>
                <td className="py-4 flex items-center">
                  <Image alt={cart.title} src={cart.img} width="150" height="150" />
                  <p className="ml-6 text-3xl">{cart.title}</p>
                </td>
                <td className="px-6">
                  {cart.extras.map((extra) => (
                    <span key={extra._id}>{extra.text} , </span>
                  ))}
                </td>
                <td className="px-6 text-xl font-semibold">$ {cart.price}</td>
                <td className="px-6 text-xl">{cart.quantity}</td>
                <td className="px-6 text-xl font-semibold">$ {cart.price * cart.quantity}</td>
                <td>
                  <button>
                    <SVG src="/svg/bin.svg" className="w-8 h-8 mr-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button onClick={() => onClick}>Complete</Button>
      </div>
    </div>
  )
}
