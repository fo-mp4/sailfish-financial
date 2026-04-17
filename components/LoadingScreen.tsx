'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')

  useEffect(() => {
    const t = setTimeout(() => setPhase('fading'), 1400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase === 'fading') {
      const t = setTimeout(() => setPhase('gone'), 500)
      return () => clearTimeout(t)
    }
  }, [phase])

  if (phase === 'gone') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: '#071830',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Spinning sailfish logo */}
      <img
        src="/sailfish-logo.png"
        alt=""
        style={{
          width: 64,
          height: 64,
          objectFit: 'contain',
          animation: 'spin 1s linear infinite',
        }}
      />

      {/* Brand name */}
      <p
        style={{
          fontFamily: 'var(--font-bodoni)',
          fontSize: '1rem',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.75)',
          textTransform: 'uppercase',
          fontWeight: 400,
        }}
      >
        Sailfish <span style={{ color: '#14A8C8' }}>Financial</span>
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
