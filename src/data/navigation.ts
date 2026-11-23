import { bearingPath, routes, sectorPath, technologyPath } from '../lib/routes'
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
  /** shown as an accordion in the mobile menu */
  children?: NavLink[]
  isMegaMenu?: boolean
}

/** The Products mega menu: the full portfolio, one column per group. */
export const productMegaMenu: MegaGroup[] = [
  {
    title: 'Bearing Products',
    href: routes.products,
    links: bearingProducts.map((b) => ({ label: b.name, href: bearingPath(b.id) })),
  },
  ...solutionSectors.map((s) => ({
    title: s.title,
    href: sectorPath(s.id),
    links: s.items.map((item) => ({ label: item, href: sectorPath(s.id) })),
  })),
  {
    title: 'Specialised Technologies',
    href: routes.technologies,
    links: technologies.map((t) => ({ label: t.name, href: technologyPath(t.id) })),
  },
]

export const navigation: NavItem[] = [
  { label: 'Home', href: routes.home },
  {
    label: 'Products',
    href: routes.products,
    isMegaMenu: true,
    children: [
      { label: 'All bearing products', href: routes.products },
      ...bearingProducts.map((b) => ({ label: b.name, href: bearingPath(b.id) })),
    ],
  },
  {
    label: 'Solutions',
    href: routes.solutions,
    children: solutionSectors.map((s) => ({ label: s.tabLabel, href: sectorPath(s.id) })),
  },
  { label: 'Technologies', href: routes.technologies },
  { label: 'About Us', href: routes.about },
  { label: 'Contact', href: routes.contact },
]

/** True when `pathname` belongs to the nav item (Home only matches exactly). */
export const isActive = (item: NavLink, pathname: string) =>
  item.href === '/' ? pathname === '/' : pathname === item.href || pathname.startsWith(item.href + '/')
