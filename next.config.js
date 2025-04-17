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
  },
}

module.exports = nextConfig
