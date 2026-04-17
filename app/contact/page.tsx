import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from './ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Sailfish Financial',
  description: 'Reach out for a free 30-minute call. No commitment, no pressure.',
}

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main style={{ backgroundColor: '#00060E' }} className="min-h-screen pt-16">
        <section className="max-w-3xl mx-auto px-6 py-24">

          <p className="text-teal-400 text-xs font-medium tracking-[0.2em] uppercase mb-6">Say hello</p>
          <h1 className="font-serif text-white text-5xl leading-tight mb-4" style={{ fontWeight: 400 }}>
            Let&apos;s talk about<br />
            <em style={{ color: '#14A8C8', fontStyle: 'italic', fontWeight: 300 }}>your business.</em>
          </h1>
          <p className="text-white/45 text-lg leading-relaxed mb-12 max-w-lg">
            Free 30-minute call to learn about your business and see if we&apos;re a good fit.
            No pressure, no pitch — just a straightforward conversation.
          </p>

          {/* Contact options */}
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            <a
              href="mailto:FordFox@sailfishfinancial.com"
              className="group border border-white/8 hover:border-teal-600/40 rounded-xl p-6 flex items-start gap-4 transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <div className="text-teal-500 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-1">Email</p>
                <p className="text-teal-400/70 text-sm group-hover:text-teal-400 transition-colors break-all">
                  FordFox@sailfishfinancial.com
                </p>
                <p className="text-white/25 text-xs mt-1.5">Usually reply same day</p>
              </div>
            </a>

            <a
              href="tel:7705809850"
              className="group border border-white/8 hover:border-teal-600/40 rounded-xl p-6 flex items-start gap-4 transition-colors"
              style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
            >
              <div className="text-teal-500 mt-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium mb-1">Phone</p>
                <p className="text-teal-400/70 text-sm group-hover:text-teal-400 transition-colors">
                  (770) 580-9850
                </p>
                <p className="text-white/25 text-xs mt-1.5">Mon–Fri, 9am–5pm ET</p>
              </div>
            </a>
          </div>

          <ContactForm />

          <p className="mt-10 text-center text-white/20 text-xs">
            Based in Tallahassee, FL &nbsp;·&nbsp; 650 W Gaines St
          </p>

        </section>
      </main>
      <Footer />
    </>
  )
}
