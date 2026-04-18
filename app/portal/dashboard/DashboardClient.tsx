'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Logo from '@/components/Logo'

// ─── Types ────────────────────────────────────────────────────────────────────

interface KPI {
  revenue:           number
  expenses:          number
  net_income:        number
  cash_position:     number
  revenue_change:    number
  expenses_change:   number
  net_income_change: number
  cash_change:       number
}

interface ChartMeta {
  key:     string
  label:   string
  section: string
  wide:    boolean
}

const CHART_CATALOG: ChartMeta[] = [
  { key: '01_revenue_trend',    label: 'Revenue Trend',             section: 'Revenue & Income',  wide: true  },
  { key: '02_ytd_revenue',      label: 'YTD Revenue vs Prior Year', section: 'Revenue & Income',  wide: false },
  { key: '03_revenue_by_source',label: 'Revenue by Source',         section: 'Revenue & Income',  wide: false },
  { key: '04_expense_breakdown',label: 'Expense Breakdown',         section: 'Expenses',          wide: false },
  { key: '05_top_expenses',     label: 'Top Expense Categories',    section: 'Expenses',          wide: false },
  { key: '06_mom_expenses',     label: 'Month-over-Month Expenses', section: 'Expenses',          wide: true  },
  { key: '07_net_income',       label: 'Net Income Trend',          section: 'Profitability',     wide: true  },
  { key: '08_margin_trend',     label: 'Profit Margin Trend',       section: 'Profitability',     wide: false },
  { key: '09_opex_ratio',       label: 'Operating Expense Ratio',   section: 'Profitability',     wide: false },
  { key: '10_cash_flow',        label: 'Monthly Cash Flow',         section: 'Cash Flow',         wide: true  },
  { key: '11_cash_position',    label: 'Cash Position Over Time',   section: 'Cash Flow',         wide: false },
  { key: '12_cash_runway',      label: 'Cash Runway (90-Day)',      section: 'Cash Flow',         wide: false },
  { key: '13_tax_tracker',      label: 'Quarterly Tax Tracker',     section: 'Tax Planning',      wide: false },
  { key: '14_ytd_tax_summary',  label: 'YTD Tax Summary',           section: 'Tax Planning',      wide: false },
  { key: '15_ar_aging',         label: 'A/R Aging',                 section: 'Receivables',       wide: true  },
]

const SECTIONS = CHART_CATALOG.map(c => c.section).filter((s, i, a) => a.indexOf(s) === i)

type Tab = 'reports' | 'billing' | 'settings'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function formatMonth(ym: string) {
  const [y, m] = ym.split('-')
  return new Date(+y, +m - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function ChangeChip({ pct }: { pct: number }) {
  const up = pct >= 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${up ? 'text-teal-400' : 'text-red-400'}`}>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
          d={up ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
      </svg>
      {Math.abs(pct).toFixed(1)}%
    </span>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  userId:          string
  businessName:    string
  contactName:     string
  availableMonths: string[]
}

export default function DashboardClient({ userId, businessName, contactName, availableMonths }: Props) {
  const router   = useRouter()
  const supabase = createClient()

  const [tab, setTab]             = useState<Tab>('reports')
  const [month, setMonth]         = useState(availableMonths[0] ?? '')
  const [kpi, setKpi]             = useState<KPI | null>(null)
  const [chartUrls, setChartUrls] = useState<Record<string, string>>({})
  const [loading, setLoading]     = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [userEmail, setUserEmail]   = useState('')

  // Password change state
  const [newPw, setNewPw]         = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwError, setPwError]     = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)
  const [pwLoading, setPwLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? ''))
  }, [supabase])

  const loadMonthData = useCallback(async (ym: string) => {
    if (!ym) return
    setLoading(true)
    setKpi(null)
    setChartUrls({})

    const prefix = `${userId}/${ym}`

    try {
      const { data } = await supabase.storage.from('client-charts').download(`${prefix}/kpi.json`)
      if (data) setKpi(JSON.parse(await data.text()))
    } catch { /* kpi not yet uploaded */ }

    const urls: Record<string, string> = {}
    await Promise.all(
      CHART_CATALOG.map(async ({ key }) => {
        const { data } = await supabase.storage
          .from('client-charts')
          .createSignedUrl(`${prefix}/${key}.png`, 60 * 60)
        if (data?.signedUrl) urls[key] = data.signedUrl
      })
    )
    setChartUrls(urls)
    setLoading(false)
  }, [userId, supabase])

  useEffect(() => { loadMonthData(month) }, [month, loadMonthData])

  async function changePassword() {
    setPwError('')
    setPwSuccess(false)
    if (newPw.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    if (newPw !== confirmPw) { setPwError('Passwords do not match.'); return }
    setPwLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPw })
    setPwLoading(false)
    if (error) { setPwError(error.message); return }
    setPwSuccess(true)
    setNewPw('')
    setConfirmPw('')
    setTimeout(() => setPwSuccess(false), 3000)
  }

  async function signOut() {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push('/portal')
    router.refresh()
  }

  const noData = !loading && !kpi && Object.keys(chartUrls).length === 0

  return (
    <div className="min-h-screen bg-navy-900 text-silver">
      {/* Subtle grid */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Nav ── */}
      <header className="absolute top-0 inset-x-0 z-50" style={{ background: 'linear-gradient(to bottom, rgba(7,24,48,0.6) 0%, transparent 100%)' }}>
        <div className="w-full px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-11 w-auto" />
            <span className="flex flex-col leading-none">
              <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 400, fontSize: '0.95rem', color: 'white', letterSpacing: '0.2em' }}>Sailfish</span>
              <span style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: '1.05rem', color: '#14A8C8', letterSpacing: '0.25em' }}>Financial</span>
            </span>
            <span className="hidden sm:block text-white/15 mx-2">·</span>
            <span className="hidden sm:block text-silver/50 text-sm">Client Portal</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden sm:block text-silver/40 text-sm">{contactName || businessName}</span>
            <button
              onClick={() => setTab('settings')}
              className={`text-sm transition-colors ${tab === 'settings' ? 'text-teal-400' : 'text-silver/40 hover:text-silver/70'}`}
            >
              Settings
            </button>
            <button
              onClick={signOut}
              disabled={signingOut}
              className="text-silver/40 hover:text-silver/70 text-sm transition-colors disabled:opacity-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-10">
        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-bold text-white text-2xl">{businessName}</h1>
            <p className="text-silver/40 text-sm mt-0.5">Financial Dashboard</p>
          </div>

          {/* Month selector — only on reports tab */}
          {tab === 'reports' && availableMonths.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-silver/40 text-xs font-medium tracking-wide uppercase">Period</label>
              <select
                value={month}
                onChange={e => setMonth(e.target.value)}
                className="bg-navy-700/60 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-teal-600 transition-colors"
              >
                {availableMonths.map(m => (
                  <option key={m} value={m}>{formatMonth(m)}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* ── Tab bar ── */}
        <div className="flex items-center gap-1 mb-8 border-b border-white/5">
          {(['reports', 'billing', 'settings'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t
                  ? 'border-teal-500 text-teal-400'
                  : 'border-transparent text-silver/40 hover:text-silver/70'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            REPORTS TAB
        ══════════════════════════════════════════════════════ */}
        {tab === 'reports' && (
          <>
            {availableMonths.length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-white font-semibold text-lg mb-2">Your reports are on the way</h2>
                <p className="text-silver/40 text-sm max-w-xs">
                  Your first financial reports will appear here once your books are processed for the month.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-teal-600/30 border-t-teal-600 rounded-full animate-spin" />
              </div>
            )}

            {noData && availableMonths.length > 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-silver/40 text-sm">No reports uploaded for {formatMonth(month)} yet.</p>
              </div>
            )}

            {!loading && kpi && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                  { label: 'Revenue',       value: kpi.revenue,       change: kpi.revenue_change,    positive: true  },
                  { label: 'Expenses',      value: kpi.expenses,      change: kpi.expenses_change,   positive: false },
                  { label: 'Net Income',    value: kpi.net_income,    change: kpi.net_income_change, positive: true  },
                  { label: 'Cash Position', value: kpi.cash_position, change: kpi.cash_change,       positive: true  },
                ].map(({ label, value, change, positive }) => (
                  <div key={label} className="bg-navy-700/60 border border-white/5 rounded-xl p-5">
                    <p className="text-silver/40 text-xs font-medium tracking-wide uppercase mb-2">{label}</p>
                    <p className={`font-display font-bold text-2xl mb-1 ${value >= 0 ? 'text-white' : 'text-red-400'}`}>
                      {fmt(value)}
                    </p>
                    <div className="flex items-center gap-1 text-silver/30 text-xs">
                      <ChangeChip pct={positive ? change : -change} />
                      <span>vs last month</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && Object.keys(chartUrls).length > 0 && SECTIONS.map(section => {
              const sectionCharts = CHART_CATALOG.filter(c => c.section === section && chartUrls[c.key])
              if (sectionCharts.length === 0) return null
              return (
                <div key={section} className="mb-12">
                  <div className="flex items-center gap-3 mb-5">
                    <h2 className="text-white font-semibold text-base">{section}</h2>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sectionCharts.map(({ key, label, wide }) => (
                      <div
                        key={key}
                        className={`bg-navy-700/60 border border-white/5 rounded-xl overflow-hidden ${wide ? 'md:col-span-2' : ''}`}
                      >
                        <div className="px-5 py-3.5 border-b border-white/5">
                          <p className="text-silver/60 text-xs font-medium tracking-wide uppercase">{label}</p>
                        </div>
                        <div className="p-4">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={chartUrls[key]} alt={label} className="w-full rounded-lg" loading="lazy" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </>
        )}

        {/* ══════════════════════════════════════════════════════
            BILLING TAB
        ══════════════════════════════════════════════════════ */}
        {tab === 'billing' && (
          <div className="max-w-2xl space-y-6">
            {/* Current plan */}
            <div className="bg-navy-700/60 border border-white/5 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-silver/40 text-xs font-medium tracking-wide uppercase mb-1">Current Plan</p>
                  <h3 className="text-white font-semibold text-lg">Monthly Bookkeeping</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 bg-teal-600/15 text-teal-400 text-xs font-medium px-3 py-1 rounded-full border border-teal-600/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5">
                {[
                  { label: 'Billing Cycle', value: 'Monthly' },
                  { label: 'Reports Delivered', value: 'By the 10th' },
                  { label: 'Includes', value: '15 financial charts + KPI summary' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-silver/30 text-xs tracking-wide uppercase mb-1">{label}</p>
                    <p className="text-silver/80 text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What's included */}
            <div className="bg-navy-700/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold text-sm mb-4">What&apos;s Included</h3>
              <ul className="space-y-3">
                {[
                  'Monthly transaction categorization & reconciliation',
                  'Profit & loss statement',
                  'Cash flow analysis',
                  'Tax planning tracker (quarterly estimates)',
                  'A/R aging report',
                  'Dedicated portal access with 15 interactive charts',
                  'Direct access to your bookkeeper',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-silver/60">
                    <svg className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Billing contact */}
            <div className="bg-navy-700/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold text-sm mb-1">Billing Questions</h3>
              <p className="text-silver/40 text-sm mb-4">
                For invoices, payment methods, or changes to your plan, reach out directly.
              </p>
              <a
                href="mailto:FordFox@sailfishfinancial.com"
                className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                FordFox@sailfishfinancial.com
              </a>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            SETTINGS TAB
        ══════════════════════════════════════════════════════ */}
        {tab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            {/* Account info */}
            <div className="bg-navy-700/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold text-sm mb-4">Account</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-silver/30 text-xs tracking-wide uppercase mb-1">Business</p>
                  <p className="text-silver/80 text-sm">{businessName}</p>
                </div>
                <div>
                  <p className="text-silver/30 text-xs tracking-wide uppercase mb-1">Contact Name</p>
                  <p className="text-silver/80 text-sm">{contactName || '—'}</p>
                </div>
                <div>
                  <p className="text-silver/30 text-xs tracking-wide uppercase mb-1">Email</p>
                  <p className="text-silver/80 text-sm">{userEmail || '—'}</p>
                </div>
              </div>
            </div>

            {/* Change password */}
            <div className="bg-navy-700/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold text-sm mb-4">Change Password</h3>
              <div className="space-y-3 max-w-sm">
                <div>
                  <label className="block text-silver/50 text-xs font-medium mb-1.5 tracking-wide uppercase">New Password</label>
                  <input
                    type="password"
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full bg-navy-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-teal-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-silver/50 text-xs font-medium mb-1.5 tracking-wide uppercase">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={e => setConfirmPw(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-navy-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-teal-600 transition-colors"
                  />
                </div>
                {pwError   && <p className="text-red-400 text-xs">{pwError}</p>}
                {pwSuccess  && <p className="text-teal-400 text-xs">Password updated successfully.</p>}
                <button
                  onClick={changePassword}
                  disabled={pwLoading}
                  className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
                >
                  {pwLoading ? 'Saving…' : 'Update Password'}
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-navy-700/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold text-sm mb-1">Need Help?</h3>
              <p className="text-silver/40 text-sm mb-4">
                Questions about your account or reports? Get in touch.
              </p>
              <a
                href="mailto:FordFox@sailfishfinancial.com"
                className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                FordFox@sailfishfinancial.com
              </a>
            </div>

            {/* Sign out */}
            <div className="bg-navy-700/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold text-sm mb-1">Sign Out</h3>
              <p className="text-silver/40 text-sm mb-4">Sign out of the client portal on this device.</p>
              <button
                onClick={signOut}
                disabled={signingOut}
                className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/20 text-red-400 hover:text-red-300 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
              >
                {signingOut ? 'Signing out…' : 'Sign Out'}
              </button>
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-silver/25 text-xs">
          <span>Sailfish Financial · Tallahassee, FL</span>
          <span>Questions? <a href="mailto:FordFox@sailfishfinancial.com" className="hover:text-silver/50 transition-colors">FordFox@sailfishfinancial.com</a></span>
        </footer>
      </main>
    </div>
  )
}
