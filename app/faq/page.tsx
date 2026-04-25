'use client'

import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const FAQS = [
  {
    category: 'Getting started',
    items: [
      {
        q: 'How does onboarding work?',
        a: "We start with a free 30-minute call to understand your business. After that, you give us read-only access to your bank accounts and any existing accounting software — no installs, no setup on your end. We handle the rest. Most clients are fully onboarded within a week.",
      },
      {
        q: 'What software do you use?',
        a: "We work in QuickBooks Online. If you don't already have it, your subscription is included in your monthly plan. If you're on a different platform, we can discuss migration — it's usually straightforward.",
      },
      {
        q: 'Do I need to do anything each month?',
        a: "Very little. Occasionally we may ask a quick question about an unusual transaction. Beyond that, your job is to run your business — we handle the books.",
      },
    ],
  },
  {
    category: 'Pricing',
    items: [
      {
        q: 'Are there any hidden fees?',
        a: "No. Your monthly rate is your monthly rate. We don't charge extra for catch-up work within your transaction volume, rush reports, or email questions. The only add-on would be if your transaction volume grows beyond your plan tier — and we'd tell you that in advance.",
      },
      {
        q: 'What if I have months of catch-up work?',
        a: "If your books are significantly behind, we'll give you a one-time catch-up quote before we start. Once we're current, you move to normal monthly pricing. No obligation to continue after the cleanup if you'd prefer to take it from there.",
      },
      {
        q: 'Can I cancel anytime?',
        a: "Yes. No contracts, no cancellation fees. Give us notice before your next billing cycle and that's it. We'll send you a clean export of everything we've done so you're never left without your records.",
      },
    ],
  },
  {
    category: 'What\'s included',
    items: [
      {
        q: 'When will my books be ready each month?',
        a: "Your prior month is closed and reconciled by the 5th. You'll receive an email with your P&L summary, cash flow statement, and a link to your dashboard. If the 5th falls on a weekend or holiday, we deliver the next business day.",
      },
      {
        q: 'Do you handle payroll?',
        a: "We don't process payroll directly, but we coordinate with your payroll provider and make sure payroll entries are recorded correctly in your books. If you need a payroll recommendation, we're happy to point you in the right direction.",
      },
      {
        q: 'Will my books be ready for tax season?',
        a: "That's built into how we work. Your books follow IRS Schedule C from day one. At year-end, we produce a clean, organized file your CPA can open and work from immediately — no cleanup, no questions, no stress.",
      },
    ],
  },
  {
    category: 'Security & trust',
    items: [
      {
        q: 'How do you access my accounts?',
        a: "We use read-only bank connections through QuickBooks Online's secure data feed. We can see transactions, but we cannot initiate transfers or move money. Your login credentials are never stored by us.",
      },
      {
        q: 'Who actually works on my books?',
        a: "Ford Fox — the owner of Sailfish Financial — handles your account directly. You won't be passed to an offshore team or a rotating roster of staff. You have one person, and that person's name is on the door.",
      },
      {
        q: 'What if I have a question between monthly reports?',
        a: "Email or call anytime. Same-day replies during business hours. Growth and Pro clients have a direct line for calls and texts. We're not a ticket system — we're a small business that works with small businesses.",
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="border-b border-white/8 last:border-0 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-start justify-between gap-4 py-5">
        <p className="text-white text-sm leading-relaxed font-medium flex-1">{q}</p>
        <svg
          className={`w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
      {open && (
        <p className="text-white/55 text-sm leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <div style={{ backgroundColor: '#071830', minHeight: '100vh' }}>
      <Nav />

      <main className="pt-32 pb-28">
        <div className="max-w-4xl mx-auto px-6">

          {/* Header */}
          <div className="mb-16 max-w-xl">
            <p className="text-teal-400 text-xs font-medium tracking-[0.22em] uppercase mb-5">
              FAQ
            </p>
            <h1
              className="text-white leading-tight mb-5"
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 400 }}
            >
              Common questions,<br />
              <em style={{ color: '#14A8C8', fontStyle: 'italic', fontWeight: 300 }}>honest answers.</em>
            </h1>
            <p className="text-white/55 text-lg leading-relaxed">
              Still have something we didn&apos;t cover?{' '}
              <Link href="/contact" className="text-teal-400 hover:text-teal-300 transition-colors underline underline-offset-4">
                Ask us directly.
              </Link>
            </p>
          </div>

          {/* FAQ sections */}
          <div className="flex flex-col gap-12">
            {FAQS.map((section) => (
              <div key={section.category}>
                <p
                  className="text-white/30 text-xs font-medium tracking-[0.2em] uppercase mb-2"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {section.category}
                </p>
                <div
                  className="rounded-2xl border border-white/8 px-6"
                  style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                >
                  {section.items.map((item) => (
                    <FAQItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-white/40 text-sm mb-6">Ready to hand off your books?</p>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium px-8 py-3.5 rounded-xl text-sm transition-colors"
            >
              Get started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}
