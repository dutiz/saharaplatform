import Image from 'next/image'

export default function TrendingCard({ count, prod }) {
  return (
    <li className="px-6 py-7 shadow-none hover:shadow-md">
      <div className="flex flex-row items-center">
        <div className="flex flex-col mr-2">
          <Image alt={prod.title} src={prod.img} width={80} height={80} />
        </div>
        <div className="flex w-full flex-col">
          <p className="font-bold">{prod.title}</p>
          <div className="flex flex-row justify-between">
            <p className="font-semibold">${prod.prices[0]}</p>
            <p>
              Order: <span className="ml-2 font-semibold">{count[1]} x </span>
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}
