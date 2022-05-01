import React from 'react'
import Button from '../Button'
import MenuItem from '../MenuItem'

export default function MenuSection() {
  return (
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
