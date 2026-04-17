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
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center px-4">
      {/* Subtle grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Teal glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <Logo className="h-12 w-auto mb-4" />
          <h1 className="font-display font-bold text-white text-2xl tracking-wide">
            Sailfish <span className="font-light text-teal-400">Financial</span>
          </h1>
          <p className="text-silver/40 text-sm mt-1 tracking-wide">Client Portal</p>
        </div>

        {/* Card */}
        <div className="bg-navy-900 border border-white/5 rounded-xl p-8">
          <h2 className="text-white font-semibold text-lg mb-1">Sign in</h2>
          <p className="text-silver/40 text-sm mb-6">Access your financial dashboard</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-silver/60 text-xs font-medium mb-1.5 tracking-wide uppercase">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-teal-600 transition-colors"
                placeholder="you@yourbusiness.com"
              />
            </div>

            <div>
              <label className="block text-silver/60 text-xs font-medium mb-1.5 tracking-wide uppercase">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-teal-600 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors mt-1"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-silver/25 text-xs mt-6">
          Need access? Contact{' '}
          <a href="mailto:FordFox@sailfishfinancial.com" className="text-silver/40 hover:text-silver/60 transition-colors">
            FordFox@sailfishfinancial.com
          </a>
        </p>
      </div>
    </div>
  )
}
