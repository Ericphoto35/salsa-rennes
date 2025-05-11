import Head from 'next/head';

export default function Seo({
  title = 'Salsa Rennes',
  description = 'Le site de référence pour la salsa à Rennes : soirées, cours, événements, et plus encore.',
  url = 'https://www.salsarennes.fr',
  image = '/images/clem-eric.webp', // Nom de fichier corrigé sans espace
  imageWidth = 1200,
  imageHeight = 630,
  type = 'website',
  noIndex = false,
  keywords = 'salsa rennes, cours de salsa, danse latine, école de danse rennes',
}) {
  // URL complète de l'image
  const fullImageUrl = `${url}${image}`;
  
  return (
    <Head>
      {/* Balises de base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="language" content="fr" />
      <meta httpEquiv="content-language" content="fr" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content={imageWidth.toString()} />
      <meta property="og:image:height" content={imageHeight.toString()} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="Salsa Rennes" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  );
}
