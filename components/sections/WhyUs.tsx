const pillars = [
  {
    number: '01',
    title: 'Flat, affordable pricing',
    body: "One monthly rate, no surprises. You know exactly what bookkeeping costs before we ever start — and it's priced for small businesses, not corporations.",
  },
  {
    number: '02',
    title: 'Books by the 5th, every month',
    body: "Your prior month is closed, reconciled, and in your inbox by the 5th. No chasing, no waiting. You can actually plan around it.",
  },
  {
    number: '03',
    title: 'You talk to me directly',
    body: "No account managers, no ticketing systems, no being passed around. You have our direct line. Questions get answered the same day.",
  },
  {
    number: '04',
    title: 'Built around your tax return',
    body: "Your books follow IRS Schedule C from day one. At tax time, hand your CPA a clean file — not a mess to untangle.",
  },
]

export default function WhyUs() {
  return (
    <section id="why-us" style={{ backgroundColor: '#071830', position: 'relative' }} className="py-28 overflow-hidden">

      {/* Background glow — right side */}
      <div style={{ position: 'absolute', top: '20%', right: '-10%', width: '60vw', height: '70vh', background: 'radial-gradient(ellipse, rgba(14,143,172,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <p className="text-teal-400 text-xs font-medium tracking-[0.2em] uppercase mb-4">Why Sailfish</p>
            <h2 className="font-serif text-white text-4xl md:text-5xl leading-tight mb-6" style={{ fontWeight: 400 }}>
              Bookkeeping that<br />
              <em style={{ color: '#14A8C8', fontStyle: 'italic', fontWeight: 300 }}>actually feels easy.</em>
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-6">
              Most bookkeeping services are built for big companies — slow, expensive, and full of people
              you&apos;ve never met. Sailfish is focused entirely on small businesses in the US.
            </p>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              You get fast turnaround, honest pricing, and a real person who picks up the phone.
              No jargon, no runaround.
            </p>
            <a
              href="/get-started"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-medium px-6 py-3 rounded transition-colors text-sm"
            >
              Get started
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right — pillars */}
          <div className="grid gap-5">
            {pillars.map((p) => (
              <div key={p.number} className="flex gap-5 p-6 rounded-xl border border-white/8 hover:border-teal-500/30 transition-all duration-300" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <span className="font-display font-bold text-teal-400/50 text-xl leading-none pt-0.5 min-w-[2rem]">
                  {p.number}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white text-base mb-2">{p.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
