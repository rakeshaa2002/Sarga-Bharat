import { m } from 'framer-motion'
import { Globe2, Handshake, Layers, Target } from 'lucide-react'
import { company } from '../../data/company'
import { Container } from '../ui/Container'
import { inViewStagger, staggerItem } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'

// Drawn from the company's own vision, mission and values statements, and its bearing range.
const benefits = [
  {
    icon: Layers,
    title: 'Complete Bearing Range',
    text: 'Ball, roller, thrust and multi-row bearings, plus specialised technologies, so one partner can cover an entire application.',
  },
  {
    icon: Target,
    title: 'Application-Led Solutions',
    text: 'Solutions organised around automotive and industrial duty, starting from how and where the bearing will run.',
  },
  {
    icon: Globe2,
    title: 'Indian Roots, Global Reach',
    text: 'Empowering Indian manufacturers and taking Indian excellence to the world, in the spirit of Make in India.',
  },
  {
    icon: Handshake,
    title: 'Trusted Partnerships',
    text: 'Lasting relationships built on integrity, trust, quality and collective growth, creating value for every partner.',
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" aria-labelledby="why-title" className="border-b border-steel-200 bg-white py-20 lg:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <Reveal>
          <p className="text-sm font-semibold text-blue-700">Why {company.shortName}</p>
          <h2
            id="why-title"
            className="mt-3 text-[2rem] leading-[1.1] font-bold tracking-[-0.015em] text-navy-900 sm:text-[2.5rem]"
          >
            Bearing Solutions with Indian Roots and Global Reach
          </h2>
          <p className="mt-4 text-base leading-relaxed text-steel-600">{company.philosophy}</p>
          <p className="mt-6 flex items-center gap-3 text-sm font-semibold text-navy-900">
            <span aria-hidden="true" className="size-2 rounded-full bg-[#138808]" />
            Office in {company.location}
          </p>
        </Reveal>

        <m.ul {...inViewStagger} className="grid gap-4 sm:grid-cols-2">
          {benefits.map(({ icon: Icon, title, text }) => (
            <m.li
              key={title}
              variants={staggerItem}
              className="group rounded-lg border border-steel-200 bg-steel-50 p-6 transition-[border-color,background-color,translate] duration-300 hover:-translate-y-1 hover:border-blue-600/50 hover:bg-white"
            >
              <span className="grid size-11 place-items-center rounded-md bg-white text-blue-700 ring-1 ring-steel-200 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[17px] font-bold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-600">{text}</p>
            </m.li>
          ))}
        </m.ul>
      </Container>
    </section>
  )
}
