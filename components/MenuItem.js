import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'

export default function MenuItem({ menu, href }) {
  return (
    <div className="lg:col-6 mt-8">
      <div className="bg-gray-300 p-8 shadow-lg">
        <Link href={href}>
          <a>
            <div className="row justify-center ">
              <div className="md:col-6 flex flex-col items-center">
                <Image src={menu.img} width={208} height={208} alt="pizza-santorini" />
              </div>
              <div className="lg:col-6">
                <h2 className="font-extrabold text-3xl mt-3 lg:mt-0">{menu.title}</h2>
                <p className="mt-3">{menu.desc}</p>
                <div className="mt-3 row items-center">
                  <div className="col-6">
                    <p className="font-semibold text-2xl">${menu.prices[0]}</p>
                  </div>
                  <div className="col-6">
                    <Button>Order</Button>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}
