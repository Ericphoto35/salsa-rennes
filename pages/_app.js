import '../styles/globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { AuthProvider } from '../contexts/AuthContext'
import CookieConsentBanner from '../components/CookieConsent'
import { useEffect, useState } from 'react'
import { Poppins, Bodoni_Moda, Manrope, JetBrains_Mono } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  useEffect(() => {
    setShowCookieBanner(true)
  }, [])

  return (
    <div className={`${poppins.variable} ${bodoni.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <AuthProvider>
        <Component {...pageProps} />
        {showCookieBanner && <CookieConsentBanner />}
      </AuthProvider>
    </div>
  )
}

export default MyApp
