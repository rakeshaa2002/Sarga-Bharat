export interface EnquiryValues {
  fullName: string
  company: string
  email: string
  phone: string
  interest: string
  quantity: string
  message: string
}

export type EnquiryField = keyof EnquiryValues
export type EnquiryErrors = Partial<Record<EnquiryField, string>>

export const emptyEnquiry: EnquiryValues = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  interest: '',
  quantity: '',
  message: '',
}

/** Field order, used to move focus to the first invalid field */
export const fieldOrder: EnquiryField[] = ['fullName', 'company', 'email', 'phone', 'interest', 'quantity', 'message']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_MESSAGE_LENGTH = 15

export function validateField(field: EnquiryField, raw: string): string | undefined {
  const value = raw.trim()
  switch (field) {
    case 'fullName':
      if (!value) return 'Enter your full name.'
      if (value.length < 2) return 'Enter your full name, using at least 2 characters.'
      return undefined
    case 'company':
      if (!value) return 'Enter your company name.'
      return undefined
    case 'email':
      if (!value) return 'Enter your business email address.'
      if (!EMAIL_PATTERN.test(value)) return 'Enter an email address in the format name@company.com.'
      return undefined
    case 'phone': {
      if (!value) return 'Enter a contact phone number.'
      const digits = value.replace(/[\s\-().]/g, '')
      if (!/^\+?\d{10,13}$/.test(digits)) return 'Enter a phone number of 10 to 13 digits (e.g. +91 98765 43210).'
      return undefined
    }
    case 'interest':
      if (!value) return 'Select a product category, brand, or service.'
      return undefined
    case 'quantity':
      // optional field
      return undefined
    case 'message':
      if (!value) return 'Please describe your requirement or part number.'
      if (value.length < MIN_MESSAGE_LENGTH)
        return `Add a little more detail (at least ${MIN_MESSAGE_LENGTH} characters) so our engineering team can review.`
      return undefined
  }
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {}
  for (const field of fieldOrder) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}
