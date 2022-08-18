import SVG from 'react-inlinesvg'

export default function DashboardCart() {
  return (
    <div className="col-6 mt-5">
      <div className="flex flex-row items-center p-3 rounded-md bg-gray-400">
        <div className="flex flex-col">
          <SVG src="/svg/orders.svg" className="fill-current w-20 h-20" />
        </div>
        <div className="flex flex-col ml-3">
          <p className="text-2xl">50</p>
          <p>Total Menus</p>
        </div>
      </div>
    </div>
  )
}
