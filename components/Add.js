import axios from 'axios'
import Router from 'next/router'
import { useState } from 'react'

import styles from '../styles/Add.module.css'

export default function Add({ setClose }) {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [prices, setPrices] = useState([])
  const [extra, setExtra] = useState(null)
  const [extraOptions, setExtraOptions] = useState([])

  function changePrice(e, index) {
    const currentPrices = prices
    currentPrices[index] = e.target.value
    setPrices(currentPrices)
  }

  function handleExtraInput(e) {
    setExtra({ ...extra, [e.target.name]: e.target.value })
  }

  function handleExtra() {
    setExtraOptions((prev) => [...prev, extra])
  }

  async function handleCreate() {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'uploads')
    try {
      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/drujet4ue/image/upload',
        data
      )
      const { url } = uploadRes.data
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      }

      await axios.post('http://localhost:3000/api/products', newProduct)
      setClose(true)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
    Router.reload()
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} aria-hidden="true" className={styles.close}>
          X
        </span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label htmlFor="image" className={styles.label}>
            Choose an image
          </label>
          <input id="image" type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.item}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            id="title"
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="desc" name="desc" className={styles.label}>
            Desc
          </label>
          <textarea id="desc" rows={4} type="text" onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className={styles.item}>
          <label htmlFor="prices" className={styles.label}>
            Prices
          </label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              id="prices"
              type="number"
              placeholder="Small"
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label htmlFor="extra" className={styles.label}>
            Extra
          </label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              id="extra"
              type="text"
              placeholder="Item"
              name="text"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Create
        </button>
      </div>
    </div>
  )
}
