import Link from 'next/link'
import { useState } from 'react'
import SVG from 'react-inlinesvg'

const NavItem = ({ children,SVG, href }) => {
  return (
    <li>
      <Link href={href}>        
          <a
            className="pl-10 flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
            >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <SVG src={SVG} />
            </span>
            <span className="pl-8 text-sm font-medium">Dashboard</span>
          </a>
      </Link>
    </li>
  )
}

export default function AdminNavigation() {
  const [menu, setMenu] = useState(false)

  return (
    <aside className="flex flex-col w-full h-full bg-gray-200 rounded-r-3xl overflow-hidden">
      <div className="flex items-center justify-center py-7 shadow-md">
        <SVG src='./svg/logo.svg' className='w-20 h-20'/>
      </div>
      <ul className="flex flex-col py-4">
        
        <li>
          <a
            href="#"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-music"></i>
            </span>
            <span className="text-sm font-medium">Music</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-drink"></i>
            </span>
            <span className="text-sm font-medium">Drink</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-shopping-bag"></i>
            </span>
            <span className="text-sm font-medium">Shopping</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-chat"></i>
            </span>
            <span className="text-sm font-medium">Chat</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-user"></i>
            </span>
            <span className="text-sm font-medium">Profile</span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-bell"></i>
            </span>
            <span className="text-sm font-medium">Notifications</span>
            <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
              5
            </span>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800"
          >
            <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
              <i className="bx bx-log-out"></i>
            </span>
            <span className="text-sm font-medium">Logout</span>
          </a>
        </li>
      </ul>
    </aside>
  )
}
