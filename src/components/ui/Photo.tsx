import type { ImgHTMLAttributes } from 'react'
import { photo } from '../../data/images'

interface PhotoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /** Key of a generated photo in public/images/photos */
  name: string
  alt: string
  widths?: number[]
  sizes: string
}

/** Responsive, lazily loaded WebP photograph. */
export function Photo({ name, alt, widths, sizes, className = '', loading = 'lazy', ...rest }: PhotoProps) {
  const { src, srcSet } = photo(name, widths)
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
      {...rest}
    />
  )
}
