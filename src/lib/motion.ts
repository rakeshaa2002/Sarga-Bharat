import type { Variants } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

/** Variants for grids whose items enter one after another (parent: `stagger`, children: `staggerItem`). */
export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

/** Props that start a `stagger` sequence when the element scrolls into view. */
export const inViewStagger = {
  variants: stagger,
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '0px 0px -10% 0px' },
} as const
