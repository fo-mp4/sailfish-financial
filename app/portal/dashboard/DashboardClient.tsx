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
  revenue_change:    number   // % vs prior month
  expenses_change:   number
  net_income_change: number
  cash_change:       number
}

interface ChartMeta {
  key:     string   // e.g. "01_revenue_trend"
  label:   string
  section: string
  wide:    boolean  // span 2 columns?
}

// Chart display order and grouping
const CHART_CATALOG: ChartMeta[] = [
  // Revenue & Income
  { key: '01_revenue_trend',    label: 'Revenue Trend',             section: 'Revenue & Income',  wide: true  },
  { key: '02_ytd_revenue',      label: 'YTD Revenue vs Prior Year', section: 'Revenue & Income',  wide: false },
  { key: '03_revenue_by_source',label: 'Revenue by Source',         section: 'Revenue & Income',  wide: false },
  // Expenses
  { key: '04_expense_breakdown',label: 'Expense Breakdown',         section: 'Expenses',          wide: false },
  { key: '05_top_expenses',     label: 'Top Expense Categories',    section: 'Expenses',          wide: false },
  { key: '06_mom_expenses',     label: 'Month-over-Month Expenses', section: 'Expenses',          wide: true  },
  // Profitability
  { key: '07_net_income',       label: 'Net Income Trend',          section: 'Profitability',     wide: true  },
  { key: '08_margin_trend',     label: 'Profit Margin Trend',       section: 'Profitability',     wide: false },
  { key: '09_opex_ratio',       label: 'Operating Expense Ratio',   section: 'Profitability',     wide: false },
  // Cash Flow
  { key: '10_cash_flow',        label: 'Monthly Cash Flow',         section: 'Cash Flow',         wide: true  },
  { key: '11_cash_position',    label: 'Cash Position Over Time',   section: 'Cash Flow',         wide: false },
  { key: '12_cash_runway',      label: 'Cash Runway (90-Day)',      section: 'Cash Flow',         wide: false },
  // Tax Planning
  { key: '13_tax_tracker',      label: 'Quarterly Tax Tracker',     section: 'Tax Planning',      wide: false },
  { key: '14_ytd_tax_summary',  label: 'YTD Tax Summary',          section: 'Tax Planning',      wide: false },
  // Receivables
  { key: '15_ar_aging',         label: 'A/R Aging',                 section: 'Receivables',       wide: true  },
]

const SECTIONS = CHART_CATALOG.map(c => c.section).filter((s, i, a) => a.indexOf(s) === i)

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
  const router  = useRouter()
  const supabase = createClient()

  const [month, setMonth]         = useState(availableMonths[0] ?? '')
  const [kpi, setKpi]             = useState<KPI | null>(null)
  const [chartUrls, setChartUrls] = useState<Record<string, string>>({})
  const [loading, setLoading]     = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [showPwForm, setShowPwForm]   = useState(false)
  const [newPw, setNewPw]             = useState('')
  const [confirmPw, setConfirmPw]     = useState('')
  const [pwError, setPwError]         = useState('')
  const [pwSuccess, setPwSuccess]     = useState(false)
  const [pwLoading, setPwLoading]     = useState(false)

  const loadMonthData = useCallback(async (ym: string) => {
    if (!ym) return
    setLoading(true)
    setKpi(null)
    setChartUrls({})

    const prefix = `${userId}/${ym}`

    // Fetch KPI JSON
    try {
      const { data } = await supabase.storage.from('client-charts').download(`${prefix}/kpi.json`)
      if (data) {
        const text = await data.text()
        setKpi(JSON.parse(text))
      }
    } catch { /* kpi not uploaded yet */ }

    // Build signed URLs for each chart
    const urls: Record<string, string> = {}
    await Promise.all(
      CHART_CATALOG.map(async ({ key }) => {
        const path = `${prefix}/${key}.png`
        const { data } = await supabase.storage
          .from('client-charts')
          .createSignedUrl(path, 60 * 60) // 1 hour
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
    setTimeout(() => { setShowPwForm(false); setPwSuccess(false) }, 2000)
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
      <header className="sticky top-0 z-50 bg-navy-800/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-7 w-auto" />
            <span className="font-display font-bold text-white tracking-wide">
              Sailfish <span className="font-light text-teal-400">Financial</span>
            </span>
            <span className="hidden sm:block text-white/15 mx-1">·</span>
            <span className="hidden sm:block text-silver/40 text-sm">Client Portal</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="hidden sm:block text-silver/40 text-sm">{contactName || businessName}</span>
            <button
              onClick={() => { setShowPwForm(v => !v); setPwError(''); setPwSuccess(false) }}
              className="text-silver/40 hover:text-silver/70 text-sm transition-colors"
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

      <main className="relative max-w-7xl mx-auto px-6 py-10">
        {/* ── Page header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-bold text-white text-2xl">{businessName}</h1>
            <p className="text-silver/40 text-sm mt-0.5">Financial Dashboard</p>
          </div>

          {/* Month selector */}
          {availableMonths.length > 0 ? (
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
          ) : null}
        </div>

        {/* ── Empty state ── */}
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

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-teal-600/30 border-t-teal-600 rounded-full animate-spin" />
          </div>
        )}

        {/* ── No data for selected month ── */}
        {noData && availableMonths.length > 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-silver/40 text-sm">No reports uploaded for {formatMonth(month)} yet.</p>
          </div>
        )}

        {/* ── KPI Cards ── */}
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

        {/* ── Chart Sections ── */}
        {!loading && Object.keys(chartUrls).length > 0 && SECTIONS.map(section => {
          const sectionCharts = CHART_CATALOG.filter(
            c => c.section === section && chartUrls[c.key]
          )
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
                      <img
                        src={chartUrls[key]}
                        alt={label}
                        className="w-full rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* ── Change Password Panel ── */}
        {showPwForm && (
          <div className="mb-10 max-w-sm">
            <div className="bg-navy-700/60 border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-semibold text-sm mb-4">Change Password</h3>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-silver/50 text-xs font-medium mb-1.5 tracking-wide uppercase">New Password</label>
                  <input
                    type="password"
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full bg-navy-700/60 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-teal-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-silver/50 text-xs font-medium mb-1.5 tracking-wide uppercase">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={e => setConfirmPw(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-navy-700/60 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-silver/20 focus:outline-none focus:border-teal-600 transition-colors"
                  />
                </div>
                {pwError   && <p className="text-red-400 text-xs">{pwError}</p>}
                {pwSuccess  && <p className="text-teal-400 text-xs">Password updated successfully.</p>}
                <div className="flex gap-3 mt-1">
                  <button
                    onClick={changePassword}
                    disabled={pwLoading}
                    className="flex-1 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                  >
                    {pwLoading ? 'Saving…' : 'Save Password'}
                  </button>
                  <button
                    onClick={() => { setShowPwForm(false); setPwError(''); setNewPw(''); setConfirmPw('') }}
                    className="px-4 text-silver/40 hover:text-silver/70 text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
