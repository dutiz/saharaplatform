import Admin from '@/components/layout/Admin'
import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

export default function Products({ products }) {
  const [menuList, setMenuList] = useState(products)
  async function handleDelete(id) {
    try {
      const res = await axios.delete('http://localhost:3000/api/products/' + id)
      setMenuList(menuList.filter((menu) => menu._id !== id))
    } catch (err) {}
  }
  return (
    <Admin>
      <div className="row">
        <div className="col-12">
          <h1 className="text-4xl font-semibold">Products</h1>
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
                    <button className="px-3 py-2">Edit</button>
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

  const menuRes = await axios.get('http://localhost:3000/api/products')

  return {
    props: {
      products: menuRes.data,
    },
  }
}
