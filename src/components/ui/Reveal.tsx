import { m } from 'framer-motion'
import type { ReactNode } from 'react'
import { ease } from '../../lib/motion'

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </m.div>
  )
}
