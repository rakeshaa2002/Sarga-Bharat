import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown, CircleAlert, CircleCheck } from 'lucide-react'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { useEnquiry } from '../../context/enquiry-context'
import { company } from '../../data/company'
import { enquiryGroups } from '../../data/bearings'
import { submitEnquiry, type SubmitResult } from '../../lib/enquiry'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/WhatsAppButton'
import {
  emptyEnquiry,
  fieldOrder,
  validateEnquiry,
  type EnquiryField,
  type EnquiryValues,
} from './validation'

const inputBase =
  'block w-full rounded border bg-white px-3.5 text-[15px] text-ink placeholder:text-steel-400 transition-colors focus-visible:border-blue-600 focus-visible:outline-offset-0'

const fieldId = (field: EnquiryField) => `enquiry-${field}`
const errorId = (field: EnquiryField) => `enquiry-${field}-error`

export function EnquiryForm() {
  const { request } = useEnquiry()
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry)
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({})
  const [attempted, setAttempted] = useState(false)
  const [result, setResult] = useState<{ values: EnquiryValues; outcome: SubmitResult } | null>(null)
  const [appliedRequest, setAppliedRequest] = useState(request.id)
  // after "Start a new enquiry", focus returns to the first field once the form has faded in
  const focusFirstField = useRef(false)

  // "Enquire now" links elsewhere on the page pre-select the related product or service.
  if (request.id !== appliedRequest) {
    setAppliedRequest(request.id)
    setValues((v) => ({
      ...v,
      interest: request.interest,
      message: request.note && !v.message.trim() ? request.note : v.message,
    }))
    setResult(null)
  }

  const errors = validateEnquiry(values)
  const visibleError = (field: EnquiryField) => (attempted || touched[field] ? errors[field] : undefined)
  const errorCount = fieldOrder.filter((f) => errors[f]).length

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const markTouched = (field: EnquiryField) => {
    if (values[field].trim()) setTouched((t) => ({ ...t, [field]: true }))
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAttempted(true)
    const firstInvalid = fieldOrder.find((f) => errors[f])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }
    // synchronous, so the WhatsApp tab opens as part of the submit click and isn't blocked as a popup
    const outcome = submitEnquiry(values)
    setResult({ values, outcome })
  }

  const reset = () => {
    setValues(emptyEnquiry)
    setTouched({})
    setAttempted(false)
    setResult(null)
    focusFirstField.current = true
  }

  const fieldProps = (field: EnquiryField, extraClasses: string) => {
    const error = visibleError(field)
    return {
      id: fieldId(field),
      name: field,
      value: values[field],
      onChange: update,
      onBlur: () => markTouched(field),
      'aria-invalid': error ? true : undefined,
      'aria-describedby': error ? errorId(field) : undefined,
      className: `${inputBase} ${error ? 'border-danger-700' : 'border-steel-300 hover:border-steel-400'} ${extraClasses}`,
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {result ? (
        <SuccessPanel key="done" values={result.values} outcome={result.outcome} onReset={reset} />
      ) : (
        <m.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onAnimationComplete={() => {
            if (focusFirstField.current) {
              focusFirstField.current = false
              document.getElementById(fieldId('fullName'))?.focus()
            }
          }}
          noValidate
          onSubmit={onSubmit}
          aria-describedby="enquiry-note"
        >
          <p id="enquiry-note" className="text-xs text-steel-500">
            Fields marked with an asterisk (*) are required for quotation review.
          </p>

          <div className="mt-5 grid gap-x-5 gap-y-4 sm:grid-cols-2">
            <Field field="fullName" label="Name *" error={visibleError('fullName')}>
              <input type="text" autoComplete="name" placeholder="Contact person" {...fieldProps('fullName', 'h-11')} />
            </Field>
            <Field field="company" label="Company *" error={visibleError('company')}>
              <input type="text" autoComplete="organization" placeholder="Company or enterprise name" {...fieldProps('company', 'h-11')} />
            </Field>
            <Field field="email" label="Business Email *" error={visibleError('email')}>
              <input
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="name@company.com"
                {...fieldProps('email', 'h-11')}
              />
            </Field>
            <Field field="phone" label="Phone *" error={visibleError('phone')}>
              <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" {...fieldProps('phone', 'h-11')} />
            </Field>
            <Field field="interest" label="Bearing or Solution of Interest *" error={visibleError('interest')}>
              <div className="relative">
                <select {...fieldProps('interest', 'h-11 cursor-pointer appearance-none pr-10 text-xs sm:text-sm')}>
                  <option value="">Select a bearing, solution or technology</option>
                  {enquiryGroups.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-steel-500"
                />
              </div>
            </Field>
            <Field field="quantity" label="Quantity (if applicable)" error={visibleError('quantity')}>
              <input
                type="text"
                placeholder="e.g. 10 pcs, 500 units/year, prototype"
                {...fieldProps('quantity', 'h-11')}
              />
            </Field>
            <Field field="message" label="Requirement Details *" error={visibleError('message')} wide>
              <textarea
                rows={4}
                placeholder="Bearing number or size, application, operating speed, load or temperature"
                {...fieldProps('message', 'resize-y py-2.5 leading-relaxed')}
              />
            </Field>
          </div>

          {attempted && errorCount > 0 && (
            <p role="alert" className="mt-5 flex items-start gap-2 rounded bg-danger-50 px-4 py-2.5 text-xs text-danger-700">
              <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {errorCount === 1 ? 'Check the highlighted field before submitting.' : `Check the ${errorCount} highlighted fields before submitting.`}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" size="lg" className="w-full shadow-sm sm:w-auto">
              <WhatsAppIcon className="size-5" />
              Submit Enquiry on WhatsApp
            </Button>
            <p className="text-[12px] leading-relaxed text-steel-600 sm:max-w-[17rem] sm:text-right">
              WhatsApp opens with your enquiry filled in. Press Send to deliver it to{' '}
              <span className="font-semibold whitespace-nowrap text-navy-900">{company.whatsapp.display}</span>.
            </p>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  )
}

function SuccessPanel({
  values,
  outcome,
  onReset,
}: {
  values: EnquiryValues
  outcome: SubmitResult
  onReset: () => void
}) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Mounted only after the form's exit animation, so focus lands once the panel exists.
  useEffect(() => headingRef.current?.focus(), [])

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="status"
      className="rounded border border-success-700/25 bg-success-50 p-6 sm:p-8"
    >
      <CircleCheck aria-hidden="true" className="size-9 text-success-700" strokeWidth={1.75} />
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-4 text-xl leading-snug font-semibold text-navy-900 focus:outline-none"
      >
        Thank you, {values.fullName.trim().split(/\s+/)[0]}. Your enquiry is ready in WhatsApp.
      </h3>
      {outcome.opened ? (
        <p className="mt-3 text-[15px] leading-relaxed text-steel-600">
          WhatsApp has opened with your enquiry about{' '}
          <span className="font-semibold text-navy-900">{values.interest}</span> filled in. Press Send in WhatsApp to
          deliver it to our team on <span className="whitespace-nowrap">{company.whatsapp.display}</span>.
        </p>
      ) : (
        <p className="mt-3 text-[15px] leading-relaxed text-steel-600">
          Your browser stopped WhatsApp from opening. Select Open WhatsApp below, then press Send to deliver your
          enquiry about <span className="font-semibold text-navy-900">{values.interest}</span>.
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href={outcome.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded bg-[#15803d] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#166534]"
        >
          <WhatsAppIcon className="size-5" />
          {outcome.opened ? 'Open WhatsApp again' : 'Open WhatsApp'}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <Button variant="secondary" onClick={onReset}>
          Start a new enquiry
        </Button>
      </div>
    </m.div>
  )
}

function Field({
  field,
  label,
  error,
  wide = false,
  children,
}: {
  field: EnquiryField
  label: string
  error?: string
  wide?: boolean
  children: ReactNode
}) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label htmlFor={fieldId(field)} className="mb-2 block text-sm font-semibold text-navy-900">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId(field)} className="mt-2 flex items-start gap-1.5 text-[13px] leading-snug text-danger-700">
          <CircleAlert aria-hidden="true" className="mt-px size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
