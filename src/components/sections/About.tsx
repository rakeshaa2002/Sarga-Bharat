import { m } from 'framer-motion'
import { Compass, HeartHandshake, Telescope } from 'lucide-react'
import { company } from '../../data/company'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Photo } from '../ui/Photo'
import { inViewStagger, staggerItem } from '../../lib/motion'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const statements = [
  { icon: Telescope, title: 'Vision', text: company.vision },
  { icon: Compass, title: 'Mission', text: company.mission },
  { icon: HeartHandshake, title: 'Values', text: company.values },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-b border-steel-200 bg-white py-20 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <Reveal>
          <figure>
            <div className="group aspect-[4/3] overflow-hidden rounded-lg border border-steel-200 bg-navy-900 shadow-sm">
              <Photo
                name="about-bearing-housing"
                widths={[640, 1024, 1440]}
                sizes="(min-width: 1240px) 560px, (min-width: 1024px) 45vw, 100vw"
                alt="Bearing seated in the bore of a machined housing"
                className="transition-transform duration-[1.2s] group-hover:scale-105"
              />
            </div>
            <figcaption className="mt-3 text-xs text-steel-600">
              A bearing seated in its housing, where precision of fit decides service life.
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading id="about-title" title={`About ${company.name}`} subtitle={`${company.motto}. ${company.tagline}.`} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-steel-600">
              <p>
                {company.name} is an Indian bearing solutions company based in{' '}
                <strong className="text-navy-900">{company.location}</strong>. Our range spans deep groove, angular
                contact, self-aligning, cylindrical, spherical, tapered, needle, thrust and four-row bearings.
              </p>
              <p>
                We serve automotive and industrial applications, from wheel hub units and electric motor
                bearings to gearboxes and conveyor drives, along with specialised technologies such as electrically
                insulated, hybrid ceramic and sensor-integrated bearings.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="mt-7 border-l-2 border-blue-600 pl-5">
              <blockquote>
                <p className="text-xl leading-snug font-bold text-navy-900 [font-stretch:88%] sm:text-2xl">
                  {company.philosophy}
                </p>
              </blockquote>
              <figcaption className="mt-1.5 text-sm text-steel-600">Our philosophy</figcaption>
            </figure>
            <div className="mt-8">
              <ButtonLink href="#contact" size="lg">
                Contact Our Team
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        {/* Vision, mission and values, in the company's own words */}
        <m.ul
          {...inViewStagger}
          className="grid gap-px overflow-hidden rounded-lg border border-steel-200 bg-steel-200 md:grid-cols-3 lg:col-span-2"
        >
          {statements.map(({ icon: Icon, title, text }) => (
            <m.li key={title} variants={staggerItem} className="bg-white p-6 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded bg-blue-50 text-blue-700">
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="text-lg font-bold text-navy-900">{title}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-steel-600">{text}</p>
            </m.li>
          ))}
        </m.ul>
      </Container>
    </section>
  )
}
