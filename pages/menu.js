import Layout from '@/components/layout/Layout'
import MenuItem from '@/components/MenuItem'
import React from 'react'

export default function menu() {
  return (
    <Layout title="Menu">
      <div className="bg-blue-100">
        <div className="container py-16">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center text-white font-extrabold text-5xl">Menu</h1>
            </div>
          </div>
          <div className="row">
            <MenuItem />
          </div>
        </div>
      </div>
    </Layout>
  )
}
