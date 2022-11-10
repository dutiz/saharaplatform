import axios from 'axios'
import React from 'react'

import Admin from '@/components/layout/Admin'

export default function archivetables({ archives }) {
  return (
    <Admin title="Archive Tables">
      <div className="row">
        <h1>Archive tables</h1>
      </div>
      <div className="row">
        {archives
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((archive) => (
            <div key={archive._id} className="md:col-6 lg:col-4">
              <p className="mt-5">Date: {archive.createdAt}</p>
              <p className="mt-5">Table Nr: {archive.tblnumber}</p>
              <p>OrderedProducts:</p>
              {archive.orderedProducts.map((product) => (
                <div key={product._id} className="ml-5 mt-2">
                  <p>Title: {product.title} </p>
                  <p>Quantity: {product.quantity}</p>
                  <p>
                    Price:{' '}
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                      product.price
                    )}
                  </p>
                </div>
              ))}
              <p className="mt-3 font-bold">
                Total:{' '}
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  archive.total
                )}
              </p>
            </div>
          ))}
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
  const archiveTables = await axios.get('https://sahara-food.netlify.app/api/archive')
  return {
    props: {
      archives: archiveTables.data,
    },
  }
}
