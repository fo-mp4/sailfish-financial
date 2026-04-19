import Link from 'next/link'

export default function CTABand() {
  return (
    <section id="contact" className="bg-navy-900 py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-teal-400 text-xs font-medium tracking-[0.2em] uppercase mb-6">Ready to start?</p>
        <h2 className="font-display font-bold text-white text-4xl md:text-5xl leading-tight mb-6">
          Let&rsquo;s get your books right.
        </h2>
        <p className="text-silver/50 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Free 30-minute call to understand your business and see if we&rsquo;re a fit.
          No pressure, no pitch deck.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium px-8 py-4 rounded text-base transition-colors"
          >
            Schedule a free call
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="mailto:FordFox@sailfishfinancial.com"
            className="inline-flex items-center justify-center text-silver/70 hover:text-white font-medium px-8 py-4 rounded border border-white/10 hover:border-white/20 transition-colors text-base"
          >
            FordFox@sailfishfinancial.com
          </a>
        </div>
        <p className="mt-8 text-silver/30 text-xs">Serving US small businesses · Based in Tallahassee, FL</p>
      </div>
    </section>
  )
}
