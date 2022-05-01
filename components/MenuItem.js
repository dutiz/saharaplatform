import React from 'react'
import Image from 'next/image'
import Button from './Button'

export default function MenuItem() {
  return (
    <div className="lg:col-6 mt-8 bg-gray-300 p-8 shadow-lg">
      <div className="row justify-center ">
        <div className="md:col-6 flex flex-col items-center">
          <Image src="/images/products/pizza.png" width={208} height={208} alt="pizza-santorini" />
        </div>
        <div className="lg:col-6">
          <h2 className="font-extrabold text-3xl mt-3 lg:mt-0">Santorini</h2>
          <p className="mt-3">
            Red Sauce, Mozzarella Cheese, Chicken, Topped with Bruschetta Tomatoes, Red Onions,
            Kalamata Olives, and Feta Cheese
          </p>
          <div className="mt-3 row items-center">
            <div className="col-6">
              <p className="font-semibold text-2xl">$ 7.50</p>
            </div>
            <div className="col-6">
              <Button>Order</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
