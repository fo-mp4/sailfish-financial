'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { sendContactEmail } from '@/app/actions/contact'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-colors text-sm"
    >
      {pending ? 'Sending…' : 'Send message'}
    </button>
  )
}

export default function ContactForm() {
  const [result, action] = useFormState(sendContactEmail, null)

  if (result?.ok) {
    return (
      <div className="border border-teal-600/30 rounded-xl p-10 text-center" style={{ backgroundColor: 'rgba(12,122,148,0.06)' }}>
        <svg className="w-10 h-10 text-teal-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-display font-semibold text-white text-lg mb-2">Message sent!</h3>
        <p className="text-white/40 text-sm">I&apos;ll get back to you within a few hours.</p>
      </div>
    )
  }

  return (
    <div className="border border-white/8 rounded-xl p-8" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
      <h2 className="font-display font-semibold text-white text-xl mb-2">Send a message</h2>
      <p className="text-white/35 text-sm mb-8">I&apos;ll get back to you within a few hours.</p>

      <form action={action} className="grid gap-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-white/40 text-xs mb-2 tracking-wide">Your name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Jane Smith"
              className="w-full border border-white/8 focus:border-teal-600/50 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/15 outline-none transition-colors"
              style={{ backgroundColor: '#071830' }}
            />
          </div>
          <div>
            <label className="block text-white/40 text-xs mb-2 tracking-wide">Email address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@yourcompany.com"
              className="w-full border border-white/8 focus:border-teal-600/50 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/15 outline-none transition-colors"
              style={{ backgroundColor: '#071830' }}
            />
          </div>
        </div>

        <div>
          <label className="block text-white/40 text-xs mb-2 tracking-wide">
            Business type <span className="text-white/20">(optional)</span>
          </label>
          <input
            name="businessType"
            type="text"
            placeholder="e.g. sole proprietor, LLC, S-corp"
            className="w-full border border-white/8 focus:border-teal-600/50 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/15 outline-none transition-colors"
            style={{ backgroundColor: '#071830' }}
          />
        </div>

        <div>
          <label className="block text-white/40 text-xs mb-2 tracking-wide">What do you need help with?</label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Tell me a bit about your business. Monthly bookkeeping, a QuickBooks cleanup, tax estimates — whatever's on your mind."
            className="w-full border border-white/8 focus:border-teal-600/50 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/15 outline-none transition-colors resize-none"
            style={{ backgroundColor: '#071830' }}
          />
        </div>

        {result && !result.ok && (
          <p className="text-red-400/80 text-sm">{result.error}</p>
        )}

        <SubmitButton />
      </form>
    </div>
  )
}
