import { useId } from 'react'
import { bearingSections, type BearingSectionKey, type RollingElement } from '../../data/bearing-sections'

interface BearingSectionDrawingProps {
  type: BearingSectionKey
  className?: string
  /** accessible description; omit when the drawing sits next to its own visible title */
  title?: string
}

const element = (e: RollingElement, i: number) => {
  const style = { className: 'bearing-element' }
  switch (e.kind) {
    case 'circle':
      return <circle key={i} cx={e.cx} cy={e.cy} r={e.r} {...style} />
    case 'rect':
      return <rect key={i} x={e.x} y={e.y} width={e.w} height={e.h} rx={e.rx ?? 0} {...style} />
    case 'ellipse':
      return (
        <ellipse
          key={i}
          cx={e.cx}
          cy={e.cy}
          rx={e.rx}
          ry={e.ry}
          transform={`rotate(${e.rotate ?? 0} ${e.cx} ${e.cy})`}
          {...style}
        />
      )
    case 'polygon':
      return <polygon key={i} points={e.points} strokeLinejoin="round" {...style} />
  }
}

/** Catalogue-style half-section of a bearing: hatched rings, solid rolling elements, dash-dot axis. */
export function BearingSectionDrawing({ type, className = '', title }: BearingSectionDrawingProps) {
  const section = bearingSections[type]
  const hatch = `hatch-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  return (
    <svg
      viewBox="0 0 160 128"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <pattern id={hatch} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#8fa0b5" strokeWidth="1" />
        </pattern>
      </defs>
      <line x1="10" y1="120" x2="150" y2="120" stroke="#8fa0b5" strokeWidth="1" strokeDasharray="10 3 2 3" />
      {section.rings.map((d) => (
        <g key={d}>
          <path d={d} fill="#ffffff" />
          <path d={d} fill={`url(#${hatch})`} stroke="#0b2545" strokeWidth="1.4" strokeLinejoin="round" />
        </g>
      ))}
      <g className="bearing-elements">{section.elements.map(element)}</g>
      {section.lines?.map((l) => (
        <line key={`${l.x1}-${l.y1}`} {...l} stroke="#c84d0e" strokeWidth="1.2" strokeDasharray="3 2" />
      ))}
    </svg>
  )
}
