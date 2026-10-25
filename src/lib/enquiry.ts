import type { EnquiryValues } from '../components/contact/validation'
import { whatsappLink } from '../data/company'

/** Formats an enquiry as a WhatsApp message; WhatsApp shows *text* in bold. */
export function enquiryMessage(v: EnquiryValues): string {
  const lines = [
    '*New enquiry from the website*',
    '',
    `*Name:* ${v.fullName.trim()}`,
    `*Company:* ${v.company.trim()}`,
    `*Email:* ${v.email.trim()}`,
    `*Phone:* ${v.phone.trim()}`,
    `*Interested in:* ${v.interest}`,
  ]
  if (v.quantity.trim()) lines.push(`*Quantity:* ${v.quantity.trim()}`)
  lines.push('', '*Requirement:*', v.message.trim())
  return lines.join('\n')
}

export interface SubmitResult {
  /** WhatsApp chat link carrying the enquiry; it is delivered when the visitor presses Send in WhatsApp */
  whatsappUrl: string
  /** false when the browser blocked the new tab, so the visitor has to open the link themselves */
  opened: boolean
}

/**
 * Sends an enquiry through WhatsApp by opening a chat with the sales number, pre-filled with the enquiry.
 * Call it synchronously from the submit handler: browsers only allow new tabs in response to a user action.
 */
export function submitEnquiry(values: EnquiryValues): SubmitResult {
  const whatsappUrl = whatsappLink(enquiryMessage(values))
  // "noopener" in the features string would make window.open return null even on success,
  // so the opener is cleared by hand to keep blocked-tab detection working.
  const tab = window.open(whatsappUrl, '_blank')
  if (tab) tab.opener = null
  return { whatsappUrl, opened: tab !== null }
}
