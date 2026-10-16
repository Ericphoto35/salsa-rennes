/** @type {import('next').NextConfig} */
const QRM = 'https://www.quericomambo.fr';

const nextConfig = {
  reactStrictMode: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',  value: 'nosniff' },
          { key: 'X-Frame-Options',          value: 'DENY' },
          { key: 'X-XSS-Protection',         value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Assets statiques : cache navigateur 1 an
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Fonts auto-hébergées par next/font
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // Migration définitive vers quericomambo.fr (permanent: true = HTTP 308).
  // Les query strings sont préservées par Next.js.
  // Viser toujours https://www.quericomambo.fr pour éviter une chaîne apex→www.
  async redirects() {
    return [
      {
        source: '/',
        destination: `${QRM}/`,
        permanent: true,
      },
      {
        source: '/inscription',
        destination: `${QRM}/preinscriptions`,
        permanent: true,
      },
      {
        source: '/pourquoi-salsa',
        destination: `${QRM}/quest-ce-que-la-salsa`,
        permanent: true,
      },
      {
        source: '/notre-communaute',
        destination: `${QRM}/notre-compte-instagram`,
        permanent: true,
      },
      {
        source: '/mentions-legales',
        destination: `${QRM}/politique-de-confidentialite`,
        permanent: true,
      },
      {
        source: '/politique-de-confidentialite',
        destination: `${QRM}/politique-de-confidentialite`,
        permanent: true,
      },
      {
        source: '/niveaux/debutant',
        destination: `${QRM}/cours-salsa-debutant-rennes`,
        permanent: true,
      },
      {
        source: '/niveaux/intermediaire',
        destination: `${QRM}/cours-intermediaire-de-salsa`,
        permanent: true,
      },
      {
        source: '/niveaux/avance',
        destination: `${QRM}/cours-inter-2`,
        permanent: true,
      },
      {
        source: '/sitemap.xml',
        destination: `${QRM}/sitemap.xml`,
        permanent: true,
      },
      {
        source: '/login',
        destination: `${QRM}/`,
        permanent: true,
      },
      {
        source: '/admin',
        destination: `${QRM}/`,
        permanent: true,
      },
      {
        source: '/profile',
        destination: `${QRM}/`,
        permanent: true,
      },
      {
        source: '/session-recovery',
        destination: `${QRM}/`,
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'maps.googleapis.com' },
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};

module.exports = nextConfig;
