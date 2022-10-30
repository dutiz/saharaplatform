import Link from 'next/link'
import { useEffect } from 'react'
import { useState } from 'react'
import SVG from 'react-inlinesvg'
import { useSelector } from 'react-redux/'

import Button from '../Button'

function UseScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    function updatePosition() {
      setScrollPosition(window.pageYOffset)
    }
    window.addEventListener('scroll', updatePosition)
    updatePosition()

    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

const NavItem = ({ children, href }) => {
  return (
    <li className="w-full md:w-auto md:mr-6">
      <Link href={href} legacyBehavior>
        <a className="block py-4 md:py-0 border-b border-gray-200 md:border-b-0 md:border-transparent">
          {children}
        </a>
      </Link>
    </li>
  )
}

export default function Navigation() {
  const scrollPosition = UseScrollPosition()
  const [menu, setMenu] = useState(false)
  const quantity = useSelector((state) => state.cart.quantity)
  const classname = 'bg-white shadow-lg sticky top-0 flex items-center'
  return (
    <div
      style={{ zIndex: '999' }}
      className={`${classname} ${scrollPosition > 0 ? 'shadow' : 'shadow-none'}`}
    >
      <div className="container">
        <div className="row py-6 justify-between">
          <div className="col-4">
            <Link href="/">
              <SVG src="../svg/logo.svg" className="fill-current w-20 h-20" />
            </Link>
          </div>
          <div className="col-2 md:hidden block">
            <label htmlFor="menu-toggle" className="cursor-pointer">
              <SVG
                src="../svg/menu.svg"
                className="fill-current text-black w-6 h-6"
                onClick={() => setMenu(!menu)}
              />
            </label>
          </div>

          <div className={`md:col-4 md:flex justify-center ${menu ? ' flex' : ' hidden'}`}>
            <ul className="flex w-full p-5 flex-col md:w-auto md:p-0 md:flex-row items-center">
              <NavItem href="/">Home</NavItem>
              <NavItem href="/menu">Menu</NavItem>
              <NavItem href="/admin">Admin</NavItem>
            </ul>
          </div>
          <div className="md:col-4 md:flex items-center justify-end">
            <div className="relative mr-5">
              <Link href="/cart" passHref>
                <SVG src="../svg/cart.svg" className=" fill-current w-9 h-9 " />
                <div className="absolute -right-2 -top-2  w-5 h-5 bg-orange-500 p-1 flex items-center justify-center font-bold text-white rounded-xl">
                  {quantity}
                </div>
              </Link>
            </div>
            <Button islink href="tel:0038972605415">
              0038972605415
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
