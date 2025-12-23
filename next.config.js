/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ];
  },
  swcMinify: true,
  images: {
    domains: ['maps.googleapis.com', 'placehold.co'],
    // unoptimized: true, // Désactivé pour rétablir l'optimisation SEO
  },
}

module.exports = nextConfig
