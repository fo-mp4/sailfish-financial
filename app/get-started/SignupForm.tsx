'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { sendSignupEmail, type SignupResult } from '../actions/signup'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded transition-colors text-sm"
    >
      {pending ? 'Sending…' : 'Send My Info'}
    </button>
  )
}

const inputClass = "w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-silver/30 focus:outline-none focus:border-teal-500 transition-colors"
const labelClass = "block text-xs text-silver/50 mb-1.5 uppercase tracking-wide"

export default function SignupForm() {
  const [result, action] = useFormState<SignupResult | null, FormData>(sendSignupEmail, null)

  if (result?.ok) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">You're all set</h3>
        <p className="text-silver/50 text-sm">Ford will be in touch within one business day.</p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Your Name *</label>
          <input name="name" type="text" required placeholder="Jane Smith" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Business Name *</label>
          <input name="business" type="text" required placeholder="Acme LLC" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Email *</label>
          <input name="email" type="email" required placeholder="you@yourbusiness.com" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input name="phone" type="tel" placeholder="(555) 555-5555" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Industry</label>
          <input name="industry" type="text" placeholder="e.g. Retail, Construction, SaaS" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Monthly Revenue (approx.)</label>
          <select name="revenue" className={inputClass + " appearance-none"}>
            <option value="">Select a range</option>
            <option value="Under $10k">Under $10k</option>
            <option value="$10k – $50k">$10k – $50k</option>
            <option value="$50k – $150k">$50k – $150k</option>
            <option value="$150k – $500k">$150k – $500k</option>
            <option value="Over $500k">Over $500k</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Services You're Interested In</label>
        <select name="services" className={inputClass + " appearance-none"}>
          <option value="">Select one</option>
          <option value="Monthly bookkeeping">Monthly bookkeeping</option>
          <option value="Monthly bookkeeping + P&L reporting">Monthly bookkeeping + P&L reporting</option>
          <option value="Catch-up bookkeeping">Catch-up bookkeeping (past months)</option>
          <option value="Full-service (bookkeeping, invoicing, AR)">Full-service (bookkeeping, invoicing, AR)</option>
          <option value="Not sure yet">Not sure yet — I'd like to talk it through</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Do you currently use QuickBooks?</label>
        <select name="quickbooks" className={inputClass + " appearance-none"}>
          <option value="">Select one</option>
          <option value="Yes, currently using QuickBooks">Yes, I currently use QuickBooks</option>
          <option value="Used QuickBooks before but not currently">I've used it before but not currently</option>
          <option value="No, not using QuickBooks">No, I don't use QuickBooks</option>
          <option value="Not sure">Not sure</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Anything else we should know? (optional)</label>
        <textarea name="notes" rows={3} placeholder="Current software, pain points, specific questions…" className={inputClass + " resize-none"} />
      </div>

      {result && !result.ok && (
        <p className="text-red-400 text-sm">{result.error}</p>
      )}

      <SubmitButton />
    </form>
  )
}
