import { AnimatePresence, m } from 'framer-motion'
import { Car, CheckCircle2, Factory, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useEnquiry } from '../../context/enquiry-context'
import { solutionSectors, type SolutionSector } from '../../data/bearings'
import { whatsappLink } from '../../data/company'
import { ease } from '../../lib/motion'
import { scrollToHash } from '../../lib/scroll'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { EnquireLink } from '../ui/EnquireLink'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const sectorIcon: Record<SolutionSector['id'], LucideIcon> = { automotive: Car, industrial: Factory }

/** Reads "#solutions-automotive" style hashes so menu links and search results open the matching tab. */
function sectorFromHash(): SolutionSector['id'] | null {
  const match = window.location.hash.match(/^#solutions-(automotive|industrial)$/)
  return match ? (match[1] as SolutionSector['id']) : null
}

export function Solutions() {
  const [activeId, setActiveId] = useState<SolutionSector['id']>(() => sectorFromHash() ?? 'automotive')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const sector = solutionSectors.find((s) => s.id === activeId) ?? solutionSectors[0]

  useEffect(() => {
    const sync = () => {
      const id = sectorFromHash()
      if (id) setActiveId(id)
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = solutionSectors.length - 1
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null
    if (next === null) return
    e.preventDefault()
    setActiveId(solutionSectors[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative border-b border-steel-200 bg-steel-50 py-20 lg:py-28">
      {/* in-page targets for the sector links in the menus and search */}
      {solutionSectors.map((s) => (
        <span key={s.id} id={`solutions-${s.id}`} className="absolute top-0 block scroll-mt-0" aria-hidden="true" />
      ))}
      <Container>
        <Reveal>
          <SectionHeading
            id="solutions-title"
            title="Application Solutions"
            subtitle="Bearing solutions organised around automotive and industrial duty."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div role="tablist" aria-label="Application sectors" className="grid max-w-xl grid-cols-2 gap-2 sm:gap-3">
            {solutionSectors.map((s, i) => {
              const Icon = sectorIcon[s.id]
              const selected = s.id === activeId
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  id={`tab-${s.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(s.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`relative flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors sm:flex-row sm:items-center sm:gap-4 sm:p-5 ${
                    selected ? 'border-navy-900 bg-white shadow-tile' : 'border-steel-200 bg-white/60 hover:border-steel-300 hover:bg-white'
                  }`}
                >
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-md transition-colors sm:size-12 ${
                      selected ? 'bg-navy-900 text-white' : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-5 sm:size-6" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-navy-900 sm:text-lg">{s.tabLabel}</span>
                    <span className="hidden text-sm text-steel-600 sm:block">{s.items.length} solutions</span>
                  </span>
                  {selected && (
                    <m.span
                      layoutId="sector-tab-bar"
                      className="absolute inset-x-3 -bottom-px h-[3px] rounded-full bg-orange-500 sm:inset-x-5"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={sector.id}
            id={`panel-${sector.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${sector.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease }}
            className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
          >
            <SectorGallery sector={sector} />
            <SectorList sector={sector} />
          </m.div>
        </AnimatePresence>
      </Container>
    </section>
  )
}

function SectorGallery({ sector }: { sector: SolutionSector }) {
  return (
    <div className="flex flex-col gap-3">
      <figure className="relative aspect-[16/10] overflow-hidden rounded-lg bg-navy-900">
        <m.div
          className="h-full w-full"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease }}
        >
          <Photo
            name={sector.image}
            widths={[480, 800, 1280]}
            sizes="(min-width: 1240px) 680px, (min-width: 1024px) 56vw, 100vw"
            alt={sector.imageAlt}
          />
        </m.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
          <h3 className="text-2xl font-bold [font-stretch:85%] sm:text-3xl">{sector.title}</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-200 sm:text-base">{sector.intro}</p>
        </figcaption>
      </figure>
      <ul className={`grid gap-3 ${sector.thumbs.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
        {sector.thumbs.map((t, i) => (
          <m.li
            key={t.image}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease }}
            className="group relative aspect-[4/3] overflow-hidden rounded-md bg-navy-900"
          >
            <Photo
              name={t.image}
              widths={[320, 480]}
              sizes="(min-width: 1024px) 170px, (min-width: 640px) 24vw, 46vw"
              alt={t.alt}
              className="transition-transform duration-700 group-hover:scale-110"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent px-2.5 pt-6 pb-2 text-xs font-semibold text-white">
              {t.label}
            </span>
          </m.li>
        ))}
      </ul>
    </div>
  )
}

function SectorList({ sector }: { sector: SolutionSector }) {
  const { requestInterest } = useEnquiry()
  return (
    <div className="flex flex-col rounded-lg border border-steel-200 bg-white p-5 sm:p-7">
      <h3 className="text-lg font-bold text-navy-900">{sector.tabLabel} range</h3>
      <ul className="mt-4 flex-1 divide-y divide-steel-100">
        {sector.items.map((item, i) => (
          <m.li
            key={item}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.045, ease }}
            className="group flex items-start justify-between gap-4 py-3"
          >
            <span className="flex items-start gap-3">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-blue-700" strokeWidth={2} />
              <span className="text-[15px] leading-snug font-medium text-navy-900">{item}</span>
            </span>
            <EnquireLink
              interest={item}
              label={`Enquire about ${item}`}
              className="shrink-0 text-sm opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
            >
              Enquire
            </EnquireLink>
          </m.li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col gap-x-5 gap-y-3 border-t border-steel-200 pt-5 sm:flex-row sm:flex-wrap sm:items-center">
        <Button
          onClick={() => {
            requestInterest(sector.items[0])
            scrollToHash('#contact')
          }}
        >
          Discuss your {sector.tabLabel.toLowerCase()} application
        </Button>
        <a
          href={whatsappLink(`Hello Sarga Bharath Industries, I would like to discuss ${sector.tabLabel.toLowerCase()} bearings.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#15803d] hover:text-[#166534]"
        >
          <WhatsAppIcon className="size-[18px]" />
          WhatsApp us
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </div>
  )
}
