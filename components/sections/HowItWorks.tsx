const STEPS = [
  {
    number: '01',
    title: 'Connect your accounts',
    body: 'You fill out a short intake form and add us as an accountant user in your QuickBooks. Then you share read-only access to your bank accounts — no installs, no setup on your end.',
  },
  {
    number: '02',
    title: 'We handle your books',
    body: 'Every month we categorize transactions, reconcile accounts, and close your books. If something looks off, we flag it. You stay focused on your business — we stay focused on the numbers.',
  },
  {
    number: '03',
    title: 'You get a clear picture',
    body: 'By the 10th, your dashboard updates with 15 financial charts, a P&L summary, and your key metrics. Everything you need to understand where your money went and where you stand.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-navy-950 py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 max-w-xl">
          <p className="text-teal-400 text-xs font-medium tracking-[0.22em] uppercase mb-5">
            The process
          </p>
          <h2
            className="text-white leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 400 }}
          >
            Simple from day one.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative flex flex-col md:pr-12">
              {/* Connector line between steps */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-[1.1rem] left-[calc(2.5rem+1px)] right-0 h-px bg-white/8" />
              )}

              {/* Number badge */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="w-10 h-10 rounded-full border border-teal-600/40 flex items-center justify-center flex-shrink-0 bg-navy-950"
                  style={{ fontFamily: 'var(--font-cinzel)', fontSize: '0.7rem', color: '#14A8C8', letterSpacing: '0.05em' }}
                >
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-white/5 md:hidden" />
              </div>

              <h3
                className="text-white mb-3"
                style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.35rem', fontWeight: 600 }}
              >
                {step.title}
              </h3>
              <p className="text-silver/50 text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
