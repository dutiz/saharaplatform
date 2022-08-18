import {useState} from "react"

export default function OrderDetail({total, orderedProducts , createOrder}) {
   const [customer, setCustomer] = useState('')
   const [address, setAddress] = useState('')
   function handleClick() {
     createOrder({ customer, address, total, method: 0 , orderedProducts,})
   }
  return (
    <div style={{zIndex: 999}}
      className="bg-gray-500 w-full h-screen absolute top-0 left-0 flex items-center justify-center "
    >
      <div
        style={{width: 500}}
        className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center"
      >
        
        <h1 className="font-bold">You will pay ${total} after delivery.</h1>
        {orderedProducts.map((product) =>(
          <p key={product._id}>$ {product.price}</p>
        ))}
        <div className="flex flex-col w-full mb-4">
          <label className="mb-2">Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className="h-10 p-2"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-2">Phone Number</label>
          <input type="text" placeholder="+1 234 567 89" className="h-10 p-2" />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-2">Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            type="text"
            className="rounded-xl p-5"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className="border-none px-2 py-5 text-lg rounded-lg cursor-pointer bg-teal-500" onClick={() => handleClick()}>
          Order
        </button>
      </div>
    </div>
  )
}
