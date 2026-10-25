import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { company, whatsappLink } from '../../data/company'
import { EnquiryForm } from '../contact/EnquiryForm'
import { Container } from '../ui/Container'
import { ExternalLink } from '../ui/ExternalLink'
import { Reveal } from '../ui/Reveal'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-steel-200 bg-steel-100 py-20 lg:py-24">
      <Container>
        <Reveal className="grid shadow-sm lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="on-dark rounded-t-lg bg-navy-950 p-7 text-white sm:p-10 lg:rounded-l-lg lg:rounded-tr-none xl:p-12">
            <p className="text-sm font-semibold text-cyan-400">Bearing enquiries and quotes</p>
            <h2 id="contact-title" className="mt-3 text-[2rem] leading-[1.1] font-bold tracking-[-0.015em] sm:text-[2.35rem]">
              Looking for the Right Bearing?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-steel-300">
              Share your bearing type, size or part number and application with our team to discuss suitable options.
            </p>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center gap-4 rounded-lg bg-[#15803d] p-4 text-white transition-colors hover:bg-[#166534]"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/15">
                <WhatsAppIcon className="size-6" />
              </span>
              <span>
                <span className="block text-sm font-medium text-white/85">Chat with us on WhatsApp</span>
                <span className="block text-lg font-bold">{company.whatsapp.display}</span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>

            <dl className="mt-8 space-y-6 border-t border-white/15 pt-7">
              <Detail icon={Phone} term="Phone">
                <a href={company.phone.href} className="text-lg font-bold text-white hover:text-cyan-400">
                  {company.phone.display}
                </a>
              </Detail>
              <Detail icon={Mail} term="Email">
                <a href={company.email.href} className="text-sm font-semibold text-white hover:text-cyan-400">
                  {company.email.display}
                </a>
              </Detail>
              {company.offices.map((office) => (
                <Detail key={office.title} icon={MapPin} term={office.title}>
                  <address className="text-[13px] leading-relaxed text-steel-300 not-italic">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <ExternalLink href={office.mapUrl} className="mt-1.5 text-xs font-semibold text-cyan-400 hover:text-white">
                    Get directions
                  </ExternalLink>
                </Detail>
              ))}
            </dl>
          </div>

          <div className="rounded-b-lg border border-t-0 border-steel-200 bg-white p-6 sm:p-10 lg:rounded-r-lg lg:rounded-bl-none lg:border-t lg:border-l-0 xl:p-12">
            <div className="mb-5 border-b border-steel-100 pb-4">
              <h3 className="text-2xl leading-tight font-bold text-navy-900 [font-stretch:88%]">Request a Quote</h3>
              <p className="mt-1 text-sm text-steel-600">
                Include the bearing type or part number, quantity and where it will be used.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function Detail({ icon: Icon, term, children }: { icon: LucideIcon; term: string; children: ReactNode }) {
  return (
    <div className="relative pl-9">
      <dt className="text-sm text-steel-400">
        <Icon aria-hidden="true" className="absolute top-0.5 left-0 size-4 text-cyan-400" strokeWidth={1.75} />
        {term}
      </dt>
      <dd className="mt-1 text-[14px] leading-relaxed text-steel-200">{children}</dd>
    </div>
  )
}
