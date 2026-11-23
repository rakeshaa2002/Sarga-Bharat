import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { scrollToId } from '../../lib/scroll'

/**
 * Scroll behaviour for page navigation: a new page starts at the top, and a link with a hash
 * (e.g. /technologies#tech-hybrid-ceramic) scrolls to that element once the page has rendered.
 * Navigations that pass `state.keepScroll` (such as switching sector tabs) leave the scroll position alone.
 */
export function ScrollManager() {
  const { pathname, hash, key, state } = useLocation()
  const keepScroll = (state as { keepScroll?: boolean } | null)?.keepScroll

  useEffect(() => {
    if (keepScroll) return
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }
    // the target may appear a moment later (lazy content, entrance animations), so retry briefly
    const id = decodeURIComponent(hash.slice(1))
    let tries = 0
    const timer = window.setInterval(() => {
      if (scrollToId(id) || ++tries > 20) window.clearInterval(timer)
    }, 50)
    return () => window.clearInterval(timer)
  }, [pathname, hash, key, keepScroll])

  return null
}
