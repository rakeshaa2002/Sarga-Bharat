/** Responsive photo sources generated into public/images/photos (see README > Images). */
export function photo(key: string, widths: number[] = [480, 640, 1024]) {
  return {
    src: `/images/photos/${key}-${widths[1] ?? widths[0]}.webp`,
    srcSet: widths.map((w) => `/images/photos/${key}-${w}.webp ${w}w`).join(', '),
  }
}
