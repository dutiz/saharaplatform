import axios from 'axios'
import Router from 'next/router'
import { useState } from 'react'

import styles from '../styles/Add.module.css'

export default function ProductEdit({ product, setEdit }) {
  const [title, setTitle] = useState(product.title)
  const [desc, setDesc] = useState(product.desc)
  const id = product._id

  async function handleUpdate(id) {
    try {
      const Product = {
        title,
        desc,
      }
      await axios.put('http://localhost:3000/api/products/' + id, Product)
      Router.reload()
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
  return (
    <div>
      <div>
        <span onClick={() => setEdit(false)} aria-hidden="true" className={styles.close}>
          X
        </span>
        <h1>Update</h1>
        <div className={styles.item}>
          <p>Product with id: {id}</p>
        </div>
        <div className={styles.item}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            id="title"
            className={styles.input}
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label htmlFor="desc" name="desc" className={styles.label}>
            Desc
          </label>
          <textarea
            id="desc"
            rows={4}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className={styles.addButton} onClick={() => handleUpdate(product._id)}>
          Update
        </button>
      </div>
    </div>
  )
}
