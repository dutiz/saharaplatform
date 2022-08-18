import SVG from 'react-inlinesvg'
export default function ServiceItem({ svg, title, children }) {
  return (
    <div className="lg:col-4 mt-8 lg:mt-0 font-sansserif text-center">
      <div className="p-11 rounded-2xl border border-orange-500 hover:border-transparent hover:shadow-xl">
        <SVG src={svg} className="mx-auto" />
        <h1 className="mt-7 text-2xl">{title}</h1>
        <p className="mt-4 text-gray-600">{children}</p>
      </div>
    </div>
  )
}
