import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { SITE_URL, metaFor, pages } from './lib/seo'

/** Renders one page to HTML for the build-time pre-renderer (scripts/prerender.mjs). */
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  )
}

export { SITE_URL, metaFor, pages }
