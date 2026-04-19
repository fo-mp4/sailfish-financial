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
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-6 py-12 relative">
      {/* Teal glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-teal-600/10 blur-[120px] rounded-full pointer-events-none" />
      {/* Subtle grid */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Brand header */}
        <div className="flex flex-col items-center mb-10">
          <Logo className="h-12 w-auto mb-4" />
          <span className="flex flex-col items-center leading-none gap-0.5">
            <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 400, fontSize: '0.9rem', color: 'white', letterSpacing: '0.08em' }}>Sailfish</span>
            <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: '1rem', color: '#14A8C8', letterSpacing: '0.1em' }}>Financial</span>
          </span>
          <p className="text-silver/30 text-xs mt-3 tracking-widest uppercase">Client Portal</p>
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
            <label className="block text-silver/50 text-xs font-medium mb-2 tracking-widest uppercase">
              Password
            </label>
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
            className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl transition-colors mt-1"
          >
            {loading ? 'Signing in…' : 'Sign in'}
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
  )
}
