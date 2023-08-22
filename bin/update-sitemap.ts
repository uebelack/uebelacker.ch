/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

const LAST_MODIFIED = new Date().toISOString();
const DOMAIN = 'https://uebelacker.ch';

const PAGES = [
  { url: '/', alternates: [{ lang: 'de', url: '/de' }] },
  { url: '/imprint', alternates: [{ lang: 'de', url: '/de/impressum' }] },
  { url: '/privacy', alternates: [{ lang: 'de', url: '/de/datenschutz' }] },
];

const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${PAGES.map((page) => `
      <url>
        <loc>${DOMAIN}${page.url}</loc>
        <lastmod>${LAST_MODIFIED}</lastmod>${page.alternates.map((alternate) => `
        <xhtml:link
          rel="alternate"
          hreflang="${alternate.lang}"
          href="${DOMAIN}${alternate.url}"/>
        `).join('\n')}
      </url>
    `).join('\n')}
    </urlset>
`;

prettier.format(sitemap, { parser: 'html' }).then((formattedSitemap:string) => {
  fs.writeFileSync(path.resolve(path.join(__dirname, '../public/sitemap.xml')), formattedSitemap, 'utf8');
});
