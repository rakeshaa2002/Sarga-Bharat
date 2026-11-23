/** Page addresses used across the site. */
export const routes = {
  home: '/',
  products: '/products',
  solutions: '/solutions',
  technologies: '/technologies',
  about: '/about',
  contact: '/contact',
} as const

export const bearingPath = (id: string) => `/products/${id}`
export const sectorPath = (id: string) => `/solutions/${id}`
export const technologyPath = (id: string) => `/technologies#tech-${id}`
