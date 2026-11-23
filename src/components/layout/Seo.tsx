import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { SITE_URL, metaFor } from '../../lib/seo'

const setMeta = (selector: string, attr: string, value: string) =>
  document.querySelector(selector)?.setAttribute(attr, value)

/**
 * Keeps the page title, description, canonical address and social-sharing tags in step with the current
 * page as visitors move around. The same values are written into static HTML at build time by
 * scripts/prerender.mjs, which is what search engines and link previews read first.
 */
export function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = metaFor(pathname)
    const url = SITE_URL + (meta.path === '/404' ? pathname : meta.path)
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('link[rel="canonical"]', 'href', url)
  }, [pathname])
  return null
}
