import React from 'react'
import Button from '../Button'
import MenuItem from '../MenuItem'

export default function MenuSection({ menuList }) {
  return (
    <div className="bg-blue-100">
      <div className="container py-16">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center text-white font-extrabold text-5xl">Menu</h1>
          </div>
        </div>
        <div className="row">
          {menuList.slice(0, 6).map((menu) => (
            <MenuItem key={menu._id} menu={menu} href={`/products/${menu._id}`} />
          ))}
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <Button islink className="mt-8" href="/menu">
              For More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
