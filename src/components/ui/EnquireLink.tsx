import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { useEnquiry } from '../../context/enquiry-context'
import { routes } from '../../lib/routes'

interface EnquireLinkProps {
  /** Value pre-selected in the enquiry form's "Product or service of interest" field */
  interest: string
  className?: string
  children?: ReactNode
  /** Accessible label, so repeated "Enquire now" links are distinguishable to screen readers */
  label: string
  /** `dark` for links placed on navy surfaces */
  tone?: 'light' | 'dark'
}

const tones = {
  light: 'text-blue-700 decoration-blue-700/30 hover:text-navy-900 hover:decoration-navy-900',
  dark: 'text-cyan-400 decoration-cyan-400/40 hover:text-white hover:decoration-white',
}

/** Opens the Contact page with the related product or service pre-selected in the enquiry form. */
export function EnquireLink({ interest, className = '', children = 'Enquire now', label, tone = 'light' }: EnquireLinkProps) {
  const { requestInterest } = useEnquiry()
  return (
    <Link
      to={routes.contact}
      aria-label={label}
      onClick={() => requestInterest(interest)}
      className={`font-semibold underline decoration-1 underline-offset-4 transition-colors ${tones[tone]} ${className}`}
    >
      {children}
    </Link>
  )
}
