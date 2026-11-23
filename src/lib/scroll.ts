/**
 * Smoothly scrolls to an element on the current page (respecting reduced-motion preferences),
 * moves keyboard focus to it and briefly highlights it. Returns false if the element isn't rendered yet.
 */
export function scrollToId(id: string, smooth = true): boolean {
  const el = document.getElementById(id)
  if (!el) return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' })
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  if (el.dataset.highlight !== undefined) {
    el.classList.remove('is-highlighted')
    void el.offsetWidth // restart the animation
    el.classList.add('is-highlighted')
  }
  return true
}
