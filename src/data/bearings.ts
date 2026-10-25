import {
  Activity,
  Gauge,
  ShieldCheck,
  Sparkles,
  Zap,
  ZapOff,
  type LucideIcon,
} from 'lucide-react'
import type { BearingSectionKey } from './bearing-sections'

/*
 * Sarga Bharath Industries bearing portfolio.
 * Product, solution and technology names are the company's own list. The one-line descriptions of
 * each bearing type are general engineering definitions, not performance claims.
 */

export type BearingFamily = 'ball' | 'roller' | 'thrust'

export interface BearingProduct {
  id: string
  name: string
  family: BearingFamily
  summary: string
  section: BearingSectionKey
  /** product image at public/images/bearings/<id>-<300|600>.webp */
  imageAlt: string
  imageCredit: ImageCredit
}

export interface ImageCredit {
  author: string
  license: 'CC BY 2.5' | 'CC0' | 'Own work'
  /** source page on Wikimedia Commons */
  page?: string
}

export const licenseUrls: Record<ImageCredit['license'], string | undefined> = {
  'CC BY 2.5': 'https://creativecommons.org/licenses/by/2.5/',
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
  'Own work': undefined,
}

export const bearingFamilies: { id: BearingFamily | 'all'; label: string }[] = [
  { id: 'all', label: 'All bearings' },
  { id: 'ball', label: 'Ball bearings' },
  { id: 'roller', label: 'Roller bearings' },
  { id: 'thrust', label: 'Thrust bearings' },
]

export const bearingProducts: BearingProduct[] = [
  {
    id: 'deep-groove-ball',
    name: 'Deep Groove Ball Bearings',
    family: 'ball',
    summary: 'The most widely used bearing type, for radial and moderate axial loads in both directions at high speeds.',
    section: 'deep-groove',
    imageAlt: 'Cutaway render of a sealed deep groove ball bearing showing balls, cage and seals',
    imageCredit: { author: 'Silberwolf', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Radial-deep-groove-ball-bearing_din625-t1_2rs_120.png' },
  },
  {
    id: 'angular-contact-ball',
    name: 'Angular Contact Ball Bearings',
    family: 'ball',
    summary: 'Raceways offset along the axis carry combined radial and axial loads, often mounted in matched pairs.',
    section: 'angular-contact',
    imageAlt: 'Cutaway render of an angular contact ball bearing with its offset raceways',
    imageCredit: { author: 'Silberwolf', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Angular-contact-ball-bearing_single-row_din628_type-b_120.png' },
  },
  {
    id: 'self-aligning-ball',
    name: 'Self-Aligning Ball Bearings',
    family: 'ball',
    summary: 'Two rows of balls and a spherical outer raceway tolerate shaft misalignment and deflection.',
    section: 'self-aligning',
    imageAlt: 'Cutaway render of a self-aligning ball bearing with two rows of balls',
    imageCredit: { author: 'Silberwolf', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Spherical-ball-bearing_double-row_din630-t1_120.png' },
  },
  {
    id: 'thrust-ball',
    name: 'Thrust Ball Bearings',
    family: 'thrust',
    summary: 'Shaft and housing washers with a ball set, designed for purely axial loads.',
    section: 'thrust-ball',
    imageAlt: 'Exploded render of a thrust ball bearing: two washers and the ball set',
    imageCredit: { author: 'Silberwolf', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Thrust-ball-bearing_din711_ex.png' },
  },
  {
    id: 'cylindrical-roller',
    name: 'Cylindrical Roller Bearings',
    family: 'roller',
    summary: 'Line contact between rollers and raceways gives high radial load capacity at high speeds.',
    section: 'cylindrical-roller',
    imageAlt: 'Cutaway render of a cylindrical roller bearing showing a roller between the rings',
    imageCredit: { author: 'Silberwolf', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Cylindrical-roller-bearing_din5412-t1_type-n_120.png' },
  },
  {
    id: 'spherical-roller',
    name: 'Spherical Roller Bearings',
    family: 'roller',
    summary: 'Two rows of barrel-shaped rollers carry heavy radial loads and compensate for misalignment.',
    section: 'spherical-roller',
    imageAlt: 'Cutaway render of a spherical roller bearing with two rows of barrel rollers',
    imageCredit: { author: 'Silberwolf', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Spherical-roller-bearing_double-row_din635-t2_120.png' },
  },
  {
    id: 'tapered-roller',
    name: 'Tapered Roller Bearings',
    family: 'roller',
    summary: 'Tapered rollers and raceways handle heavy combined radial and axial loads, as in wheel hubs and gearboxes.',
    section: 'tapered-roller',
    imageAlt: 'Cutaway render of a tapered roller bearing showing the cone, cup and tapered rollers',
    imageCredit: { author: 'Silberwolf', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Tapered-roller-bearing_din720_120.png' },
  },
  {
    id: 'needle-roller',
    name: 'Needle Roller Bearings',
    family: 'roller',
    summary: 'Long, slender rollers deliver high load capacity in a very small radial cross-section.',
    section: 'needle-roller',
    imageAlt: 'Two needle roller bearings, one with an inner ring',
    imageCredit: { author: 'Aastha.shetty', license: 'CC0', page: 'https://commons.wikimedia.org/wiki/File:Bearing_image.jpg' },
  },
  {
    id: 'spherical-roller-thrust',
    name: 'Spherical Roller Thrust Bearings',
    family: 'thrust',
    summary: 'Inclined barrel rollers carry very heavy axial loads with some radial load, and are self-aligning.',
    section: 'spherical-roller-thrust',
    imageAlt: 'Cutaway render of a spherical roller thrust bearing with inclined rollers',
    imageCredit: { author: 'Silberwolf', license: 'CC BY 2.5', page: 'https://commons.wikimedia.org/wiki/File:Self-aligning-roller-thrust-bearing_din728_120.png' },
  },
  {
    id: 'four-row-roller',
    name: 'Four-Row Roller Bearings',
    family: 'roller',
    summary: 'Four rows of rollers for the very heavy loads found on rolling-mill roll necks and similar duties.',
    section: 'four-row',
    imageAlt: 'Cutaway render of a four-row cylindrical roller bearing',
    imageCredit: { author: 'Sarga Bharath Industries', license: 'Own work' },
  },
]

export interface SectorThumb {
  image: string
  alt: string
  label: string
}

export interface SolutionSector {
  id: 'automotive' | 'industrial'
  title: string
  tabLabel: string
  intro: string
  items: string[]
  image: string
  imageAlt: string
  thumbs: SectorThumb[]
}

export const solutionSectors: SolutionSector[] = [
  {
    id: 'automotive',
    title: 'Automotive Bearing Solutions',
    tabLabel: 'Automotive',
    intro: 'Bearings for wheels, drivelines and engine ancillaries across two-wheelers, cars, commercial vehicles, tractors and EVs.',
    items: [
      'Wheel Bearings and Hub Units',
      'Tapered Roller Bearing Assemblies',
      'Clutch Release Bearings',
      'Water Pump Bearings',
      'Belt Tensioner Bearings',
      'Two-Wheeler, Passenger Vehicle and Commercial Vehicle Bearings',
      'Tractor and Agricultural Bearings',
      'Electric Vehicle Bearing Solutions',
    ],
    image: 'auto-wheel-hub',
    imageAlt: 'Wheel hub, brake disc and caliper assembly on a vehicle',
    thumbs: [
      { image: 'auto-two-wheeler', alt: 'Motorcycle rider on a mountain highway', label: 'Two-wheelers' },
      { image: 'auto-commercial-vehicle', alt: 'Cargo trucks on a winding ghat road', label: 'Commercial vehicles' },
      { image: 'auto-tractor', alt: 'Blue tractor ploughing a farm field', label: 'Tractors' },
      { image: 'auto-electric-vehicle', alt: 'Electric vehicle drivetrain and battery components', label: 'Electric vehicles' },
    ],
  },
  {
    id: 'industrial',
    title: 'Industrial Bearing Solutions',
    tabLabel: 'Industrial',
    intro: 'Bearings and bearing units for motors, drives, conveyors and heavy equipment in plants, mines and processing industries.',
    items: [
      'Electric Motor Bearings',
      'Gearbox and Transmission Bearings',
      'Conveyor and Material Handling Bearings',
      'Heavy-Duty Industrial Bearings',
      'Vibrating Screen Bearings',
      'Special Application Bearings',
      'Bearing Units and Mounted Bearings',
    ],
    image: 'ind-electric-motor',
    imageAlt: 'Technician servicing an industrial electric motor',
    thumbs: [
      { image: 'ind-gearbox', alt: 'Shafts and gears inside heavy machinery', label: 'Gearboxes' },
      { image: 'ind-conveyor', alt: 'Conveyor discharging aggregate onto a stockpile', label: 'Conveyors' },
      { image: 'ind-heavy-duty', alt: 'Bucket-wheel excavator in an open-cast mine', label: 'Heavy duty' },
    ],
  },
]

export interface BearingTechnology {
  id: string
  name: string
  summary: string
  icon: LucideIcon
}

export const technologies: BearingTechnology[] = [
  {
    id: 'low-torque',
    name: 'Low-Torque Bearings',
    summary: 'Optimised internal geometry, seals and lubrication reduce friction for energy-efficient running.',
    icon: Gauge,
  },
  {
    id: 'electrically-insulated',
    name: 'Electrically Insulated Bearings',
    summary: 'Insulating coatings or ceramic elements stop stray currents damaging bearings in motors and generators.',
    icon: ZapOff,
  },
  {
    id: 'sensor-integrated',
    name: 'Sensor-Integrated Bearing Solutions',
    summary: 'Bearings with built-in sensing for speed, position or condition monitoring.',
    icon: Activity,
  },
  {
    id: 'hybrid-ceramic',
    name: 'Hybrid Ceramic Bearing Solutions',
    summary: 'Ceramic rolling elements in steel rings for high speeds, low friction and electrical insulation.',
    icon: Sparkles,
  },
  {
    id: 'corrosion-resistant',
    name: 'Corrosion-Resistant Bearing Solutions',
    summary: 'Stainless steels and protective coatings for wet, chemical and washdown environments.',
    icon: ShieldCheck,
  },
  {
    id: 'high-speed',
    name: 'High-Speed and Application-Specific Bearings',
    summary: 'Designs matched to demanding speed, temperature or load conditions of a particular application.',
    icon: Zap,
  },
]

/** Everything a visitor can ask about, grouped as on the enquiry form. */
export const enquiryGroups = [
  { group: 'Bearing products', options: bearingProducts.map((b) => b.name) },
  ...solutionSectors.map((s) => ({ group: s.title, options: s.items })),
  { group: 'Specialised bearing technologies', options: technologies.map((t) => t.name) },
  { group: 'Other', options: ['Custom or replacement bearing', 'Other / not sure yet'] },
]
