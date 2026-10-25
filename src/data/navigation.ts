import { bearingProducts, solutionSectors, technologies } from './bearings'

export interface NavLink {
  label: string
  href: string
}

export interface MegaGroup {
  title: string
  href: string
  links: NavLink[]
}

export interface NavItem extends NavLink {
  /** id of the page section this item points to, used for active-state highlighting */
  section: string
  /** shown as an accordion in the mobile menu */
  children?: NavLink[]
  isMegaMenu?: boolean
}

/** The Products mega menu: the full portfolio in five columns. */
export const productMegaMenu: MegaGroup[] = [
  {
    title: 'Bearing Products',
    href: '#products',
    links: bearingProducts.map((b) => ({ label: b.name, href: `#bearing-${b.id}` })),
  },
  ...solutionSectors.map((s) => ({
    title: s.title,
    href: `#solutions-${s.id}`,
    links: s.items.map((item) => ({ label: item, href: `#solutions-${s.id}` })),
  })),
  {
    title: 'Specialised Technologies',
    href: '#technologies',
    links: technologies.map((t) => ({ label: t.name, href: `#tech-${t.id}` })),
  },
]

export const navigation: NavItem[] = [
  { label: 'Home', href: '#home', section: 'home' },
  {
    label: 'Products',
    href: '#products',
    section: 'products',
    isMegaMenu: true,
    children: productMegaMenu.map((g) => ({ label: g.title, href: g.href })),
  },
  {
    label: 'Solutions',
    href: '#solutions',
    section: 'solutions',
    children: solutionSectors.map((s) => ({ label: s.tabLabel, href: `#solutions-${s.id}` })),
  },
  { label: 'Technologies', href: '#technologies', section: 'technologies' },
  { label: 'About Us', href: '#about', section: 'about' },
  { label: 'Contact', href: '#contact', section: 'contact' },
]
