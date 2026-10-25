import { AnimatePresence, m } from 'framer-motion'
import { useState } from 'react'
import { bearingFamilies, bearingProducts, licenseUrls, type BearingFamily } from '../../data/bearings'
import { BearingSectionDrawing } from '../ui/BearingSectionDrawing'
import { Container } from '../ui/Container'
import { EnquireLink } from '../ui/EnquireLink'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

const familyName: Record<BearingFamily, string> = { ball: 'Ball bearing', roller: 'Roller bearing', thrust: 'Thrust bearing' }

export function BearingRange() {
  const [family, setFamily] = useState<BearingFamily | 'all'>('all')
  const shown = family === 'all' ? bearingProducts : bearingProducts.filter((b) => b.family === family)
  const count = (id: BearingFamily | 'all') => (id === 'all' ? bearingProducts.length : bearingProducts.filter((b) => b.family === id).length)

  return (
    <section id="products" aria-labelledby="products-title" className="border-b border-steel-200 bg-white py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="products-title"
            title="Bearing Products"
            subtitle="Ball, roller and thrust bearings for radial, axial and combined loads, shown in section."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div role="group" aria-label="Filter bearing types" className="inline-flex flex-wrap gap-1 rounded-lg border border-steel-200 bg-steel-50 p-1">
            {bearingFamilies.map((f) => {
              const selected = family === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFamily(f.id)}
                  className={`relative rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                    selected ? 'text-white' : 'text-navy-900 hover:text-blue-700'
                  }`}
                >
                  {selected && (
                    <m.span
                      layoutId="bearing-filter-pill"
                      className="absolute inset-0 rounded-md bg-navy-900 shadow-sm"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {f.label} <span className={selected ? 'text-steel-300' : 'text-steel-400'}>{count(f.id)}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>
        <p aria-live="polite" className="sr-only">
          Showing {shown.length} bearing types
        </p>

        <m.ul layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((b, i) => (
              <m.li
                key={b.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <m.article
                  id={`bearing-${b.id}`}
                  data-highlight
                  aria-labelledby={`bearing-${b.id}-title`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                  transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full scroll-mt-4 flex-col rounded-lg border border-steel-200 bg-white transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-blue-600/50 hover:shadow-raised"
                >
                  <div className="relative aspect-[5/4] overflow-hidden rounded-t-lg border-b border-steel-200 bg-white">
                    <img
                      src={`/images/bearings/${b.id}-600.webp`}
                      srcSet={`/images/bearings/${b.id}-300.webp 300w, /images/bearings/${b.id}-600.webp 600w`}
                      sizes="(min-width: 1280px) 220px, (min-width: 1024px) 23vw, (min-width: 640px) 46vw, 92vw"
                      alt={b.imageAlt}
                      width={600}
                      height={480}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                    />
                    <span className="absolute top-3 left-3 rounded-sm bg-white px-2 py-0.5 text-[11px] font-semibold text-blue-700 ring-1 ring-steel-200">
                      {familyName[b.family]}
                    </span>
                    {/* the catalogue half-section, kept as a small technical inset */}
                    <span className="drafting-grid absolute right-2.5 bottom-2.5 w-[76px] rounded-md bg-steel-50/95 p-1 shadow-sm ring-1 ring-steel-200 transition-transform duration-300 group-hover:scale-110 sm:w-[84px]">
                      <BearingSectionDrawing type={b.section} className="h-auto w-full" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 id={`bearing-${b.id}-title`} className="text-[17px] leading-snug font-bold text-navy-900">
                      {b.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-steel-600">{b.summary}</p>
                    <div className="mt-5 border-t border-steel-200 pt-4 text-sm">
                      <EnquireLink interest={b.name} label={`Enquire now about ${b.name}`}>
                        Enquire now
                      </EnquireLink>
                    </div>
                  </div>
                </m.article>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>

        <Reveal className="mt-8 space-y-2 text-sm text-steel-600">
          <p>
            Sizes, series, seals, cages and internal clearances are confirmed on enquiry. Images are representative
            renders of each bearing type; the inset drawings are schematic half-sections.
          </p>
          <details className="group/credits">
            <summary className="cursor-pointer font-medium text-navy-900 marker:text-steel-400 hover:text-blue-700">
              Image credits
            </summary>
            <ul className="mt-2 space-y-1 text-[13px]">
              {bearingProducts.map((b) => {
                const { author, license, page } = b.imageCredit
                const licenseUrl = licenseUrls[license]
                return (
                  <li key={b.id}>
                    {b.name}:{' '}
                    {page ? (
                      <a href={page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-blue-700">
                        {author}, Wikimedia Commons
                      </a>
                    ) : (
                      author
                    )}
                    {licenseUrl ? (
                      <>
                        {', '}
                        <a href={licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-blue-700">
                          {license}
                        </a>
                      </>
                    ) : (
                      `, ${license.toLowerCase()}`
                    )}
                  </li>
                )
              })}
            </ul>
          </details>
        </Reveal>
      </Container>
    </section>
  )
}
