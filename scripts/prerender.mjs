// Build-time pre-rendering: writes a static HTML file for every page, with its own title, description,
// canonical address, social-sharing tags and breadcrumb structured data, plus sitemap.xml.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const dist = path.join(root, 'dist')
const { render, pages, metaFor, SITE_URL } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Replacement is a string where $1/$2 refer to capture groups; dynamic content is inserted literally.
function replaceOrFail(html, pattern, replacement, what) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html)
  if (!found) throw new Error(`prerender: ${what} not found in index.html`)
  return html.replace(pattern, (_m, ...groups) => replacement.replace(/\$(\d)/g, (_x, n) => groups[n - 1] ?? ''))
}

function pageHtml(urlPath, meta) {
  const url = SITE_URL + (urlPath === '/' ? '/' : urlPath)
  let html = template
  html = replaceOrFail(html, /<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`, '<title>')
  html = replaceOrFail(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${escape(meta.description)}$2`, 'meta description')
  html = replaceOrFail(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${escape(meta.title)}$2`, 'og:title')
  html = replaceOrFail(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${escape(meta.description)}$2`, 'og:description')
  html = replaceOrFail(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`, 'og:url')
  html = replaceOrFail(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`, 'canonical')
  if (meta.crumbs?.length) {
    const items = [{ name: 'Home', path: '/' }, ...meta.crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: SITE_URL + c.path,
    }))
    const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
    html = html.replace('</head>', `  <script type="application/ld+json">${JSON.stringify(breadcrumbs)}</script>\n  </head>`)
  }
  return replaceOrFail(html, '<div id="root"></div>', `<div id="root">${render(urlPath)}</div>`, 'root element')
}

const written = []
for (const page of pages) {
  const file = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path, 'index.html')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, pageHtml(page.path, page))
  written.push(page.path)
}
// Vercel serves 404.html for addresses that don't match any page
fs.writeFileSync(
  path.join(dist, '404.html'),
  replaceOrFail(pageHtml('/404', metaFor('/404')), /(<meta name="robots" content=")[^"]*(")/, '$1noindex, follow$2', 'robots meta'),
)

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url><loc>${SITE_URL}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === '/' ? '1.0' : p.path.split('/').length > 2 ? '0.7' : '0.8'}</priority></url>`)
  .join('\n')}
</urlset>
`
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap)
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${written.length} pages + 404, sitemap.xml (${SITE_URL})`)
