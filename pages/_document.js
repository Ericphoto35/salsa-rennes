import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" href="/images/logonoir.png?v=2" />
        <link rel="apple-touch-icon" href="/images/logonoir.png?v=2" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=2" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
