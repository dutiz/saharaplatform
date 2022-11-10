import axios from 'axios'
import Router from 'next/router'
import { useState } from 'react'

import styles from '../styles/Add.module.css'

export default function ProductEdit({ product }) {
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState(product.title)
  const [desc, setDesc] = useState(product.desc)
  const [prices, setPrices] = useState([])
  const id = product._id

  function changePrice(e, index) {
    const currentPrices = prices
    currentPrices[index] = e.target.value
    setPrices(currentPrices)
  }

  async function handleUpdate(id) {
    try {
      const Product = {
        title,
        desc,
      }
      await axios.put('https://sahara-food.netlify.app/api/products/' + id, Product)
      Router.reload()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
  return (
    <>
      <button onClick={() => setEdit(!edit)}>Edit</button>
      <div
        style={{ zIndex: 9999 }}
        className={`bg-gray-500 w-full h-screen absolute top-0 left-0 items-center justify-center ${
          edit ? ' flex' : ' hidden'
        }`}
      >
        <div
          style={{ width: 500 }}
          className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center"
        >
          <button onClick={() => setEdit(false)}>X</button>
          <h1 className="mt-2 font-bold">Update</h1>
          <div>
            <p className="mt-2">Product with id: {id}</p>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <label htmlFor="title" className="flex flex-col">
                Title
              </label>
              <input
                id="title"
                className="w-full border rounded-md p-1 border-black"
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="col-12">
              <label htmlFor="desc" name="desc" className="flex flex-col">
                Desc
              </label>
              <textarea
                id="desc"
                rows={4}
                type="text"
                value={desc}
                className="w-full border rounded-md p-1   border-black"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              id="prices"
              type="number"
              placeholder="Small"
              value={product.prices[0]}
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              value={product.prices[1]}
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              value={product.prices[2]}
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
          <button
            className="mt-2 bg-blue-500 text-white rounded-md px-5 py-2"
            onClick={() => handleUpdate(product._id)}
          >
            Update
          </button>
        </div>
      </div>
    </>
  )
}
