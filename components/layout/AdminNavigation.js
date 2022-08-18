import Link from 'next/link'
import SVG from 'react-inlinesvg'

const AdminNavItem = ({ children, href }) => {
  return (
    <li>
      <Link href={`/admin${href}`}>
        <a className="pl-10 flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          {/* <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <SVG src={`/svg/${svg}`} className="fill-current" />
          </span> */}
          <span className="pl-8 text-sm font-medium">{children}</span>
        </a>
      </Link>
    </li>
  )
}

export default function AdminNavigation() {
  return (
    <aside className="flex flex-col w-full bg-gray-200 rounded-r-3xl overflow-hidden h-screen">
      <div className="flex items-center justify-center py-7 shadow-md">
        <SVG src="/svg/logo.svg" className="w-20 h-20" />
      </div>
      <ul className="flex flex-col py-4">
        <AdminNavItem href="/">Home</AdminNavItem>
        <AdminNavItem href="/orders">Orders</AdminNavItem>
        <AdminNavItem href="/products">Products</AdminNavItem>
      </ul>
    </aside>
  )
}
