import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

const PLANS = [
  {
    name: 'Starter',
    price: '$199',
    description: 'For solo operators and new businesses getting their books in order.',
    transactions: 'Up to 75 transactions/mo',
    features: [
      'Monthly bookkeeping & reconciliation',
      'Monthly P&L and cash flow report',
      'You add us to your QuickBooks as an accountant user',
      'Books closed by the 5th',
      'Email support (same-day replies)',
      'Year-end tax-ready file',
    ],
    cta: 'Get started',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$349',
    description: 'For growing businesses with more volume and more complexity.',
    transactions: 'Up to 200 transactions/mo',
    features: [
      'Everything in Starter',
      'Invoicing & collections management',
      'Quarterly tax estimates',
      'Accounts payable tracking',
      'Priority email support (same-day replies)',
      'Monthly financial summary with key insights',
    ],
    cta: 'Get started',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$549',
    description: 'For established businesses that need full-service financial oversight.',
    transactions: 'Unlimited transactions',
    features: [
      'Everything in Growth',
      'Multi-account & entity support',
      'Cash flow forecasting',
      'Payroll coordination',
      'Priority email with same-day response guarantee',
      'CPA liaison at year-end',
    ],
    cta: 'Get started',
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <div style={{ backgroundColor: '#071830', minHeight: '100vh' }}>
      <Nav />

      <main className="pt-32 pb-28">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p className="text-teal-400 text-xs font-medium tracking-[0.22em] uppercase mb-5">
              Pricing
            </p>
            <h1
              className="text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 400 }}
            >
              Flat monthly pricing.<br />
              <em style={{ color: '#14A8C8', fontStyle: 'italic', fontWeight: 300 }}>No surprises.</em>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              One rate covers everything. No hourly billing, no add-on fees, no contracts.
              Cancel anytime — though most clients stay for years.
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl border p-8 transition-all duration-300"
                style={{
                  backgroundColor: plan.highlight ? 'rgba(14,143,172,0.08)' : 'rgba(255,255,255,0.03)',
                  borderColor: plan.highlight ? 'rgba(14,143,172,0.5)' : 'rgba(255,255,255,0.08)',
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-teal-500 text-white text-xs font-medium px-4 py-1 rounded-full tracking-wide">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p
                    className="text-white text-sm font-medium mb-1"
                    style={{ fontFamily: 'var(--font-cinzel)', letterSpacing: '0.08em' }}
                  >
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1.5 mb-3">
                    <span
                      className="text-white"
                      style={{ fontFamily: 'var(--font-cormorant)', fontSize: '3rem', fontWeight: 600, lineHeight: 1 }}
                    >
                      {plan.price}
                    </span>
                    <span className="text-white/40 text-sm mb-1">/month</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed mb-2">{plan.description}</p>
                  <p className="text-teal-400 text-xs font-medium">{plan.transactions}</p>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/65 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/get-started"
                  className={`w-full text-center font-medium py-3 rounded-xl text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-teal-600 hover:bg-teal-500 text-white'
                      : 'border border-white/15 hover:border-white/30 text-white/80 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Not sure callout */}
          <div
            className="rounded-2xl border border-white/8 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
          >
            <div>
              <h3
                className="text-white mb-2"
                style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.5rem', fontWeight: 500 }}
              >
                Not sure which plan fits?
              </h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Send us a message and we&apos;ll follow up within one business day. No sales pressure — just an honest conversation about your books.
              </p>
            </div>
            <Link
              href="/get-started"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
            >
              Get in touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-3 text-white/35 text-sm">
            <span>No contracts — cancel anytime</span>
            <span className="text-white/15">·</span>
            <span>US-based, Tallahassee FL</span>
            <span className="text-white/15">·</span>
            <span>QuickBooks access required before start</span>
            <span className="text-white/15">·</span>
            <span>Books closed by the 5th every month</span>
          </div>

          {/* Catch-up note */}
          <p className="mt-6 text-center text-white/25 text-xs leading-relaxed max-w-lg mx-auto">
            If catch-up work is needed, each prior month we fix is billed at your plan&apos;s monthly rate.
            We&apos;ll tell you exactly how many months need attention before any work begins.
          </p>

        </div>
      </main>

      <Footer />
    </div>
  )
}
