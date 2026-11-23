import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { solutionSectors } from '../../data/bearings'
import { inViewStagger, staggerItem } from '../../lib/motion'
import { sectorPath } from '../../lib/routes'
import { Container } from '../ui/Container'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

/** Home page teaser for the sector pages. */
export function SectorsPreview() {
  return (
    <section aria-labelledby="sectors-title" className="border-b border-steel-200 bg-steel-50 py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="sectors-title"
            title="Application Solutions"
            subtitle="Bearing solutions for automotive and industrial customers across India."
          />
        </Reveal>
        <m.ul {...inViewStagger} className="mt-12 grid gap-6 md:grid-cols-2">
          {solutionSectors.map((s) => (
            <m.li key={s.id} variants={staggerItem}>
              <Link
                to={sectorPath(s.id)}
                className="group relative block aspect-[16/10] overflow-hidden rounded-lg bg-navy-900"
              >
                <Photo
                  name={s.image}
                  widths={[480, 800, 1280]}
                  sizes="(min-width: 1240px) 580px, (min-width: 768px) 48vw, 100vw"
                  alt={s.imageAlt}
                  className="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/35 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <span className="block text-2xl font-bold [font-stretch:85%] sm:text-3xl">{s.title}</span>
                  <span className="mt-2 block max-w-lg text-sm leading-relaxed text-steel-200 sm:text-base">{s.intro}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
                    {s.items.length} solutions
                    <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </m.li>
          ))}
        </m.ul>
      </Container>
    </section>
  )
}
