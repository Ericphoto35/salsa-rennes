import '../styles/globals.css'
import CookieConsentBanner from '../components/CookieConsent'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  useEffect(() => {
    setShowCookieBanner(true)
  }, [])

  return (
    <div>
      <Component {...pageProps} />
      {showCookieBanner && <CookieConsentBanner />}
    </div>
  )
}

export default MyApp
