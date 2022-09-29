import axios from 'axios'
import Router from 'next/router'
import React from 'react'

import Button from '@/components/Button'
import Admin from '@/components/layout/Admin'
import OrderedProductsSection from '@/components/sections/OrderedProductsSection'

export default function AdminTable({ table }) {
  async function handleClose() {
    try {
      const res = await axios.post('http://localhost:3000/api/archive/', {
        customer: table.customer,
        tblnumber: table.tblnumber,
        total: table.total,
        status: table.status,
        orderedProducts: table.orderedProducts,
      })
      if (res.status === 201) {
        // eslint-disable-next-line no-console
        console.log(`table with no ${table.tblnumber} is archived`)
        await axios.put(`http://localhost:3000/api/tables/${table._id}`, {
          total: 0,
          customer: '',
          orderedProducts: [],
          status: 0,
        })
        Router.reload()
      }
    } catch (err) {
      //eslint-disable-next-line no-console
      console.log(err)
    }
  }
  return (
    <Admin title={`Admin Table Id ${table.tblnumber}`}>
      <h1 className="text-xl">Table No. {table.tblnumber}</h1>
      <h2 className="mt-5">Table Status: {table.status === 0 ? 'Free' : 'Busy'}</h2>
      {table.orderedProducts.length >= 1 && (
        <>
          <OrderedProductsSection orderedProducts={table.orderedProducts} />
          <Button onClick={() => handleClose()}>Close Table</Button>
        </>
      )}
    </Admin>
  )
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`http://localhost:3000/api/tables/${params.id}`)
  return {
    props: {
      table: res.data,
    },
  }
}
