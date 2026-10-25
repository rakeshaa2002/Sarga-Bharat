import { m } from 'framer-motion'
import { technologies } from '../../data/bearings'
import { BearingSpinner } from '../ui/BearingSpinner'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { EnquireLink } from '../ui/EnquireLink'
import { inViewStagger, staggerItem } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'

export function Technologies() {
  return (
    <section
      id="technologies"
      aria-labelledby="technologies-title"
      className="on-dark relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgb(45_184_234/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(45_184_234/0.07)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <Container className="relative grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <Reveal>
            <h2
              id="technologies-title"
              className="text-[2rem] leading-[1.1] font-bold tracking-[-0.015em] text-white sm:text-[2.5rem]"
            >
              Specialised Bearing Technologies
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-steel-300">
              Bearing technologies for electrified drives, harsh environments and demanding speeds.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="relative mt-10 hidden max-w-[420px] lg:block">
            <BearingSpinner variant="blueprint" className="w-full" balls={12} />
            <span className="mt-3 block text-center text-xs tracking-wide text-steel-400">
              Deep groove ball bearing, front view
            </span>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <ButtonLink href="#contact" variant="outline-light">
              Discuss a technology requirement
            </ButtonLink>
          </Reveal>
        </div>

        <m.ul {...inViewStagger} className="grid content-start gap-4 sm:grid-cols-2">
          {technologies.map(({ id, name, summary, icon: Icon }) => (
            <m.li key={id} variants={staggerItem}>
              <article
                id={`tech-${id}`}
                data-highlight
                aria-labelledby={`tech-${id}-title`}
                className="group flex h-full scroll-mt-4 flex-col rounded-lg border border-white/10 bg-white/[0.03] p-6 transition-[border-color,background-color,translate] duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-white/[0.06]"
              >
                <span className="grid size-11 place-items-center rounded-md bg-cyan-400/10 text-cyan-400 ring-1 ring-cyan-400/25 transition-colors group-hover:bg-cyan-400 group-hover:text-navy-950">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <h3 id={`tech-${id}-title`} className="mt-5 text-lg leading-snug font-bold text-white">
                  {name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-300">{summary}</p>
                <div className="mt-5 text-sm">
                  <EnquireLink interest={name} label={`Enquire now about ${name}`} tone="dark">
                    Enquire now
                  </EnquireLink>
                </div>
              </article>
            </m.li>
          ))}
        </m.ul>
      </Container>
    </section>
  )
}
