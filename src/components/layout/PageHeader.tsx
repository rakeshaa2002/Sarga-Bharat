import { m } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ease } from '../../lib/motion'
import { Container } from '../ui/Container'

interface Crumb {
  label: string
  to?: string
}

/** Title band at the top of every inner page, with breadcrumbs back to the home page. */
export function PageHeader({
  title,
  subtitle,
  crumbs,
  children,
}: {
  title: string
  subtitle?: string
  crumbs: Crumb[]
  children?: ReactNode
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgb(45_184_234/0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgb(45_184_234/0.08)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:linear-gradient(to_left,black,transparent_85%)]"
      />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-steel-300">
            {[{ label: 'Home', to: '/' }, ...crumbs].map((c, i, all) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {c.to && i < all.length - 1 ? (
                  <Link to={c.to} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
                {i < all.length - 1 && <ChevronRight aria-hidden="true" className="size-3.5 text-steel-400" />}
              </li>
            ))}
          </ol>
        </nav>
        <m.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mt-5 max-w-3xl text-[2.25rem] leading-[1.08] font-bold tracking-[-0.02em] [font-stretch:82%] sm:text-[3rem]"
        >
          {title}
        </m.h1>
        {subtitle && (
          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease }}
            className="mt-4 max-w-2xl text-lg leading-relaxed text-steel-300"
          >
            {subtitle}
          </m.p>
        )}
        {children}
      </Container>
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 flex h-1">
        <span className="flex-1 bg-[#ff9933]" />
        <span className="flex-1 bg-white" />
        <span className="flex-1 bg-[#138808]" />
      </span>
    </section>
  )
}
