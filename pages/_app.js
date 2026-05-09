import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { AuthProvider } from '../contexts/AuthContext'
import CookieConsentBanner from '../components/CookieConsent'
import { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  useEffect(() => {
    setShowCookieBanner(true)
  }, [])

  return (
    <div className={poppins.variable}>
      <AuthProvider>
        <Component {...pageProps} />
        {showCookieBanner && <CookieConsentBanner />}
      </AuthProvider>
    </div>
  )
}

export default MyApp
