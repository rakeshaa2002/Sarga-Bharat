import type { ComponentPropsWithoutRef } from 'react'
import { company } from '../../data/company'

/*
 * Logo assets are cut from the official Sarga Bharath Industries artwork (see README > Brand assets).
 * They have transparent backgrounds and are designed for white or very light surfaces.
 */
const LOCKUP = { src: '/images/brand/sarga-bharath-lockup.webp', width: 931, height: 116 }
const FULL = { src: '/images/brand/sarga-bharath-logo.webp', width: 520, height: 315 }
const MARK = { src: '/images/brand/sarga-bharath-mark.webp', width: 167, height: 80 }

/** The "SR" monogram with the tricolour swoosh and gear, used where the full name appears as text beside it. */
export function BrandMark({ className = 'h-8 w-auto' }: { className?: string }) {
  return <img src={MARK.src} width={MARK.width} height={MARK.height} alt="" className={className} />
}

interface BrandLogoProps extends ComponentPropsWithoutRef<'span'> {
  /**
   * `light`: horizontal lockup (monogram + name) for white surfaces such as the header.
   * `dark`: the complete logo with both taglines, set on a white panel so it keeps its colours on navy.
   */
  variant?: 'light' | 'dark'
}

export function BrandLogo({ variant = 'light', className = '', ...props }: BrandLogoProps) {
  if (variant === 'dark') {
    return (
      <span className={`inline-block rounded bg-white px-4 py-3 ${className}`} {...props}>
        <img
          src={FULL.src}
          width={FULL.width}
          height={FULL.height}
          alt={`${company.name}. ${company.motto}. ${company.tagline}`}
          loading="lazy"
          decoding="async"
          className="block h-auto w-[220px]"
        />
      </span>
    )
  }

  return (
    <span className={`inline-flex ${className}`} {...props}>
      <img
        src={LOCKUP.src}
        srcSet={`/images/brand/sarga-bharath-lockup-480.webp 480w, ${LOCKUP.src} ${LOCKUP.width}w`}
        sizes="(min-width: 1280px) 369px, (min-width: 640px) 337px, 257px"
        width={LOCKUP.width}
        height={LOCKUP.height}
        alt={company.name}
        fetchPriority="high"
        className="block h-8 w-auto sm:h-[42px] xl:h-[46px]"
      />
    </span>
  )
}
