import { bearingProducts, solutionSectors, technologies } from '../data/bearings'

export interface SearchEntry {
  id: string
  label: string
  /** shown beside the result, e.g. "Ball bearing" or "Automotive" */
  kind: string
  target: string
  keywords: string
}

// extra words people type when looking for each bearing type
const productKeywords: Record<string, string> = {
  'deep-groove-ball': 'radial ball single row sealed shielded',
  'angular-contact-ball': 'combined load pair matched spindle',
  'self-aligning-ball': 'misalignment double row',
  'thrust-ball': 'axial washer',
  'cylindrical-roller': 'radial roller nu nj',
  'spherical-roller': 'heavy misalignment double row barrel',
  'tapered-roller': 'taper cone cup wheel hub',
  'needle-roller': 'needle cage drawn cup compact',
  'spherical-roller-thrust': 'axial heavy thrust',
  'four-row-roller': 'rolling mill multi row heavy',
}

const familyLabel = { ball: 'Ball bearing', roller: 'Roller bearing', thrust: 'Thrust bearing' } as const

export const searchIndex: SearchEntry[] = [
  ...bearingProducts.map((b) => ({
    id: b.id,
    label: b.name,
    kind: familyLabel[b.family],
    target: `#bearing-${b.id}`,
    keywords: productKeywords[b.id] ?? '',
  })),
  ...solutionSectors.flatMap((s) =>
    s.items.map((item, i) => ({
      id: `${s.id}-${i}`,
      label: item,
      kind: s.tabLabel,
      target: `#solutions-${s.id}`,
      keywords: `${s.tabLabel} ${s.title}`,
    })),
  ),
  ...technologies.map((t) => ({
    id: t.id,
    label: t.name,
    kind: 'Technology',
    target: `#tech-${t.id}`,
    keywords: 'specialised technology',
  })),
]

const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Matches every typed word against the entry name and keywords; names that start with the query rank first. */
export function searchCatalogue(query: string, limit = 7): SearchEntry[] {
  const q = normalise(query)
  if (!q) return []
  const words = q.split(' ')
  return searchIndex
    .map((entry) => {
      const label = normalise(entry.label)
      const haystack = `${label} ${normalise(entry.keywords)}`
      if (!words.every((w) => haystack.includes(w))) return null
      const score = label.startsWith(q) ? 0 : label.split(' ').some((w) => w.startsWith(words[0])) ? 1 : 2
      return { entry, score }
    })
    .filter((r): r is { entry: SearchEntry; score: number } => r !== null)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((r) => r.entry)
}
