import fs from 'fs';
import path from 'path';
import { URL } from 'url';

const LAST_MODIFIED = new Date().toISOString();
const DOMAIN = 'https://uebelacker.dev';

const PAGES = [
  { url: '/', alternates: [{ lang: 'de', url: '/de' }] },
  { url: '/imprint', alternates: [{ lang: 'de', url: '/de/impressum' }] },
  { url: '/privacy', alternates: [{ lang: 'de', url: '/de/datenschutz' }] },
];

const __dirname = new URL('.', import.meta.url).pathname;

// Written already indented, so the file needs no formatter afterwards — the
// layout is the one Prettier used to produce from a loosely indented template.
const alternate = ({ lang, url }) => `    <xhtml:link
      rel="alternate"
      hreflang="${lang}"
      href="${DOMAIN}${url}"
    />`;

const entry = (page) => `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${LAST_MODIFIED}</lastmod>
${page.alternates.map(alternate).join('\n')}
  </url>`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
${PAGES.map(entry).join('\n\n')}
</urlset>
`;

fs.writeFileSync(path.resolve(path.join(__dirname, '../public/sitemap.xml')), sitemap, 'utf8');
