import '../styles/globals.css'
import '@fontsource/mulish/500.css'
import '@fontsource/mulish/700.css'
import '@fontsource/mulish/800.css'

import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_EN',
          url: '',
          site_name: 'Sahara Platform',
          description: 'Best way to eat healthy',
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
