export default async function handler(req, res) {
  const baseUrl = 'https://www.salsarennes.fr';
  
  const pages = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: 'pourquoi-salsa', changefreq: 'monthly', priority: '0.9' },
    { url: 'inscription', changefreq: 'monthly', priority: '0.8' },
    { url: 'niveaux/debutant', changefreq: 'monthly', priority: '0.8' },
    { url: 'niveaux/intermediaire', changefreq: 'monthly', priority: '0.8' },
    { url: 'niveaux/avance', changefreq: 'monthly', priority: '0.8' },
    { url: 'politique-de-confidentialite', changefreq: 'yearly', priority: '0.3' },
  ];

  const urls = pages.map(
    ({ url, changefreq, priority }) => {
      const path = url ? `/${url}` : '';
      return `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
    }
  ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
