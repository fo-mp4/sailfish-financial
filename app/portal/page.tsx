'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'

export default function PortalLogin() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/portal/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* ── Left panel — brand side ── */}
      <div className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Ocean gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #071830 0%, #0D2040 40%, #071830 100%)',
          }}
        />
        {/* Teal radial glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-teal-600/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-teal-400/5 blur-[80px] rounded-full pointer-events-none" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Brand mark */}
        <div className="relative flex items-center gap-3">
          <Logo className="h-11 w-auto" />
          <span className="flex flex-col leading-none">
            <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 400, fontSize: '0.95rem', color: 'white', letterSpacing: '0.2em' }}>
              Sailfish
            </span>
            <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: '1.05rem', color: '#14A8C8', letterSpacing: '0.25em' }}>
              Financial
            </span>
          </span>
        </div>

        {/* Center copy */}
        <div className="relative">
          <p
            className="text-white/80 text-4xl font-serif leading-snug mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Your books,<br />
            <span className="text-teal-400 italic">handled.</span>
          </p>
          <p className="text-silver/40 text-sm leading-relaxed max-w-xs">
            Real-time financial reporting, delivered every month. Everything you need to understand your business — nothing you don&apos;t.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="relative flex flex-col gap-3">
          {[
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Bank-level security' },
            { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', label: '15 financial charts per report' },
            { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Reports delivered by the 10th' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-600/15 border border-teal-600/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={icon} />
                </svg>
              </div>
              <span className="text-silver/50 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form side ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative"
        style={{ background: 'linear-gradient(160deg, #0D2040 0%, #071830 100%)' }}>
        {/* Mobile-only teal glow */}
        <div className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-teal-600/10 blur-[100px] rounded-full pointer-events-none" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative w-full max-w-sm">
          {/* Mobile brand header */}
          <div className="lg:hidden flex flex-col items-center mb-10">
            <Logo className="h-12 w-auto mb-4" />
            <span className="flex flex-col items-center leading-none gap-0.5">
              <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 400, fontSize: '0.9rem', color: 'white', letterSpacing: '0.2em' }}>Sailfish</span>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: '1rem', color: '#14A8C8', letterSpacing: '0.25em' }}>Financial</span>
            </span>
            <p className="text-silver/40 text-xs mt-3 tracking-widest uppercase">Client Portal</p>
          </div>

          {/* Form header */}
          <div className="mb-8">
            <h2 className="text-white font-semibold text-2xl mb-1.5">Welcome back</h2>
            <p className="text-silver/40 text-sm">Sign in to access your financial dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-silver/50 text-xs font-medium mb-2 tracking-widest uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-navy-800/80 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-teal-500/60 focus:bg-navy-800 transition-all"
                placeholder="you@yourbusiness.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-silver/50 text-xs font-medium tracking-widest uppercase">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-navy-800/80 border border-white/8 rounded-xl px-4 py-3.5 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-teal-500/60 focus:bg-navy-800 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-colors mt-1 relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? 'Signing in…' : 'Sign in'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>

          <p className="text-center text-silver/25 text-xs mt-8 leading-relaxed">
            Don&apos;t have access yet?{' '}
            <a href="mailto:FordFox@sailfishfinancial.com" className="text-silver/50 hover:text-teal-400 transition-colors">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
