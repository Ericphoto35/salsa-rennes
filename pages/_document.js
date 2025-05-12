import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon standard dans la racine avec paramètre de version pour forcer l'actualisation */}
        <link rel="icon" href="/favicon.ico?v=2" />
        {/* Favicon PNG */}
        <link rel="icon" type="image/png" href="/images/logonoir.png?v=2" />
        {/* Pour les appareils Apple */}
        <link rel="apple-touch-icon" href="/images/logonoir.png?v=2" />
        {/* Pour la compatibilité avec les anciens navigateurs */}
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=2" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
