import { useState } from 'react'
import SVG from 'react-inlinesvg'

export default function Dropdown() {
  const [dropdown, setDropdown] = useState(false)
  return (
    <>
      <button onClick={() => setDropdown(!dropdown)}>
        <SVG src="/svg/three-dots.svg" className="fill-current w-5 h-5" />
      </button>

      <div className={`col-4 justify-center ${dropdown ? ' flex' : ' hidden'}`}>
        <ul className="flex w-full p-5 flex-col items-center">
          <a className="block py-4 border-b border-gray-200">Accept Order</a>
          <a className="block py-4 border-b border-gray-200 ">Reject Order</a>
          <a className="block py-4 border-b border-gray-200 ">View Details</a>
        </ul>
      </div>
    </>
  )
}
