import Link from 'next/link'
import SVG from 'react-inlinesvg'

const AdminNavItem = ({ children, href }) => {
  return (
    <li>
      <Link href={`/admin${href}`} legacyBehavior>
        <a className="pl-10 flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
          <span className="pl-8 text-sm font-medium">{children}</span>
        </a>
      </Link>
    </li>
  )
}

export default function AdminNavigation({ menu }) {
  return (
    <aside
      style={{ zIndex: '9999' }}
      className="flex top-0 flex-col w-full sticky bg-gray-200 rounded-r-3xl overflow-hidden h-screen"
    >
      <div className={`md:flex md:flex-col ${menu ? 'flex flex-col' : 'hidden'}`}>
        <div className="flex items-center justify-center py-7 shadow-md">
          <Link href="/admin">
            <SVG src="/svg/logo.svg" className="w-20 h-20" />
          </Link>
        </div>
        <ul className="flex flex-col py-4">
          <AdminNavItem href="/">Home</AdminNavItem>
          <AdminNavItem href="/orders">Orders</AdminNavItem>
          <AdminNavItem href="/products">Products</AdminNavItem>
          <AdminNavItem href="/archivetables">Archive Tables</AdminNavItem>
          <AdminNavItem href="/tables">Tables</AdminNavItem>
        </ul>
      </div>
    </aside>
  )
}
