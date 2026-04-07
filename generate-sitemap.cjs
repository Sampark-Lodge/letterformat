const fs = require('fs');
const path = require('path');

const baseUrl = 'https://sampark-lodge.github.io/letterformat/';
const rootDir = path.join(__dirname);

// Get all HTML files
const formatsDir = path.join(rootDir, 'formats');
const formatFiles = fs.readdirSync(formatsDir).filter(f => f.endsWith('.html'));

// Root level category pages
const rootPages = fs.readdirSync(rootDir)
  .filter(f => f.endsWith('.html'))
  .filter(f => !f.startsWith('formats'))
  .filter(f => fs.statSync(path.join(rootDir, f)).isFile());

// Sort files
formatFiles.sort();
rootPages.sort();

function buildSitemapUrl(loc, lastmod, changefreq, priority) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const today = '2026-04-07';
let lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];

// Homepage
lines.push(buildSitemapUrl(`${baseUrl}`, today, 'daily', '1.0'));

// Category pages
rootPages.forEach(f => {
  const priority = f === 'index.html' ? '1.0' : '0.8';
  const changefreq = 'weekly';
  lines.push(buildSitemapUrl(`${baseUrl}${f}`, today, changefreq, priority));
});

// Format pages
formatFiles.forEach(f => {
  lines.push(buildSitemapUrl(`${baseUrl}formats/${f}`, today, 'monthly', '0.7'));
});

lines.push('</urlset>');

const sitemap = lines.join('\n');
fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), sitemap, 'utf8');

console.log(`\n📋 Sitemap generated: ${rootPages.length + formatFiles.length + 1} URLs`);
console.log(`   - Homepage: 1`);
console.log(`   - Category pages: ${rootPages.length}`);
console.log(`   - Format pages: ${formatFiles.length}`);
console.log(`\n✨ Done!\n`);
