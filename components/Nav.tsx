'use client'

import Link from 'next/link'
import Logo from './Logo'
import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute top-0 inset-x-0 z-50" style={{ background: 'linear-gradient(to bottom, rgba(7,24,48,0.55) 0%, transparent 100%)' }}>
      <nav className="w-full px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="h-11 w-auto" />
          <span className="flex flex-col leading-none">
            <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 400, fontSize: '0.95rem', color: 'white', letterSpacing: '0.2em' }}>Sailfish</span>
            <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: '1.05rem', color: '#14A8C8', letterSpacing: '0.25em' }}>Financial</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#services" className="text-sm text-silver/70 hover:text-white transition-colors">Services</Link>
          <Link href="/#why-us"   className="text-sm text-silver/70 hover:text-white transition-colors">Why Us</Link>
          <Link href="/contact"   className="text-sm text-silver/70 hover:text-white transition-colors">Contact</Link>
          <Link href="/portal"    className="text-sm text-silver/70 hover:text-white transition-colors">Client Portal</Link>
          <Link
            href="/get-started"
            className="text-sm font-medium bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4" style={{ backgroundColor: 'rgba(7,24,48,0.95)', backdropFilter: 'blur(8px)' }}>
          <Link href="/#services"    className="text-sm text-silver/70 hover:text-white py-2" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/#why-us"      className="text-sm text-silver/70 hover:text-white py-2" onClick={() => setOpen(false)}>Why Us</Link>
          <Link href="/contact"      className="text-sm text-silver/70 hover:text-white py-2" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/portal"       className="text-sm text-silver/70 hover:text-white py-2" onClick={() => setOpen(false)}>Client Portal</Link>
          <Link href="/get-started"  className="text-sm font-medium bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded text-center" onClick={() => setOpen(false)}>Get Started</Link>
        </div>
      )}
    </header>
  )
}
