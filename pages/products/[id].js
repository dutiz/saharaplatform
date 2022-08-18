import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from 'redux/cartSlice'

import Button from '@/components/Button'
import Layout from '@/components/layout/Layout'

export default function Product({ menu }) {
  const [price, setPrice] = useState(menu.prices[0])
  const [size, setSize] = useState(0)
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(1)
  const disptach = useDispatch()

  function changePrice(number) {
    setPrice(price + number)
  }

  function handleSize(sizeIndex) {
    const difference = menu.prices[sizeIndex] - menu.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }
  function handleChange(e, option) {
    const checked = e.target.checked

    if (checked) {
      changePrice(option.price)
      setExtras((prev) => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter((extra) => extra._id !== option._id))
    }
  }

  function handleClick() {
    disptach(addProduct({ ...menu, extras, price, quantity }))
  }
  return (
    <Layout title={menu.title}>
      <div className="container">
        <div className="row mt-10">
          <div className="col-6">
            <Image alt={menu.title} src={menu.img} width="524" height="519" />
          </div>
          <div className="col-6">
            <h1 className="text-5xl font-extrabold">{menu.title}</h1>
            <p className="mt-5">{menu.desc}</p>
            <p className="text-2xl font-semibold">${price}</p>
            <h3 className="font-bold text-xl my-3">Chose the size</h3>
            <div className="w-2/5 flex justify-between">
              <div
                className="w-7 h-7 relative cursor-pointer"
                aria-hidden="true"
                onClick={() => handleSize(0)}
              >
                <Image src="/images/size.png" layout="fill" alt="size" />
                <span
                  className={`absolute ${
                    size === 0 ? 'bg-orange-500' : 'bg-slate-500'
                  }  -top-1 -right-6 text-white text-xs py-1 rounded-lg`}
                >
                  Small
                </span>
              </div>
              <div
                className="w-10 h-10 relative cursor-pointer"
                aria-hidden="true"
                onClick={() => handleSize(1)}
              >
                <Image src="/images/size.png" layout="fill" alt="size" />
                <span
                  className={`absolute -top-1 -right-7 ${
                    size === 1 ? 'bg-orange-500' : 'bg-slate-500'
                  } text-white text-xs py-1 rounded-lg`}
                >
                  Medium
                </span>
              </div>
              <div
                className="w-12 h-12 relative cursor-pointer"
                aria-hidden="true"
                onClick={() => handleSize(2)}
              >
                <Image src="/images/size.png" layout="fill" alt="size" />
                <span
                  className={`absolute -top-1 -right-5 ${
                    size === 2 ? 'bg-orange-500' : 'bg-slate-500'
                  } text-white text-xs py-1 rounded-lg`}
                >
                  Large
                </span>
              </div>
            </div>
            <h3 className="font-bold text-xl my-3">Choose additional ingredients</h3>
            <div className="flex flex-row space-x-2">
              {menu.extraOptions.map((option) => (
                <div className="flex flex-col" key={option._id}>
                  <div className="flex items-center font-medium">
                    <input
                      type="checkbox"
                      id={option.text}
                      name={option.text}
                      className="w-5 h-5"
                      onChange={(e) => handleChange(e, option)}
                    />
                    <label htmlFor={option.text} className="ml-2">
                      {option.text}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <input
              id="quantity"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="QTY"
              type="number"
              defaultValue={1}
              className=" border border-black rounded-lg mt-2 px-2 py-1 w-16"
            />
            <Button className="ml-5" onClick={() => handleClick()}>
              Add To Cart
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`http://sahara-food.netlify.app/api/products/${params.id}`)
  return {
    props: {
      menu: res.data,
    },
  }
}
