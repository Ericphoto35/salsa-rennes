const BASE_URL = 'https://www.salsarennes.fr';

const pages = [
  { path: '',                           changefreq: 'weekly',  priority: '1.0', lastmod: '2026-05-09' },
  { path: '/pourquoi-salsa',            changefreq: 'monthly', priority: '0.9', lastmod: '2026-05-09' },
  { path: '/notre-communaute',          changefreq: 'weekly',  priority: '0.7', lastmod: '2026-05-09' },
  { path: '/inscription',               changefreq: 'monthly', priority: '0.8', lastmod: '2026-05-09' },
  { path: '/politique-de-confidentialite', changefreq: 'yearly', priority: '0.3', lastmod: '2025-01-01' },
];

export default function handler(req, res) {
  const urls = pages
    .map(({ path, changefreq, priority, lastmod }) => `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`)
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.end(sitemap);
}
