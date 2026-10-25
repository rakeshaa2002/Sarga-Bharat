import { AnimatePresence, m } from 'framer-motion'
import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { company, whatsappLink } from '../../data/company'
import { navigation, productMegaMenu, type NavItem } from '../../data/navigation'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { scrollToHash } from '../../lib/scroll'
import { BrandLogo } from '../ui/BrandLogo'
import { ButtonLink } from '../ui/Button'
import { Container } from '../ui/Container'
import { WhatsAppIcon } from '../ui/WhatsAppButton'

const sectionIds = navigation.map((n) => n.section)

export function Header() {
  const scrolled = useScrolled(40)
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeMenu = useCallback((returnFocus: boolean) => {
    setMenuOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [])

  return (
    <>
      <UtilityBar />
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[box-shadow,border-color] duration-200 ${
          scrolled || menuOpen ? 'border-steel-200 shadow-[0_10px_30px_-22px_rgb(11_37_69/0.45)]' : 'border-steel-200/60'
        }`}
      >
        {/* relative: the Products mega menu spans the full container width */}
        <Container className="relative flex h-16 items-center justify-between gap-4 lg:h-[76px]">
          <a
            href="#home"
            className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            aria-label={`${company.name} — Home`}
          >
            <BrandLogo />
          </a>

          {/* The full desktop nav needs xl width alongside the logo lockup; below that the menu button takes over */}
          <nav aria-label="Main navigation" className="hidden xl:block">
            <ul className="flex items-center">
              {navigation.map((item) => (
                <DesktopNavItem key={item.href} item={item} active={active === item.section} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* On phones the logo needs the width; the quote button is in the menu and the hero */}
            <span className="hidden sm:block">
              <ButtonLink href="#contact" className="h-11 px-5 text-[15px] font-semibold shadow-sm">
                Request a Quote
              </ButtonLink>
            </span>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-11 place-items-center rounded text-navy-900 hover:bg-steel-100 xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X aria-hidden="true" className="size-6" /> : <Menu aria-hidden="true" className="size-6" />}
            </button>
          </div>
        </Container>

        <MobileMenu open={menuOpen} active={active} headerRef={headerRef} onClose={closeMenu} />
      </header>
    </>
  )
}

function UtilityBar() {
  return (
    <div className="on-dark hidden border-b border-navy-800 bg-navy-950 text-[13px] text-steel-300 md:block">
      <Container className="flex h-9 items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-xs font-medium tracking-wide text-steel-300">
          <span className="flex items-center gap-1.5 text-steel-200">
            <MapPin aria-hidden="true" className="size-3.5 text-cyan-400" />
            <span>Office: {company.location}</span>
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-white/20" />
          <span className="hidden text-steel-400 lg:inline">Automotive &amp; Industrial Bearing Solutions</span>
        </div>
        <div className="flex items-center gap-5 text-xs">
          <a
            href={company.email.href}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-cyan-400"
          >
            <Mail aria-hidden="true" className="size-3.5 text-cyan-400" />
            <span>{company.email.display}</span>
          </a>
          <span aria-hidden="true" className="h-3 w-px bg-white/20" />
          <a
            href={company.phone.href}
            className="inline-flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-cyan-400"
          >
            <Phone aria-hidden="true" className="size-3.5 text-cyan-400" />
            <span>{company.phone.display}</span>
          </a>
          <span aria-hidden="true" className="h-3 w-px bg-white/20" />
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#4ade80] transition-colors hover:text-white"
          >
            <WhatsAppIcon className="size-3.5" />
            <span>WhatsApp {company.whatsapp.display}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </Container>
    </div>
  )
}

function NavAnchor({
  href,
  active,
  hasSubmenu = false,
  children,
}: {
  href: string
  active: boolean
  hasSubmenu?: boolean
  children: ReactNode
}) {
  return (
    <a
      href={href}
      aria-current={active ? 'location' : undefined}
      className={`group relative inline-flex h-11 items-center pl-3 text-[15px] font-medium transition-colors hover:text-blue-700 xl:pl-3.5 ${
        hasSubmenu ? 'pr-1' : 'pr-3 xl:pr-3.5'
      } ${active ? 'text-blue-700' : 'text-navy-900'}`}
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute bottom-1 left-3 h-0.5 origin-left bg-current transition-transform duration-200 xl:left-3.5 ${
          hasSubmenu ? 'right-1' : 'right-3 xl:right-3.5'
        } ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
      />
    </a>
  )
}

function DesktopNavItem({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const openedByHover = useRef(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  if (!item.children && !item.isMegaMenu) {
    return (
      <li>
        <NavAnchor href={item.href} active={active}>
          {item.label}
        </NavAnchor>
      </li>
    )
  }

  const openNow = () => {
    window.clearTimeout(closeTimer.current)
    if (!open) openedByHover.current = true
    setOpen(true)
  }
  const closeSoon = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 160)
  }
  const toggle = () => {
    if (open && openedByHover.current) {
      openedByHover.current = false
      return
    }
    openedByHover.current = false
    setOpen(!open)
  }
  // in-page jump that also highlights the target and switches the sector tab when needed
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    scrollToHash(href)
  }

  return (
    <li
      ref={itemRef}
      // the mega menu positions against the header container, so its item must not be a containing block
      className={item.isMegaMenu ? 'static' : 'relative'}
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
      onBlur={(e) => {
        if (!itemRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          setOpen(false)
          buttonRef.current?.focus()
        }
      }}
    >
      <div className="flex items-center">
        <NavAnchor href={item.href} active={active} hasSubmenu>
          {item.label}
        </NavAnchor>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`Show ${item.label.toLowerCase()} menu`}
          onClick={toggle}
          className="mr-1 grid size-8 place-items-center rounded-sm text-navy-900/60 transition-colors hover:bg-steel-100 hover:text-blue-700"
        >
          <ChevronDown
            aria-hidden="true"
            className={`size-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && item.isMegaMenu && (
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute inset-x-4 top-full z-50 pt-1 sm:inset-x-6 lg:inset-x-8"
          >
            <div className="rounded-lg border border-steel-200 bg-white p-6 shadow-raised">
              <div className="grid grid-cols-4 gap-6">
                {productMegaMenu.map((group, gi) => (
                  <m.div
                    key={group.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: gi * 0.04, ease: 'easeOut' }}
                  >
                    <a
                      href={group.href}
                      onClick={(e) => go(e, group.href)}
                      className="block border-b border-steel-200 pb-2 text-[13px] font-bold text-navy-900 transition-colors hover:text-blue-700"
                    >
                      {group.title}
                    </a>
                    <ul className="mt-2.5 space-y-0.5">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={(e) => go(e, link.href)}
                            className="block rounded-sm px-1.5 py-1 text-[13px] leading-snug text-steel-600 transition-colors hover:bg-steel-50 hover:text-blue-700"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </m.div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-steel-200 pt-4 text-sm">
                <a
                  href="#products"
                  onClick={(e) => go(e, '#products')}
                  className="inline-flex items-center gap-1.5 font-semibold text-blue-700 hover:text-navy-900"
                >
                  Explore the bearing range <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-[#15803d] hover:text-[#166534]"
                >
                  <WhatsAppIcon className="size-4" />
                  Ask on WhatsApp: {company.whatsapp.display}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </m.div>
        )}

        {open && !item.isMegaMenu && item.children && (
          <m.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="absolute top-full left-0 z-50 pt-2"
          >
            <div className="w-[260px] rounded-lg border border-steel-200 bg-white p-2 shadow-raised">
              <ul>
                {item.children.map((child) => (
                  <li key={child.href}>
                    <a
                      href={child.href}
                      onClick={(e) => go(e, child.href)}
                      className="block rounded-sm px-3 py-2 text-[14px] leading-snug text-ink transition-colors hover:bg-steel-50 hover:text-blue-700"
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}

interface MobileMenuProps {
  open: boolean
  active: string
  headerRef: RefObject<HTMLElement | null>
  onClose: (returnFocus: boolean) => void
}

function MobileMenu({ open, active, headerRef, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(64)

  useEffect(() => {
    if (!open) return
    setTop(headerRef.current?.getBoundingClientRect().bottom ?? 64)

    const root = document.documentElement
    const background = ['main', 'site-footer'].map((id) => document.getElementById(id))
    root.style.overflow = 'hidden'
    background.forEach((el) => el?.setAttribute('inert', ''))
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose(true)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) onClose(false)
    }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      root.style.overflow = ''
      background.forEach((el) => el?.removeAttribute('inert'))
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open, onClose, headerRef])

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    onClose(false)
    requestAnimationFrame(() => scrollToHash(href))
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ height: `calc(100dvh - ${top}px)` }}
          className="absolute inset-x-0 top-full overflow-y-auto overscroll-contain border-t border-steel-200 bg-white xl:hidden"
        >
          <div className="flex items-center justify-between gap-3 border-b border-steel-200 bg-steel-50 p-4 text-xs text-steel-600 sm:px-6">
            <span>Office: {company.location}</span>
            <span className="font-semibold text-blue-700">{company.tagline}</span>
          </div>
          <nav aria-label="Main">
            <ul className="divide-y divide-steel-200 border-b border-steel-200 px-4 sm:px-6">
              {navigation.map((item) => (
                <MobileNavItem key={item.href} item={item} active={active === item.section} onNavigate={go} />
              ))}
            </ul>
          </nav>
          <div className="space-y-3 px-4 py-6 sm:px-6">
            <ButtonLink href="#contact" size="lg" className="w-full text-center" onClick={(e) => go(e, '#contact')}>
              Request a Quote
            </ButtonLink>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded bg-[#15803d] font-semibold text-white transition-colors hover:bg-[#166534]"
            >
              <WhatsAppIcon className="size-5" />
              WhatsApp {company.whatsapp.display}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={company.phone.href}
              className="flex h-12 items-center justify-center gap-2 rounded border border-steel-200 font-semibold text-navy-900"
            >
              <Phone aria-hidden="true" className="size-4" />
              Call {company.phone.display}
            </a>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

function MobileNavItem({
  item,
  active,
  onNavigate,
}: {
  item: NavItem
  active: boolean
  onNavigate: (e: MouseEvent<HTMLAnchorElement>, href: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()

  return (
    <li>
      <div className="flex items-center justify-between">
        <a
          href={item.href}
          aria-current={active ? 'location' : undefined}
          onClick={(e) => onNavigate(e, item.href)}
          className={`flex-1 py-4 text-[17px] font-semibold ${active ? 'text-blue-700' : 'text-navy-900'}`}
        >
          {item.label}
        </a>
        {item.children && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={listId}
            aria-label={`Show ${item.label.toLowerCase()} links`}
            onClick={() => setExpanded((x) => !x)}
            className="grid size-11 place-items-center rounded text-navy-900/70"
          >
            <ChevronDown
              aria-hidden="true"
              className={`size-5 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {item.children && expanded && (
          <m.ul
            id={listId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            {item.children.map((child) => (
              <li key={child.href}>
                <a
                  href={child.href}
                  onClick={(e) => onNavigate(e, child.href)}
                  className="block border-l-2 border-steel-200 py-2.5 pl-4 text-[15px] text-steel-600 hover:border-blue-700 hover:text-blue-700"
                >
                  {child.label}
                </a>
              </li>
            ))}
            <li className="h-3" aria-hidden="true" />
          </m.ul>
        )}
      </AnimatePresence>
    </li>
  )
}
