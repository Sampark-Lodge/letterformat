const fs = require('fs');
const path = require('path');

const formatsDir = './formats';
const siteUrl = 'https://sampark-lodge.github.io/letterformat';
const files = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>2026-04-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Category Pages -->
  <url><loc>${siteUrl}/application.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/complaint.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/certificate.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/bank.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/government.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/school.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/employment.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/academic.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>${siteUrl}/job.html</loc><lastmod>2026-04-07</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
`;

files.forEach(file => {
  const slug = file.replace('.html', '');
  let priority = '0.7';
  if (slug.includes('leave') || slug.includes('resignation') || slug.includes('kyc')) priority = '0.8';
  
  xml += `  <url>
    <loc>${siteUrl}/formats/${file}</loc>
    <lastmod>2026-04-07</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
});

xml += '</urlset>';

fs.writeFileSync('./sitemap.xml', xml);
console.log(`✅ Sitemap updated with ${files.length} format pages + 9 category pages`);
