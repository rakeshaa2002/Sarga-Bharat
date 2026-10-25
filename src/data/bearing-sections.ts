/*
 * Catalogue-style half-section drawings of each bearing type (viewBox 0 0 160 128).
 * The bearing axis runs horizontally along y = 120; rings are drawn hatched, rolling elements solid.
 */

export type BearingSectionKey =
  | 'deep-groove'
  | 'angular-contact'
  | 'self-aligning'
  | 'thrust-ball'
  | 'cylindrical-roller'
  | 'spherical-roller'
  | 'tapered-roller'
  | 'needle-roller'
  | 'spherical-roller-thrust'
  | 'four-row'

export type RollingElement =
  | { kind: 'circle'; cx: number; cy: number; r: number }
  | { kind: 'rect'; x: number; y: number; w: number; h: number; rx?: number }
  | { kind: 'ellipse'; cx: number; cy: number; rx: number; ry: number; rotate?: number }
  | { kind: 'polygon'; points: string }

export interface BearingSection {
  /** ring and washer outlines, drawn hatched */
  rings: string[]
  elements: RollingElement[]
  /** dashed construction lines, e.g. the contact angle */
  lines?: { x1: number; y1: number; x2: number; y2: number }[]
}

export const bearingSections: Record<BearingSectionKey, BearingSection> = {
  'deep-groove': {
    rings: [
      'M32,14 H128 V48 H94.6 A18,18 0 0,0 65.4,48 H32 Z',
      'M32,106 H128 V74 H94.6 A18,18 0 0,1 65.4,74 H32 Z',
    ],
    elements: [{ kind: 'circle', cx: 80, cy: 61, r: 16.5 }],
  },
  'angular-contact': {
    rings: [
      'M32,14 H128 V56 H97.8 A18.5,18.5 0 0,0 72.7,44 H32 Z',
      'M32,106 H128 V78 H87.3 A18.5,18.5 0 0,1 62.2,66 H32 Z',
    ],
    elements: [{ kind: 'circle', cx: 80, cy: 61, r: 16.5 }],
    lines: [{ x1: 97.5, y1: 40, x2: 62.5, y2: 82 }],
  },
  'self-aligning': {
    rings: [
      'M32,14 H128 V66.6 A70.3,70.3 0 0,0 32,66.6 Z',
      'M32,106 H128 V70 H106.3 A11.5,11.5 0 0,1 89.7,70 H70.3 A11.5,11.5 0 0,1 53.7,70 H32 Z',
    ],
    elements: [
      { kind: 'circle', cx: 62, cy: 61, r: 10.5 },
      { kind: 'circle', cx: 98, cy: 61, r: 10.5 },
    ],
  },
  'thrust-ball': {
    rings: [
      'M34,30 H64 V51.7 A18.5,18.5 0 0,0 64,70.3 V106 H34 Z',
      'M96,16 H126 V92 H96 V70.3 A18.5,18.5 0 0,0 96,51.7 Z',
    ],
    elements: [{ kind: 'circle', cx: 80, cy: 61, r: 16.5 }],
  },
  'cylindrical-roller': {
    rings: ['M32,14 H128 V56 H104 V44 H56 V56 H32 Z', 'M32,80 H128 V106 H32 Z'],
    elements: [{ kind: 'rect', x: 58, y: 45, w: 44, h: 33, rx: 3 }],
  },
  'spherical-roller': {
    rings: [
      'M32,14 H128 V65 A71.5,71.5 0 0,0 32,65 Z',
      'M32,106 H128 V75 H84 V66 H76 V75 H32 Z',
    ],
    elements: [
      { kind: 'ellipse', cx: 60, cy: 62.5, rx: 13, ry: 10, rotate: -14 },
      { kind: 'ellipse', cx: 100, cy: 62.5, rx: 13, ry: 10, rotate: 14 },
    ],
  },
  'tapered-roller': {
    rings: ['M32,14 H128 V35.7 L32,54.3 Z', 'M32,106 H128 V54.7 L51,76.1 V64 H32 Z'],
    elements: [{ kind: 'polygon', points: '54,51.3 106,41.2 106,59.6 54,74' }],
  },
  'needle-roller': {
    rings: ['M28,30 H132 V52 H124 V42 H36 V52 H28 Z', 'M28,58 H132 V70 H28 Z'],
    elements: [{ kind: 'rect', x: 37, y: 43, w: 86, h: 12, rx: 4 }],
  },
  'spherical-roller-thrust': {
    rings: [
      'M32,14 H100 V32.3 H92.7 A60,60 0 0,0 50.3,74.7 H32 Z',
      'M67.3,91.7 L109.7,49.3 H128 V106 H56 V91.7 Z',
    ],
    elements: [{ kind: 'ellipse', cx: 80, cy: 62, rx: 21, ry: 10, rotate: -45 }],
  },
  'four-row': {
    rings: [
      'M30,14 H130 V60 H125 V45 H105 V60 H103 V45 H83 V60 H77 V45 H57 V60 H55 V45 H35 V60 H30 Z',
      'M30,72 H130 V106 H30 Z',
    ],
    elements: [
      { kind: 'rect', x: 36, y: 46, w: 18, h: 24, rx: 2 },
      { kind: 'rect', x: 58, y: 46, w: 18, h: 24, rx: 2 },
      { kind: 'rect', x: 84, y: 46, w: 18, h: 24, rx: 2 },
      { kind: 'rect', x: 106, y: 46, w: 18, h: 24, rx: 2 },
    ],
  },
}
