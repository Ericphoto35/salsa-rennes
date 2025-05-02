import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext'
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
    <AuthProvider>
      <Component {...pageProps} />
      {showCookieBanner && <CookieConsentBanner />}
    </AuthProvider>
  )
}

export default MyApp
