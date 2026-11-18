/** @type {import('next').NextConfig} */
const to = (sources, destination) =>
  sources.map((source) => ({ source, destination, permanent: true }));

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
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/(.*)',
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

  // Anciennes adresses du site Hostinger. permanent = HTTP 308.
  // Le fragment (#section) fait défiler la page d'accueil au bon endroit.
  async redirects() {
    return [
      ...to(
        ['/inscription', '/preinscriptions'],
        '/inscriptions-cours-de-salsa'
      ),
      ...to(
        ['/niveaux/debutant', '/cours-salsa-debutant-rennes'],
        '/inscriptions-cours-de-salsa#debutant'
      ),
      ...to(
        ['/niveaux/intermediaire', '/cours-intermediaire-de-salsa'],
        '/inscriptions-cours-de-salsa#inter-1'
      ),
      ...to(
        [
          '/niveaux/avance',
          '/cours-inter-2',
          '/cours-avance-rennes',
          '/inscription-cours-avance',
        ],
        '/inscriptions-cours-de-salsa#inter-2'
      ),
      ...to(
        [
          '/les-cours',
          '/footwork',
          '/cours-de-lady-styling-salsa',
          '/pourquoi-salsa',
          '/quest-ce-que-la-salsa',
          '/quest-ce-que-la-danse-salsa-',
          '/differentes-salsa',
        ],
        '/#les-cours'
      ),
      ...to(['/tarifs'], '/#tarifs'),
      ...to(['/planning-salsa-rennes'], '/#planning'),
      ...to(['/professeurs-de-salsa-a-rennes'], '/#professeurs'),
      ...to(
        [
          '/salsa-rennes',
          '/boutique-qrm',
          '/sac-fourre-tout-noir',
          '/t-shirt-femme-logo-dos-dore-brillant-product',
          '/t-shirt-homme-logo-dore-brillant-product',
          '/rentree-salsa-202627',
          '/rentree-salsa-2025-26',
          '/infos-rentree-salsa-2023',
          '/informations-importantes',
          '/login',
          '/admin',
          '/profile',
          '/session-recovery',
        ],
        '/'
      ),
      ...to(
        [
          '/notre-communaute',
          '/notre-compte-instagram',
          '/ou-danser-a-rennes',
          '/swob',
          '/salsa-nantes',
          '/groovin90s-hip-hop-rnb',
          '/rennes-loves-mambo',
          '/rennes-loves-mambo-avec-timothe-et-helene-13juin',
          '/3-heures-de-salsa-avec-ella-jauk-paris',
          '/infos-breizh-loves-mambo',
          '/breizh-loves-mambo',
          '/alicia-velasco-a-rennes',
          '/stage-de-salsa-avec-brandon',
          '/cours-de-salsa-complets-2023',
          '/festival-corazon-latino-2023',
          '/soiree-salsa-rennes-ninkasi',
          '/soiree-salsa-au-stadium',
          '/soiree-salsa-bachata-au-stadium',
          '/soiree-salsa-decembre-2025',
          '/soiree-dintegration',
          '/only-salsa-2024',
          '/only-salsa-ile-de-re',
          '/portes-ouvertes-salsa-rennes',
          '/que-rico-mambo-portes-ouvertes-2024',
          '/le-groupe-de-salsa-du-moment',
        ],
        '/#evenements'
      ),
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
    ],
  },
};

module.exports = nextConfig;
