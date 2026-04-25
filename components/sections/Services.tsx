const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Monthly Bookkeeping',
    description:
      'Every transaction categorized and reconciled — bank accounts, credit cards, all of it. Done before the 5th so you always know where you stand.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Financial Reports',
    description:
      "A monthly P&L and cash flow summary in plain English. No accounting degree required — you'll actually understand it.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Invoicing & Collections',
    description:
      'Branded invoices sent for you, payment tracking, and friendly follow-ups on overdue balances. Spend less time chasing, more time working.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Quarterly Tax Estimates',
    description:
      "Know what to set aside before the IRS deadline. No surprises, no penalties — just a clear number based on what you actually earned.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582 4-8 4m0 5c0 2.21 3.582 4 8 4s8-1.79 8-4" />
      </svg>
    ),
    title: 'QuickBooks Setup & Cleanup',
    description:
      'Starting from scratch or fixing years of messy data. Chart of accounts, opening balances, and historical imports — done right the first time.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Year-End Tax Prep',
    description:
      "Hand your CPA a clean, organized file at year-end instead of a shoebox. Your books are structured around IRS Schedule C from day one.",
  },
]

export default function Services() {
  return (
    <section id="services" style={{ backgroundColor: '#071830', marginTop: '-120px', position: 'relative', zIndex: 20 }} className="pt-32 pb-28 overflow-hidden">

      {/* Background glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '60vh', background: 'radial-gradient(ellipse, rgba(14,143,172,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="max-w-6xl mx-auto px-6 relative">

        <div className="mb-16 max-w-2xl">
          <p className="text-teal-400 text-xs font-medium tracking-[0.2em] uppercase mb-4">What&apos;s included</p>
          <h2 className="font-serif text-white text-4xl md:text-5xl leading-tight mb-5" style={{ fontWeight: 400 }}>
            Everything you need.<br />
            <em style={{ color: '#14A8C8', fontStyle: 'italic', fontWeight: 300 }}>Nothing you don&apos;t.</em>
          </h2>
          <p className="text-white/65 text-lg leading-relaxed">
            One flat monthly rate covers all of this. No hourly billing, no add-on fees, no surprises.
            Just clean books and clear numbers — delivered on time, every month.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-8 rounded-xl border border-white/8 hover:border-teal-500/40 transition-all duration-300"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(4px)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 text-teal-400 group-hover:text-teal-300 transition-colors" style={{ backgroundColor: 'rgba(14,143,172,0.12)' }}>
                {s.icon}
              </div>
              <h3 className="font-display font-semibold text-white text-base mb-3">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm">
            Not sure what you need?{' '}
            <a href="/contact" className="text-teal-400 hover:text-teal-300 transition-colors underline underline-offset-4">
              Not sure what you need? <a href="/contact" className="text-teal-400 hover:text-teal-300 transition-colors underline underline-offset-4">Send us a message</a> and we&apos;ll point you in the right direction.
            </a>
          </p>
        </div>

      </div>
    </section>
  )
}
