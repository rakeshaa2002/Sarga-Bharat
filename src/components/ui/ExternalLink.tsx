import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface ExternalLinkProps {
  href: string
  children: ReactNode
  className?: string
  /** Hide the trailing icon, e.g. when the link already carries one */
  bare?: boolean
}

/** Link to another website, opened in a new tab and announced as such. */
export function ExternalLink({ href, children, className = '', bare = false }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${className}`}>
      {children}
      {!bare && <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" strokeWidth={2} />}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
