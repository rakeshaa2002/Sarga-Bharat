import type { ReactNode } from 'react'

interface SectionHeadingProps {
  id: string
  title: string
  subtitle?: string
  tone?: 'light' | 'dark'
  /** Optional element aligned to the right of the heading on wide screens */
  aside?: ReactNode
  className?: string
}

export function SectionHeading({ id, title, subtitle, tone = 'light', aside, className = '' }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <h2
          id={id}
          className={`text-[2rem] leading-[1.1] font-bold tracking-[-0.015em] sm:text-[2.5rem] ${dark ? 'text-white' : 'text-navy-900'}`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-lg leading-relaxed sm:text-xl ${dark ? 'text-steel-300' : 'text-steel-600'}`}>{subtitle}</p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  )
}
