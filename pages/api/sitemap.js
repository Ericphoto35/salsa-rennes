export default async function handler(req, res) {
  const baseUrl = 'https://www.salsarennes.fr';
  // N'inclure que les pages publiques
  const pages = [
    '', // Accueil
    'inscription',
    // Ajouter d'autres pages publiques manuellement si besoin
  ];
  const urls = pages.map(
    (page) =>
      `<url><loc>${baseUrl}/${page}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(sitemap);
  res.end();
}
