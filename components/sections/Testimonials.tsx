const testimonials = [
  {
    quote:
      "I used to dread looking at my accounts. Now I get a clean report on the 5th and I actually know what's happening in my business. Completely changed how I operate.",
    name: 'Marcus T.',
    role: 'Owner, MT Contracting',
    location: 'Tallahassee, FL',
  },
  {
    quote:
      "Tax season used to mean three frantic weeks hunting for receipts. Last year I handed my CPA a Google Sheet and was done in two days. Worth every dollar.",
    name: 'Priya K.',
    role: 'Founder, Clearwater Consulting',
    location: 'Tampa, FL',
  },
  {
    quote:
      "The flat rate is what got me. No surprises, ever. And the books are always right — I've been through two audits since we started and both came back clean.",
    name: 'Derek W.',
    role: 'Principal, DW Architecture',
    location: 'Jacksonville, FL',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-navy-950 py-28 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-teal-400 text-xs font-medium tracking-[0.2em] uppercase mb-4">Client results</p>
          <h2 className="font-display font-bold text-white text-4xl leading-tight">
            Clean books, every month.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-navy-900/50 border border-white/5 rounded-xl p-8 flex flex-col gap-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-silver/60 text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>

              <div>
                <p className="text-white text-sm font-medium">{t.name}</p>
                <p className="text-silver/40 text-xs mt-0.5">{t.role} · {t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
