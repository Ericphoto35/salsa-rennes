import Head from 'next/head';

export default function Seo({
  title = 'Salsa Rennes',
  description = 'Le site de référence pour la salsa à Rennes : soirées, cours, événements, et plus encore.',
  url = 'https://salsa-rennes.vercel.app',
  image = '/images/og-image.jpg', // À personnaliser
  type = 'website',
  noIndex = false,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  );
}
