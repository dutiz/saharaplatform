import Head from 'next/head'
import { useState } from 'react'
import SVG from 'react-inlinesvg'

import AdminNavigation from './AdminNavigation'

export default function Admin({ children, title = null }) {
  const dev = process.env.NODE_ENV === 'development'
  const [menu, setMenu] = useState(false)

  return (
    <>
      <Head>
        <title>{title ? `${title} - Admin - Sahara Platform` : 'Sahara Platform'}</title>

        {/* Favicons */}

        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div
        className={`font-sans antialiased container-fluid flex flex-col ${
          dev ? 'debug-screens' : ''
        }`}
      >
        <div className="row bg-gray-90">
          <div className={`col-3 ${menu ? 'col-12' : 'col-3'}`}>
            <label htmlFor="menu-toggle" className="md:hidden block cursor-pointer">
              <SVG
                src="../svg/menu.svg"
                className="fill-current text-black w-6 h-6"
                onClick={() => setMenu(!menu)}
              />
            </label>
            <AdminNavigation menu={menu} />
          </div>
          <div className={`col-9 mt-10 ${menu ? 'hidden' : 'visible'}`}>
            {children}
            <p className="py-5 text-center text-md">
              &copy; 2022 Sahara-Food , Developed by UpHigh Dev.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
