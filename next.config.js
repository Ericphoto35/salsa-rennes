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
    domains: ['maps.googleapis.com'],
    unoptimized: true, // Désactiver l'optimisation d'images pour résoudre le problème fetchPriority
  },
}

module.exports = nextConfig
