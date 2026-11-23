import { bearingProducts, solutionSectors } from '../data/bearings'
import { bearingPath, routes, sectorPath } from './routes'

/**
 * Page titles and descriptions. Search targeting: buyers across India, with Bengaluru (Bangalore) as the
 * company's base, e.g. "bearing supplier in India", "automotive bearings India", "bearings Bengaluru".
 * Used by the in-app <Seo> component and by scripts/prerender.mjs, which writes them into static HTML.
 */

/** Public site address; override with VITE_SITE_URL in .env when a custom domain is added. */
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://sarga-bharat.vercel.app').replace(/\/$/, '')

export interface PageMeta {
  path: string
  title: string
  description: string
  /** breadcrumb trail for structured data (home is added automatically) */
  crumbs?: { name: string; path: string }[]
}

const sectorMeta: Record<string, { title: string; description: string }> = {
  automotive: {
    title: 'Automotive Bearings Supplier in India | Wheel Hub & Tapered Roller Bearings',
    description:
      'Automotive bearings for two-wheelers, cars, commercial vehicles, tractors and EVs: wheel bearings and hub units, tapered roller assemblies, clutch release and water pump bearings. Sarga Bharath Industries, Bengaluru, supplying across India.',
  },
  industrial: {
    title: 'Industrial Bearings Supplier in India | Motor, Gearbox & Conveyor Bearings',
    description:
      'Industrial bearings for electric motors, gearboxes, conveyors, vibrating screens and heavy equipment, plus mounted bearing units. Sarga Bharath Industries, Bengaluru, supplying plants across India.',
  },
}

export const pages: PageMeta[] = [
  {
    path: routes.home,
    title: 'Bearing Supplier in India | Sarga Bharath Industries, Bengaluru',
    description:
      'Sarga Bharath Industries, Bengaluru: ball, roller and thrust bearings, automotive and industrial bearing solutions and specialised bearing technologies, supplied across India. Request a quote on WhatsApp.',
  },
  {
    path: routes.products,
    title: 'Bearings in India: Ball, Roller & Thrust Bearings | Sarga Bharath',
    description:
      'Deep groove, angular contact, self-aligning, cylindrical, spherical, tapered, needle, thrust and four-row bearings from Sarga Bharath Industries, Bengaluru. Enquire for supply anywhere in India.',
    crumbs: [{ name: 'Products', path: routes.products }],
  },
  ...bearingProducts.map((b) => ({
    path: bearingPath(b.id),
    title: `${b.name} Supplier in India | Sarga Bharath, Bengaluru`,
    description: `${b.name}: ${b.summary} Enquire with Sarga Bharath Industries, Bengaluru, for supply across India.`,
    crumbs: [
      { name: 'Products', path: routes.products },
      { name: b.name, path: bearingPath(b.id) },
    ],
  })),
  ...solutionSectors.map((s) => ({
    path: sectorPath(s.id),
    title: sectorMeta[s.id]?.title ?? `${s.title} in India | Sarga Bharath`,
    description: sectorMeta[s.id]?.description ?? s.intro,
    crumbs: [
      { name: 'Solutions', path: routes.solutions },
      { name: s.tabLabel, path: sectorPath(s.id) },
    ],
  })),
  {
    path: routes.technologies,
    title: 'Insulated, Hybrid Ceramic & Sensor Bearings in India | Sarga Bharath',
    description:
      'Specialised bearing technologies: low-torque, electrically insulated, sensor-integrated, hybrid ceramic, corrosion-resistant and high-speed bearings. Sarga Bharath Industries, Bengaluru, serving India.',
    crumbs: [{ name: 'Technologies', path: routes.technologies }],
  },
  {
    path: routes.about,
    title: 'About Sarga Bharath Industries | Indian Bearing Company, Bengaluru',
    description:
      'Sarga Bharath Industries Pvt. Ltd. is a Bengaluru bearing solutions company serving automotive and industrial customers across India. Indian Roots. Shared Growth. Global Impact.',
    crumbs: [{ name: 'About Us', path: routes.about }],
  },
  {
    path: routes.contact,
    title: 'Contact a Bearing Supplier in Bengaluru | Request a Quote | Sarga Bharath',
    description:
      'Request a bearing quote from Sarga Bharath Industries, Bengaluru. Call or WhatsApp +91 96325 56494; we supply bearings to customers across India.',
    crumbs: [{ name: 'Contact', path: routes.contact }],
  },
]

export const notFoundMeta: PageMeta = {
  path: '/404',
  title: 'Page Not Found | Sarga Bharath Industries',
  description: 'The page you were looking for could not be found. Browse our bearing range or contact our Bengaluru team.',
}

/** Solutions has no page of its own; it opens the first sector. */
export const metaFor = (path: string) =>
  pages.find((p) => p.path === (path === routes.solutions ? sectorPath(solutionSectors[0].id) : path)) ?? notFoundMeta
