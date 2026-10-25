import { useId } from 'react'

interface BearingSpinnerProps {
  className?: string
  /** `steel`: rendered metal on light surfaces. `blueprint`: cyan line drawing for navy surfaces. */
  variant?: 'steel' | 'blueprint'
  balls?: number
}

const C = 100 // centre of the 200x200 view box
const BALL_PITCH = 66
const BALL_R = 11.5

/** Front view of a deep groove ball bearing whose inner ring and ball set rotate (see index.css). */
export function BearingSpinner({ className = '', variant = 'steel', balls = 11 }: BearingSpinnerProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const blueprint = variant === 'blueprint'
  const ring = blueprint ? 'none' : `url(#ring-${uid})`
  const ball = blueprint ? 'none' : `url(#ball-${uid})`
  const line = blueprint ? '#2db8ea' : '#0b2545'
  const fine = blueprint ? 'rgb(45 184 234 / 0.45)' : 'rgb(11 37 69 / 0.35)'

  const annulus = (outer: number, inner: number) =>
    `M${C - outer},${C} a${outer},${outer} 0 1,0 ${outer * 2},0 a${outer},${outer} 0 1,0 ${-outer * 2},0 Z ` +
    `M${C - inner},${C} a${inner},${inner} 0 1,1 ${inner * 2},0 a${inner},${inner} 0 1,1 ${-inner * 2},0 Z`

  const ballPositions = Array.from({ length: balls }, (_, i) => {
    const a = (i / balls) * Math.PI * 2
    return { x: C + BALL_PITCH * Math.cos(a), y: C + BALL_PITCH * Math.sin(a) }
  })

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`ring-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f7fa" />
          <stop offset="0.45" stopColor="#c4ceda" />
          <stop offset="0.55" stopColor="#eef2f6" />
          <stop offset="1" stopColor="#8fa0b5" />
        </linearGradient>
        <radialGradient id={`ball-${uid}`} cx="0.35" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#dde3ea" />
          <stop offset="1" stopColor="#5a6878" />
        </radialGradient>
      </defs>

      {/* centre lines */}
      <g stroke={fine} strokeWidth="0.8" strokeDasharray="8 3 2 3">
        <line x1="0" y1={C} x2="200" y2={C} />
        <line x1={C} y1="0" x2={C} y2="200" />
      </g>

      {/* outer ring (stationary) */}
      <path d={annulus(96, 78)} fill={ring} fillRule="evenodd" stroke={line} strokeWidth="1.4" />
      <circle cx={C} cy={C} r="81" fill="none" stroke={fine} strokeWidth="0.8" />

      {/* cage and balls orbit at cage speed */}
      <g className="bearing-spin-cage">
        <circle cx={C} cy={C} r={BALL_PITCH} fill="none" stroke={blueprint ? fine : '#8fa0b5'} strokeWidth="5" />
        {ballPositions.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={BALL_R} fill={ball} stroke={line} strokeWidth="1.2" />
            {!blueprint && <circle cx={p.x - 3.5} cy={p.y - 3.5} r="2.6" fill="#ffffff" opacity="0.85" />}
          </g>
        ))}
      </g>

      {/* inner ring turns with the shaft; the index marks make the rotation readable */}
      <g className="bearing-spin-inner">
        <path d={annulus(54, 36)} fill={ring} fillRule="evenodd" stroke={line} strokeWidth="1.4" />
        <circle cx={C} cy={C} r="51" fill="none" stroke={fine} strokeWidth="0.8" />
        {[0, 120, 240].map((deg) => (
          <rect
            key={deg}
            x={C - 1.5}
            y={C - 50}
            width="3"
            height="9"
            rx="1"
            fill={blueprint ? '#2db8ea' : '#c84d0e'}
            transform={`rotate(${deg} ${C} ${C})`}
          />
        ))}
      </g>
    </svg>
  )
}
