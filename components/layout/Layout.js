import Head from 'next/head'

import FooterSection from '../sections/FooterSection'
import Navigation from './Navigation'

export default function Layout({ children, title = null }) {
  const dev = process.env.NODE_ENV === 'development'

  return (
    <>
      <Head>
        <title>{title ? `${title} - Sahara Platform` : 'Sahara Platform'}</title>

        {/* Favicons */}

        <link rel="apple-touch-icon" sizes="180x180" href="x  /favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className={`font-sans antialiased flex flex-col ${dev ? 'debug-screens' : ''}`}>
        {/* Navigation here */}
        <Navigation />

        {children}

        {/* Footer here */}

        <FooterSection />
      </div>
    </>
  )
}
