import Link from 'next/link'

const style =
  'px-6 py-4 bg-gradient bg-gradient-to-r border border-red-500 hover:border-transparent bg-transparent hover:text-white hover:from-red-500 hover:to-orange-500 rounded-3xl transition-all ease-in-out duration-500'

export default function Button({ className, islink, href, children, onClick }) {
  return islink ? (
    <Link href={href}>
      <a className={`inline-block ${style} ${className}`}>{children}</a>
    </Link>
  ) : (
    <button className={`${style} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
