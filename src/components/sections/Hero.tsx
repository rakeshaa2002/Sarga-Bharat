import { AnimatePresence, m, type Variants } from 'framer-motion'
import { Car, CircleDot, Search, Sparkles } from 'lucide-react'
import { useId, useMemo, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useEnquiry } from '../../context/enquiry-context'
import { company, whatsappLink } from '../../data/company'
import { scrollToHash } from '../../lib/scroll'
import { searchCatalogue, type SearchEntry } from '../../lib/search'
import { BearingSpinner } from '../ui/BearingSpinner'
import { BrandMark } from '../ui/BrandLogo'
import { Button, ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const suggestions = [
  { label: 'Deep groove ball', target: '#bearing-deep-groove-ball' },
  { label: 'Tapered roller', target: '#bearing-tapered-roller' },
  { label: 'Wheel hub units', target: '#solutions-automotive' },
  { label: 'Electric motor', target: '#solutions-industrial' },
  { label: 'Insulated bearings', target: '#tech-electrically-insulated' },
]

const highlights = [
  { icon: CircleDot, title: 'Ball, roller & thrust', text: '10 bearing types, from deep groove to four-row' },
  { icon: Car, title: 'Application sectors', text: 'Automotive and industrial solutions' },
  { icon: Sparkles, title: 'Specialised technologies', text: 'Insulated, hybrid ceramic and sensor-integrated' },
]

const intro: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden border-b border-steel-200 bg-white">
      {/* Background imagery: subtle precision engineering gear train with blueprint gradient */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <picture>
          <source type="image/webp" srcSet="/images/photos/hero-bg-1280.webp 1280w, /images/photos/hero-bg.webp 1920w" />
          <img
            src="/images/photos/hero-bg.jpg"
            alt=""
            className="h-full w-full object-cover object-right-top opacity-20 mix-blend-multiply sm:opacity-25"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30" />
      </div>

      <div
        aria-hidden="true"
        className="drafting-grid pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[62%] [mask-image:linear-gradient(to_right,transparent,black_35%)] lg:block"
      />
      <Container className="relative z-10 grid items-center gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-12 lg:pt-14 lg:pb-20 xl:gap-16">
        <m.div variants={intro} initial="hidden" animate="show">
          <m.p
            variants={rise}
            className="inline-flex items-center gap-2.5 rounded-full border border-steel-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy-900 shadow-sm"
          >
            <span aria-hidden="true" className="flex h-3 w-4.5 flex-col overflow-hidden rounded-[2px] ring-1 ring-navy-900/10">
              <span className="flex-1 bg-[#ff9933]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#138808]" />
            </span>
            {company.tagline}
          </m.p>

          <m.h1
            variants={rise}
            id="hero-title"
            className="mt-5 text-[2.5rem] leading-[1.04] font-bold tracking-[-0.025em] text-navy-900 [font-stretch:80%] sm:text-[3.3rem] lg:text-[3.05rem] xl:text-[3.6rem]"
          >
            Precision Bearing Solutions for Automotive &amp; Industrial
          </m.h1>

          <m.p variants={rise} className="mt-5 max-w-[37rem] text-base leading-relaxed text-steel-600 sm:text-lg">
            From deep groove ball bearings to heavy-duty automotive and industrial assemblies, {company.shortName}{' '}
            Industries offers precision bearing solutions for vehicles and machinery, with Indian roots and a global
            outlook.
          </m.p>

          <m.div variants={rise} className="mt-7 max-w-[38rem]">
            <BearingSearch />
          </m.div>

          <m.div variants={rise} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ButtonLink href="#products" size="lg" variant="secondary">
              Explore Bearing Range
            </ButtonLink>
            <ButtonLink href="#contact" size="lg">
              Request a Quote
            </ButtonLink>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-2 py-2 text-[15px] font-semibold whitespace-nowrap text-[#15803d] transition-colors hover:text-[#166534]"
            >
              <WhatsAppIcon className="size-5" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </m.div>

          <m.ul variants={rise} className="mt-10 grid gap-5 border-t border-steel-200 pt-7 sm:grid-cols-3 lg:mt-12">
            {highlights.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded bg-blue-50 text-blue-700">
                  <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy-900">{title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-steel-600">{text}</span>
                </span>
              </li>
            ))}
          </m.ul>
        </m.div>

        <HeroDrawing />
      </Container>
    </section>
  )
}

/** Product search over the bearing range, sector solutions and technologies (ARIA combobox pattern). */
function BearingSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const listId = useId()
  const optionId = (i: number) => `${listId}-option-${i}`
  const results = useMemo(() => searchCatalogue(query), [query])
  const { requestInterest } = useEnquiry()
  const showList = open && query.trim().length > 0

  const choose = (entry: SearchEntry) => {
    setOpen(false)
    setQuery('')
    setActive(-1)
    scrollToHash(entry.target)
  }

  const askTeam = () => {
    requestInterest('Other / not sure yet', `I am looking for: ${query.trim()}`)
    setOpen(false)
    scrollToHash('#contact')
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (results[active]) choose(results[active])
    else if (results[0]) choose(results[0])
    else if (query.trim()) askTeam()
    else scrollToHash('#products')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActive(-1)
    }
  }

  return (
    <div className="relative">
      <form role="search" onSubmit={onSubmit} className="flex shadow-sm">
        <div className="relative flex-1">
          <label htmlFor={`${listId}-input`} className="sr-only">
            Search bearing types, applications or technologies
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-steel-400" />
          <input
            id={`${listId}-input`}
            type="text"
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={showList && results[active] ? optionId(active) : undefined}
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
              setActive(-1)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
            placeholder="Search bearing types, applications or technologies…"
            className="h-13 w-full rounded-l border border-r-0 border-steel-300 bg-white pr-4 pl-11 text-[15px] text-ink placeholder:text-steel-400 focus-visible:border-blue-600 focus-visible:outline-offset-0"
          />
        </div>
        <Button type="submit" className="h-13 rounded-l-none px-4 sm:px-6">
          <Search aria-hidden="true" className="size-4 sm:hidden" />
          <span className="sr-only sm:not-sr-only">Search</span>
        </Button>
      </form>

      <AnimatePresence>
        {showList && (
          <m.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute inset-x-0 top-full z-30 mt-1.5 overflow-hidden rounded border border-steel-200 bg-white shadow-raised"
          >
            {results.length > 0 ? (
              <ul id={listId} role="listbox" aria-label="Matching bearings and solutions" className="max-h-80 overflow-y-auto p-1.5">
                {results.map((entry, i) => (
                  <li
                    key={entry.id}
                    id={optionId(i)}
                    role="option"
                    aria-selected={i === active}
                    // mousedown keeps focus in the input so the list doesn't close before the choice registers
                    onMouseDown={(e) => {
                      e.preventDefault()
                      choose(entry)
                    }}
                    onMouseEnter={() => setActive(i)}
                    className={`flex cursor-pointer items-center justify-between gap-4 rounded-sm px-3 py-2.5 text-sm ${
                      i === active ? 'bg-blue-50 text-blue-700' : 'text-navy-900'
                    }`}
                  >
                    <span className="font-semibold">{entry.label}</span>
                    <span className="shrink-0 rounded-sm bg-steel-100 px-2 py-0.5 text-[11px] font-medium text-steel-600">
                      {entry.kind}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div id={listId} className="p-4 text-sm text-steel-600">
                <p>
                  No bearing or solution matches “<span className="font-semibold text-navy-900">{query.trim()}</span>”.
                </p>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault()
                    askTeam()
                  }}
                  className="mt-2 font-semibold text-blue-700 hover:text-navy-900"
                >
                  Ask our team about it
                </button>
              </div>
            )}
          </m.div>
        )}
      </AnimatePresence>
      <p aria-live="polite" className="sr-only">
        {showList ? (results.length ? `${results.length} results available` : 'No results') : ''}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-navy-900">Popular:</span>
        {suggestions.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => scrollToHash(s.target)}
            className="rounded-full border border-steel-200 bg-steel-50 px-3 py-1 font-medium text-navy-800 transition-colors hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const draw = { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const }

/** The hero photograph presented as an engineering drawing sheet with a rotating detail view. */
function HeroDrawing() {
  return (
    <figure className="relative">
      <div className="relative p-5 sm:p-6">
        <m.span aria-hidden="true" className="absolute inset-x-0 top-0 h-px origin-left bg-navy-900/35" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={draw} />
        <m.span aria-hidden="true" className="absolute inset-y-0 right-0 w-px origin-top bg-navy-900/35" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ ...draw, delay: 0.15 }} />
        <m.span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-right bg-navy-900/35" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ ...draw, delay: 0.3 }} />
        <m.span aria-hidden="true" className="absolute inset-y-0 left-0 w-px origin-bottom bg-navy-900/35" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ ...draw, delay: 0.45 }} />
        <ZoneMarkers />

        <div className="relative bg-white ring-1 ring-navy-900/30">
          <div className="aspect-[4/3] overflow-hidden bg-steel-100 sm:aspect-[16/10] lg:aspect-square">
            <m.picture
              className="block h-full w-full"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <source
                media="(min-width: 1024px)"
                type="image/webp"
                srcSet="/images/photos/hero-precision-bearings-square-640.webp 640w, /images/photos/hero-precision-bearings-square-1000.webp 1000w"
                sizes="(min-width: 1280px) 500px, 42vw"
              />
              <img
                src="/images/photos/hero-precision-bearings-800.webp"
                srcSet="/images/photos/hero-precision-bearings-800.webp 800w, /images/photos/hero-precision-bearings-1280.webp 1280w"
                sizes="100vw"
                alt="High-precision industrial ball bearings and tapered roller bearings with technical drafting schematics"
                width={1024}
                height={1024}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </m.picture>
          </div>
          <TitleBlock />
        </div>
      </div>

      {/* rotating detail view, like the enlarged detail on a drawing sheet */}
      <m.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-3 right-2 flex flex-col items-center sm:-top-6 sm:-right-4"
      >
        <span className="grid size-24 place-items-center rounded-full bg-white shadow-raised ring-1 ring-navy-900/25 sm:size-36">
          <BearingSpinner className="size-20 sm:size-30" />
        </span>
        <span className="mt-1.5 rounded-sm bg-white/90 px-1.5 text-[10px] font-medium tracking-wide text-steel-600">Detail A</span>
      </m.div>
    </figure>
  )
}

function ZoneMarkers() {
  const marker = 'text-[9px] font-medium tracking-wider text-steel-600 uppercase select-none'
  return (
    <>
      <div aria-hidden="true" className="absolute inset-x-6 top-1.5 flex justify-between">
        <span className={marker}>Zone A</span>
        <span className={marker}>Bearing range</span>
        <span className={`${marker} invisible sm:visible`}>Zone B</span>
      </div>
      <div aria-hidden="true" className="absolute inset-y-6 left-1.5 flex flex-col justify-between">
        <span className={marker}>1</span>
        <span className={marker}>2</span>
      </div>
      <div aria-hidden="true" className="absolute inset-y-6 right-1.5 flex flex-col justify-between">
        <span className={marker}>3</span>
        <span className={marker}>4</span>
      </div>
      <div aria-hidden="true" className="absolute inset-x-6 bottom-1.5 flex justify-between">
        <span className={marker}>Ref: SBI-IND-2026</span>
        <span className={marker}>{company.tagline}</span>
      </div>
    </>
  )
}

function TitleBlock() {
  const cell = 'p-3 text-left sm:px-4'
  const key = 'block text-[10px] font-medium tracking-wider text-steel-600 uppercase'
  return (
    <m.figcaption
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="border-t border-navy-900/30 bg-white"
    >
      <span className="sr-only">Company details: </span>
      <div className="grid border-b border-navy-900/25 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className={`flex items-center gap-3 border-b border-navy-900/25 sm:border-r sm:border-b-0 ${cell}`}>
          <BrandMark className="h-8 w-auto shrink-0" />
          <span className="min-w-0">
            <span className="block text-[14px] leading-tight font-bold text-navy-900">{company.name}</span>
            <span className="mt-0.5 block text-[11px] text-steel-600">{company.location}, India</span>
          </span>
        </div>
        <dl className={cell}>
          <dt className={key}>WhatsApp</dt>
          <dd className="mt-1 text-[13px] font-semibold whitespace-nowrap">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-[#15803d] hover:text-navy-900">
              {company.whatsapp.display}
            </a>
          </dd>
        </dl>
      </div>
      <dl className="grid grid-cols-2">
        <div className={`border-r border-navy-900/25 ${cell}`}>
          <dt className={key}>Bearing range</dt>
          <dd className="mt-1 text-xs leading-snug text-steel-600">Ball, roller, thrust and four-row bearings</dd>
        </div>
        <div className={cell}>
          <dt className={key}>Sectors</dt>
          <dd className="mt-1 text-xs leading-snug text-steel-600">Automotive and industrial</dd>
        </div>
      </dl>
    </m.figcaption>
  )
}
