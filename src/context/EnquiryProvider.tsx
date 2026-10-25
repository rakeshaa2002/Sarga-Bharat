import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { EnquiryContext, type InterestRequest } from './enquiry-context'

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<InterestRequest>({ interest: '', id: 0 })
  const requestInterest = useCallback(
    (interest: string, note?: string) => setRequest((r) => ({ interest, note, id: r.id + 1 })),
    [],
  )
  const value = useMemo(() => ({ request, requestInterest }), [request, requestInterest])
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}
