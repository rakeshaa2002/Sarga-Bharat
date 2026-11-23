import { m } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { PageHeader } from '../components/layout/PageHeader'
import { CtaBand } from '../components/sections/CtaBand'
import { BearingSectionDrawing } from '../components/ui/BearingSectionDrawing'
import { ButtonLink } from '../components/ui/Button'
import { Container } from '../components/ui/Container'
import { Reveal } from '../components/ui/Reveal'
import { WhatsAppIcon } from '../components/ui/WhatsAppButton'
import { useEnquiry } from '../context/enquiry-context'
import { bearingProducts, licenseUrls, solutionSectors, type BearingFamily } from '../data/bearings'
import { company, whatsappLink } from '../data/company'
import { ease, inViewStagger, staggerItem } from '../lib/motion'
import { bearingPath, routes, sectorPath } from '../lib/routes'
import { NotFoundPage } from './NotFoundPage'

const familyName: Record<BearingFamily, string> = { ball: 'Ball bearing', roller: 'Roller bearing', thrust: 'Thrust bearing' }

export function BearingDetailPage() {
  const { id } = useParams()
  const { requestInterest } = useEnquiry()
  const bearing = bearingProducts.find((b) => b.id === id)
  if (!bearing) return <NotFoundPage />

  // same family first, then the rest of the range
  const related = [
    ...bearingProducts.filter((b) => b.family === bearing.family && b.id !== bearing.id),
    ...bearingProducts.filter((b) => b.family !== bearing.family),
  ].slice(0, 4)
  const { author, license, page } = bearing.imageCredit

  return (
    <>
      <PageHeader
        title={bearing.name}
        subtitle={bearing.summary}
        crumbs={[{ label: 'Products', to: routes.products }, { label: bearing.name }]}
      />

      <section className="border-b border-steel-200 bg-white py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
          <m.figure
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="relative overflow-hidden rounded-lg border border-steel-200 bg-white"
          >
            <img
              src={`/images/bearings/${bearing.id}-600.webp`}
              srcSet={`/images/bearings/${bearing.id}-300.webp 300w, /images/bearings/${bearing.id}-600.webp 600w`}
              sizes="(min-width: 1024px) 640px, 100vw"
              alt={bearing.imageAlt}
              width={600}
              height={480}
              fetchPriority="high"
              className="aspect-[5/4] w-full object-contain"
            />
            <span className="absolute top-4 left-4 rounded-sm bg-white px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-steel-200">
              {familyName[bearing.family]}
            </span>
            <figcaption className="border-t border-steel-200 px-4 py-2.5 text-xs text-steel-600">
              Image:{' '}
              {page ? (
                <a href={page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-blue-700">
                  {author}, Wikimedia Commons
                </a>
              ) : (
                author
              )}
              {licenseUrls[license] ? (
                <>
                  ,{' '}
                  <a href={licenseUrls[license]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-blue-700">
                    {license}
                  </a>
                </>
              ) : null}
              . Representative render of the bearing type.
            </figcaption>
          </m.figure>

          <m.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease }}>
            <div className="drafting-grid group rounded-lg border border-steel-200 bg-steel-50 p-6">
              <p className="text-sm font-semibold text-navy-900">Section view</p>
              <BearingSectionDrawing type={bearing.section} title={`Half-section drawing of ${bearing.name}`} className="mx-auto mt-3 h-auto w-full max-w-[300px]" />
              <p className="mt-3 text-xs text-steel-600">Schematic half-section: rings hatched, rolling elements highlighted.</p>
            </div>

            <h2 className="mt-8 text-xl font-bold text-navy-900">Supply across India</h2>
            <ul className="mt-4 space-y-3 text-[15px] text-steel-600">
              {[
                `${bearing.name} for automotive and industrial applications`,
                'Sizes, series, seals, cages and clearances confirmed on enquiry',
                `Enquiries handled by our ${company.location} team for customers across India`,
              ].map((point) => (
                <li key={point} className="flex gap-3">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-[18px] shrink-0 text-blue-700" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink to={routes.contact} size="lg" onClick={() => requestInterest(bearing.name)}>
                Request a Quote
              </ButtonLink>
              <a
                href={whatsappLink(`Hello Sarga Bharath Industries, I would like a quote for ${bearing.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-13 items-center justify-center gap-2 rounded bg-[#15803d] px-6 font-semibold text-white transition-colors hover:bg-[#166534]"
              >
                <WhatsAppIcon className="size-5" />
                Ask on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>

            <p className="mt-8 text-sm text-steel-600">
              Used across{' '}
              {solutionSectors.map((s, i) => (
                <span key={s.id}>
                  {i > 0 && (i === solutionSectors.length - 1 ? ' and ' : ', ')}
                  <Link to={sectorPath(s.id)} className="font-semibold text-blue-700 underline-offset-4 hover:underline">
                    {s.tabLabel.toLowerCase()}
                  </Link>
                </span>
              ))}{' '}
              applications.
            </p>
          </m.div>
        </Container>
      </section>

      <section aria-labelledby="related-title" className="bg-steel-50 py-16 lg:py-20">
        <Container>
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related-title" className="text-2xl font-bold text-navy-900 sm:text-3xl">
              Related bearings
            </h2>
            <Link to={routes.products} className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-navy-900">
              All bearing types <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
          <m.ul {...inViewStagger} className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((b) => (
              <m.li key={b.id} variants={staggerItem}>
                <Link
                  to={bearingPath(b.id)}
                  className="group block h-full overflow-hidden rounded-lg border border-steel-200 bg-white transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-blue-600/50 hover:shadow-raised"
                >
                  <img
                    src={`/images/bearings/${b.id}-300.webp`}
                    alt=""
                    width={300}
                    height={240}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="block border-t border-steel-200 p-4 text-[15px] leading-snug font-bold text-navy-900 group-hover:text-blue-700">
                    {b.name}
                  </span>
                </Link>
              </m.li>
            ))}
          </m.ul>
        </Container>
      </section>

      <CtaBand title={`Looking for ${bearing.name.toLowerCase()}?`} />
    </>
  )
}
