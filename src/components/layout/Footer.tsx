import type { ReactNode } from 'react'
import { bearingProducts, solutionSectors, technologies } from '../../data/bearings'
import { company, whatsappLink } from '../../data/company'
import { navigation } from '../../data/navigation'
import { BrandLogo } from '../ui/BrandLogo'
import { Container } from '../ui/Container'
import { ExternalLink } from '../ui/ExternalLink'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer id="site-footer" className="on-dark bg-navy-950 text-steel-300">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1.1fr_1.1fr_1.3fr] lg:gap-10 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          {/* the full logo already carries the company name and both taglines */}
          <BrandLogo variant="dark" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Bearing solutions for automotive and industrial applications, from {company.location}.
          </p>
          <p className="mt-4 text-sm font-semibold text-white">{company.philosophy}</p>
        </div>

        <FooterColumn title="Quick links">
          {navigation.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Bearing products">
          {bearingProducts.map((b) => (
            <FooterLink key={b.id} href={`#bearing-${b.id}`}>
              {b.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Solutions">
          {solutionSectors.map((s) => (
            <FooterLink key={s.id} href={`#solutions-${s.id}`}>
              {s.title}
            </FooterLink>
          ))}
          <li className="pt-3 text-[15px] font-semibold text-white">Technologies</li>
          {technologies.map((t) => (
            <FooterLink key={t.id} href={`#tech-${t.id}`}>
              {t.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <div>
          <h2 className="text-[15px] font-semibold text-white">Location &amp; contact</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed">
            {company.offices.map((office) => (
              <div key={office.title}>
                <p className="font-medium text-white/95">{office.title}</p>
                <address className="mt-1 space-y-0.5 text-steel-400 not-italic">
                  {office.lines.map((line) => (
                    <span key={line} className="block text-[13px]">
                      {line}
                    </span>
                  ))}
                </address>
                <ExternalLink href={office.mapUrl} className="mt-1 text-[13px] text-cyan-400 hover:text-white">
                  Get directions
                </ExternalLink>
              </div>
            ))}
          </div>
          <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-sm">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-[#4ade80] hover:text-white"
              >
                <WhatsAppIcon className="size-4" />
                {company.whatsapp.display}
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={company.phone.href} className="font-semibold text-white hover:text-cyan-400">
                <span className="sr-only">Call </span>
                {company.phone.display}
              </a>
            </li>
            <li>
              <a href={company.email.href} className="text-steel-300 hover:text-cyan-400">
                {company.email.display}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-[13px] text-steel-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name} All rights reserved.
          </p>
          <p>{company.tagline}</p>
          <a href="#home" className="hover:text-white">
            Back to top
          </a>
        </Container>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <nav aria-label={`Footer ${title.toLowerCase()}`}>
      <h2 className="text-[15px] font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </nav>
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <a href={href} className="transition-colors hover:text-white">
        {children}
      </a>
    </li>
  )
}
