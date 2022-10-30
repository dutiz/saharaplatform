import Image from 'next/image'

export default function TrendingCard({ count, prod, index }) {
  return (
    <li className="px-6 py-7 shadow-none hover:shadow-md">
      <div className="flex flex-row items-center">
        <div className="flex flex-col mr-2">
          <Image alt={prod.title} src={prod.img} width={100} height={100} />
          <div
            style={{ backgroundColor: 'rgba(227, 54, 107, 1)' }}
            className="w-12 h-12 border-4 mx-auto text-white rounded-full -mt-8 text-center font-bold"
          >
            <p className="my-2">#{index}</p>
          </div>
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
