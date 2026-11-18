import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Qué Rico MAMBO — Salsa Rennes</title>
        <meta httpEquiv="refresh" content="0; url=/site/index.html" />
      </Head>
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: '48px 20px', maxWidth: 640 }}>
        <h1>Qué Rico MAMBO</h1>
        <p>Cours de salsa portoricaine à Rennes, avec Clémentine et Éric.</p>
        <p>
          <a href="/site/index.html">Entrer sur le site</a>
        </p>
      </main>
    </>
  );
}
