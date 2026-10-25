import { createContext, useContext } from 'react'

export interface InterestRequest {
  /** Product or service to pre-select in the enquiry form */
  interest: string
  /** Optional text placed in an empty message field, e.g. a search that found no match */
  note?: string
  /** Increments on every request, so repeating the same choice is still applied */
  id: number
}

export interface EnquiryContextValue {
  request: InterestRequest
  requestInterest: (interest: string, note?: string) => void
}

export const EnquiryContext = createContext<EnquiryContextValue | null>(null)

export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>')
  return ctx
}
