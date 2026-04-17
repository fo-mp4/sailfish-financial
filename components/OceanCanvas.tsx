'use client'

import { useEffect, useRef } from 'react'

interface Caustic {
  x: number; y: number
  vx: number; vy: number
  r: number; opacity: number
  phase: number
}

export default function OceanCanvas({ scrollY = 0 }: { scrollY?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollRef  = useRef(scrollY)

  useEffect(() => { scrollRef.current = scrollY }, [scrollY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let t = 0

    // Caustic light patches (the dappled light seen from underwater)
    const caustics: Caustic[] = Array.from({ length: 9 }, (_, i) => ({
      x:       (i / 9) + Math.random() * 0.2,
      y:       0.05 + Math.random() * 0.55,
      vx:      (Math.random() - 0.5) * 0.00025,
      vy:      (Math.random() - 0.5) * 0.00010,
      r:       0.18 + Math.random() * 0.22,
      opacity: 0.018 + Math.random() * 0.028,
      phase:   Math.random() * Math.PI * 2,
    }))

    function resize() {
      if (!canvas) return
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function draw() {
      if (!canvas || !ctx) return
      const W = canvas.width
      const H = canvas.height
      if (!W || !H) { raf = requestAnimationFrame(draw); return }

      const scroll = scrollRef.current

      ctx.clearRect(0, 0, W, H)

      // ── Deep ocean base gradient ──────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0,    '#011020')
      bg.addColorStop(0.35, '#010C18')
      bg.addColorStop(0.75, '#000A12')
      bg.addColorStop(1,    '#071830')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      // ── Subtle side vignettes ────────────────────────────────
      const leftVig = ctx.createLinearGradient(0, 0, W * 0.25, 0)
      leftVig.addColorStop(0, 'rgba(0,4,10,0.55)')
      leftVig.addColorStop(1, 'rgba(0,4,10,0)')
      ctx.fillStyle = leftVig
      ctx.fillRect(0, 0, W * 0.25, H)

      const rightVig = ctx.createLinearGradient(W * 0.75, 0, W, 0)
      rightVig.addColorStop(0, 'rgba(0,4,10,0)')
      rightVig.addColorStop(1, 'rgba(0,4,10,0.45)')
      ctx.fillStyle = rightVig
      ctx.fillRect(W * 0.75, 0, W * 0.25, H)

      // ── Caustic light patches ─────────────────────────────────
      for (const c of caustics) {
        // Drift
        c.x += c.vx
        c.y += c.vy * (1 + scroll * 0.0005)
        if (c.x < -0.25) c.x = 1.1
        if (c.x >  1.1)  c.x = -0.25
        if (c.y < -0.1)  c.y = 0.7
        if (c.y >  0.7)  c.y = -0.1

        const cx = c.x * W
        const cy = c.y * H + scroll * 0.08
        const radius = c.r * Math.min(W, H)
        const pulse  = c.opacity * (0.7 + 0.3 * Math.sin(t * 0.4 + c.phase))

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
        g.addColorStop(0,   `rgba(20,168,200,${pulse})`)
        g.addColorStop(0.4, `rgba(12,122,148,${pulse * 0.35})`)
        g.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, W, H)
      }

      // ── Wave lines (horizontal sinusoids) ─────────────────────
      const waveConfigs = [
        { yFrac: 0.10, amp: 9,  freq: 0.0025, speed: 0.22, opacity: 0.05, width: 1.2 },
        { yFrac: 0.22, amp: 11, freq: 0.0020, speed: 0.16, opacity: 0.04, width: 1.0 },
        { yFrac: 0.35, amp: 7,  freq: 0.0030, speed: 0.28, opacity: 0.03, width: 0.8 },
        { yFrac: 0.48, amp: 14, freq: 0.0015, speed: 0.12, opacity: 0.025, width: 0.7 },
        { yFrac: 0.60, amp: 6,  freq: 0.0035, speed: 0.32, opacity: 0.02, width: 0.6 },
      ]

      for (const w of waveConfigs) {
        const baseY = H * w.yFrac + scroll * 0.06
        ctx.beginPath()
        ctx.moveTo(0, baseY)
        for (let x = 0; x <= W; x += 3) {
          const dy =
            Math.sin(x * w.freq + t * w.speed) * w.amp +
            Math.sin(x * w.freq * 1.9 - t * w.speed * 0.55) * w.amp * 0.38
          ctx.lineTo(x, baseY + dy)
        }
        ctx.strokeStyle = `rgba(20,168,200,${w.opacity})`
        ctx.lineWidth   = w.width
        ctx.stroke()
      }

      // ── Surface shimmer band at very top ──────────────────────
      const shimmer = ctx.createLinearGradient(0, 0, 0, H * 0.08)
      shimmer.addColorStop(0, `rgba(20,168,200,${0.06 + 0.04 * Math.sin(t * 0.5)})`)
      shimmer.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = shimmer
      ctx.fillRect(0, 0, W, H * 0.08)

      t  += 0.012
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
