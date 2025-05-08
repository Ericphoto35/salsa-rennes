import '../styles/globals.css'
import SessionProvider from '../contexts/SessionProvider'
import CookieConsentBanner from '../components/CookieConsent'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }) {
  // État pour contrôler l'affichage de la bannière de cookies (côté client uniquement)
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  // Utilisation de useEffect pour s'assurer que le composant est rendu côté client uniquement
  useEffect(() => {
    setShowCookieBanner(true)
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
      {showCookieBanner && <CookieConsentBanner />}
    </SessionProvider>
  )
}

export default MyApp
