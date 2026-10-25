/**
 * Smoothly scrolls to an in-page section (respecting reduced-motion preferences),
 * updates the URL hash, moves keyboard focus to the target and briefly highlights it.
 */
export function scrollToHash(hash: string) {
  const el = document.getElementById(hash.replace(/^#/, ''))
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.pushState(null, '', hash)
  // pushState does not fire hashchange; components such as the sector tabs listen for it
  window.dispatchEvent(new HashChangeEvent('hashchange'))
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  if (el.dataset.highlight !== undefined) {
    el.classList.remove('is-highlighted')
    void el.offsetWidth // restart the animation
    el.classList.add('is-highlighted')
  }
}
