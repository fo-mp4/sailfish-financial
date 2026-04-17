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
        boxShadow: 'inset 0 0 0 10px #030D1E',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Spinning sailfish logo */}
      <img
        src="/sailfish-logo.png"
        alt=""
        style={{
          width: 88,
          height: 88,
          objectFit: 'contain',
          animation: 'spin 1s linear infinite',
        }}
      />

      {/* Brand name */}
      <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 400, fontSize: '1.5rem', color: 'white', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Sailfish
        </div>
        <div style={{ fontFamily: 'var(--font-cinzel)', fontWeight: 700, fontSize: '1.5rem', color: '#14A8C8', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
          Financial
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
