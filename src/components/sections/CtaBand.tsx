import { company, whatsappLink } from '../../data/company'
import { routes } from '../../lib/routes'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

/** Closing call to action used at the foot of most pages. */
export function CtaBand({ title = 'Need bearings anywhere in India?' }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="on-dark bg-navy-900 py-16 text-white lg:py-20">
      <Container>
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 id="cta-title" className="text-[1.9rem] leading-tight font-bold [font-stretch:85%] sm:text-[2.3rem]">
              {title}
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-steel-300">
              Share the bearing type, size or part number and our {company.location} team will help with your requirement.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={routes.contact} size="lg">
              Request a Quote
            </ButtonLink>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded bg-[#15803d] px-7 font-semibold text-white transition-colors hover:bg-[#166534]"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp {company.whatsapp.display}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
