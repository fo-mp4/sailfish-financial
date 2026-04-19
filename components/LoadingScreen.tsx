'use client'

import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible')

  useEffect(() => {
    const t = setTimeout(() => setPhase('fading'), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase === 'fading') {
      const t = setTimeout(() => setPhase('gone'), 600)
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
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Radial glow behind logo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        width: 320,
        height: 320,
        background: 'radial-gradient(circle, rgba(14,143,172,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Logo — fades + lifts in */}
      <img
        src="/sailfish-logo.png"
        alt=""
        style={{
          width: 72,
          height: 72,
          objectFit: 'contain',
          animation: 'sf-logo-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          opacity: 0,
        }}
      />

      {/* Brand name — staggered in */}
      <div style={{
        textAlign: 'center',
        lineHeight: 1.15,
        marginTop: '1.25rem',
        animation: 'sf-text-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        opacity: 0,
      }}>
        <div style={{
          fontFamily: 'var(--font-cinzel)',
          fontWeight: 400,
          fontSize: '1.4rem',
          color: 'white',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>
          Sailfish
        </div>
        <div style={{
          fontFamily: 'var(--font-cinzel)',
          fontWeight: 700,
          fontSize: '1.4rem',
          color: '#14A8C8',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Financial
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        marginTop: '2.5rem',
        width: 120,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: 1,
        overflow: 'hidden',
        animation: 'sf-text-in 0.4s ease 0.4s forwards',
        opacity: 0,
      }}>
        <div style={{
          height: '100%',
          backgroundColor: '#14A8C8',
          borderRadius: 1,
          animation: 'sf-bar 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s forwards',
          width: 0,
        }} />
      </div>

      <style>{`
        @keyframes sf-logo-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes sf-text-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes sf-bar {
          from { width: 0%;   opacity: 1; }
          to   { width: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  )
}
