import axios from 'axios'
import Image from 'next/image'
import Router from 'next/router'
import { useState } from 'react'

import Add from '@/components/Add'
import Admin from '@/components/layout/Admin'
import ProductEdit from '@/components/ProductEdit'

export default function Products({ products }) {
  const [menuList, setMenuList] = useState(products)
  const [close, setClose] = useState(true)
  async function handleDelete(id) {
    try {
      await axios.delete('https://sahara-food.netlify.app/api/products/' + id)

      setMenuList(menuList.filter((menu) => menu._id !== id))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
    Router.reload()
  }
  return (
    <Admin>
      <div className="row">
        <div className="col-12">
          <h1 className="text-4xl font-semibold">Products</h1>
          <button onClick={() => setClose(false)}>Add Products</button>
          {!close && <Add setClose={setClose} />}
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <td>Product Id</td>
                  <td>Image</td>
                  <td>Title</td>
                  <td>Price</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <span>
                        {' '}
                        <abbr style={{ textDecoration: 'none' }} title={product._id}>
                          {product._id.slice(0, 10)}...
                        </abbr>
                      </span>
                    </td>
                    <td>
                      <Image
                        alt={product.title}
                        src={product.img}
                        width={100}
                        height={100}
                        priority
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>
                      {product.prices.map((price) => (
                        <span key={price}>$ {price}.00,</span>
                      ))}
                    </td>
                    <td>
                      <ProductEdit product={product} />
                    </td>
                    <td>
                      <button className="px-3 py-2" onClick={() => handleDelete(product._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  )
}

export async function getServerSideProps(ctx) {
  const myCookie = ctx.req?.cookies || ''

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }

  const menuRes = await axios.get('https://sahara-food.netlify.app/api/products')

  return {
    props: {
      products: menuRes.data,
    },
  }
}
