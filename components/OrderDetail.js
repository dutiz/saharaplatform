import { useState } from 'react'

export default function OrderDetail({ total, orderedProducts, createOrder, close }) {
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  function handleClick() {
    createOrder({ customer, address, total, method: 0, orderedProducts })
  }
  return (
    <div
      style={{ zIndex: 9999 }}
      className="bg-gray-500 w-full h-screen absolute top-0 left-0 flex items-center justify-center "
    >
      <div
        style={{ width: 500 }}
        className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center"
      >
        <button onClick={close}>X</button>
        <h1 className="my-2 font-bold">You will pay ${total} after delivery.</h1>
        <div className="flex flex-col w-full mb-4">
          <label htmlFor="fullName" className="mb-2">
            Name Surname
          </label>
          <input
            id="fullName"
            placeholder="John Doe"
            type="text"
            className="h-10 p-2"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label htmlFor="phoneNumber" className="mb-2">
            Phone Number
          </label>
          <input id="phoneNumber" type="text" placeholder="+1 234 567 89" className="h-10 p-2" />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label htmlFor="address" className="mb-2">
            Address
          </label>
          <textarea
            id="address "
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className="rounded-xl p-5"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="border-none px-2 py-5 text-lg rounded-lg cursor-pointer bg-teal-500"
          onClick={() => handleClick()}
        >
          Order
        </button>
      </div>
    </div>
  )
}
