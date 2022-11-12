import '../styles/globals.css'
import '@fontsource/mulish/500.css'
import '@fontsource/mulish/700.css'
import '@fontsource/mulish/800.css'

import { useRouter } from 'next/router'
import Script from 'next/script'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from 'redux/store'

import * as gtag from '../lib/gtag'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    router.events.on('hashChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
      router.events.off('hashChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_EN',
          url: '',
          site_name: 'Sahara Platform',
          description: 'Best way to eat healthy',
        }}
      />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
