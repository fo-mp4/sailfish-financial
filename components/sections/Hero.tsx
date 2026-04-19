'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => { setLoaded(true) }, [])

  return (
    <section style={{ position: 'relative', backgroundColor: '#071830' }}>
      {/* Full image — no cropping */}
      <img
        src="/ocean-hero-1.jpg"
        alt=""
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />

      {/* Gradient at bottom so Services section blends in */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '35%',
        background: 'linear-gradient(to bottom, transparent, #071830)',
        pointerEvents: 'none',
      }} />

      {/* Text overlay */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-start', zIndex: 10 }}>
        <div className="w-full max-w-6xl mx-auto px-6 pt-36 pb-40">
          <div className="max-w-2xl">

            <p
              className={`text-teal-400 text-xs font-medium uppercase tracking-[0.22em] mb-7
                transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '100ms' }}
            >
              Tallahassee, FL · US Small Businesses
            </p>

            <h1
              className={`text-white leading-[1.05] mb-8
                transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
                fontWeight: 700,
                transitionDelay: '180ms',
                textShadow: '0 2px 32px rgba(7,24,48,0.85)',
              }}
            >
              Your books,
              <br />
              <em style={{ color: '#14A8C8', fontStyle: 'italic', fontWeight: 400 }}>
                handled.
              </em>
            </h1>

            <p
              className={`text-white/85 leading-relaxed mb-10 max-w-md
                transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ fontSize: '1.05rem', transitionDelay: '300ms', textShadow: '0 1px 16px rgba(7,24,48,0.9)' }}
            >
              Flat-rate monthly bookkeeping for US small businesses.
              Accurate records, clean reports, and no surprises at tax time.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4
                transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: '420ms' }}
            >
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium px-7 py-3.5 rounded transition-colors text-sm"
              >
                Get started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center text-white hover:text-teal-300 font-medium px-7 py-3.5 rounded border border-white/40 hover:border-teal-400 transition-colors text-sm"
              >
                See what&apos;s included
              </Link>
            </div>

            <div
              className={`mt-12 flex items-center gap-6 text-white/70 text-xs tracking-wide
                transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ transitionDelay: '560ms' }}
            >
              <span>Flat monthly pricing</span>
              <span className="text-white/30">·</span>
              <span>Books by the 5th</span>
              <span className="text-white/30">·</span>
              <span>Cancel anytime</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
