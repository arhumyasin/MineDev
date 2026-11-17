'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

/**
 * GlobalSection: "We serve globally" section.
 *
 * Dotted world map (canvas) + arc paths + glowing pins + rotating
 * "WE ARE" badge + squiggly line. The map dots are generated from
 * continent outlines (same data as the original site): they sweep in
 * left-to-right when the section scrolls into view, then gently twinkle.
 *
 * The green pins and the arcs now wait for that same scroll moment.
 * Each pin pops in exactly when the dot sweep reaches its position
 * (left to right), and the arcs fade in right after.
 */

// Continent outlines as [lon, lat] pairs (from the original site).
const LAND: number[][] = [[-168, 66, -156, 71, -125, 70, -95, 69, -82, 68, -80, 63, -65, 60, -56, 52, -60, 47, -66, 44, -70, 42, -74, 40, -76, 35, -81, 31, -80, 26, -82, 27, -85, 30, -90, 29, -94, 29, -97, 26, -97, 22, -94, 18, -90, 21, -87, 21, -88, 16, -83, 15, -83, 10, -79, 9, -77, 8, -80, 7, -85, 10, -88, 13, -92, 15, -96, 16, -105, 20, -106, 23, -112, 29, -114, 31, -117, 32, -121, 35, -124, 40, -124, 47, -127, 51, -133, 56, -140, 60, -148, 60, -154, 58, -162, 55, -158, 58, -165, 62], [-52, 64, -42, 60, -30, 68, -20, 72, -18, 80, -35, 83, -60, 82, -72, 78, -58, 70], [-77, 8, -72, 12, -62, 10, -52, 5, -50, 0, -44, -2, -35, -6, -39, -15, -41, -22, -48, -26, -53, -34, -58, -38, -63, -41, -66, -47, -69, -52, -68, -55, -73, -52, -75, -45, -73, -37, -71, -30, -70, -18, -76, -14, -81, -6, -80, -1, -78, 3], [-9, 43, -2, 43.5, -1, 46, -4.5, 48.5, 2, 51, 5, 53, 9, 54, 14, 54, 20, 55, 21, 57, 24, 57, 24, 59.5, 30, 60, 32, 64, 34, 67, 41, 67, 44, 68, 54, 68, 60, 69, 68, 69, 73, 72, 80, 73, 100, 77, 113, 74, 130, 71, 145, 72, 160, 69, 170, 70, 180, 69, 180, 65, 172, 64, 163, 60, 157, 51, 156, 57, 148, 59, 141, 54, 138, 47, 133, 43, 130, 42, 129, 35, 126, 35, 126, 38, 125, 40, 121, 39, 122, 37, 120, 36, 122, 31, 121, 28, 117, 23, 110, 21, 108, 18, 109, 12, 105, 9, 102, 12, 100, 13, 99, 8, 101, 3, 104, 1.3, 103, 4, 100, 6, 98, 10, 98, 16, 94, 17, 92, 21, 89, 22, 86, 20, 82, 16, 80, 13, 77, 8, 75, 12, 73, 17, 72, 21, 69, 22, 67, 24.5, 62, 25, 57, 25.5, 55, 27, 51, 28, 48, 30, 50, 26, 52, 24, 56, 26, 57, 23, 59, 22.5, 55, 17, 52, 16, 45, 13, 43, 13, 40, 18, 35, 28, 34, 31, 35, 34, 36, 36.5, 30, 36.5, 27, 37, 26.5, 40.5, 29, 41, 26, 41, 23, 40, 23, 37, 21, 37, 20, 40, 19, 42, 14, 45, 12.5, 45, 13, 43, 16, 41.5, 18, 40, 16.5, 38.5, 15.5, 40, 12, 42, 10, 44, 8, 44, 4, 43.5, 3, 42, 0, 39, -1, 37.5, -5, 36, -7, 37, -9, 37, -9, 39], [-17, 21, -16, 28, -10, 31, -6, 35.8, 0, 35.5, 10, 37, 11, 33, 20, 32, 25, 32, 32, 31, 34, 28, 38, 22, 43, 12, 51, 12, 48, 5, 41, -2, 40, -10, 40, -15, 35, -20, 35, -25, 32, -29, 27, -34, 20, -35, 18, -32, 14, -23, 12, -17, 13, -8, 9, -1, 9, 4, 4, 6, -4, 5, -8, 4.5, -13, 8, -17, 13], [5, 58, 5, 62, 12, 66, 18, 70, 28, 71, 30, 68, 26, 65, 22, 65, 18, 62, 18, 59, 16, 56, 13, 55.5, 11, 58.5], [44, -25, 47, -25, 50, -15, 49, -12, 44, -17], [114, -22, 122, -18, 129, -15, 136, -12, 142, -11, 146, -19, 153, -26, 151, -34, 146, -39, 141, -38, 135, -34, 130, -32, 123, -34, 115, -34, 113, -26], [95, 5, 98, 4, 106, -6, 104, -6, 100, -1], [109, 1, 117, 7, 119, 1, 116, -4, 110, -3], [105, -6, 114, -7, 114, -8.5, 106, -7.5], [131, -1, 141, -3, 150, -10, 142, -9, 138, -8, 132, -4], [131, 34, 135, 35, 140, 35, 142, 40, 140, 41, 139, 37, 135, 36], [-5, 50, 1, 51, 2, 53, -2, 56, -3, 58.5, -6, 58, -5, 55, -3, 54, -5, 52], [-10, 52, -6, 52, -6, 55, -10, 54], [-24, 65, -14, 65, -14, 66.5, -22, 66.5], [172, -34, 178, -38, 175, -41, 172, -41], [172, -41, 174, -42, 170, -46, 167, -46], [-80, 73, -68, 70, -62, 66, -70, 62, -78, 64], [-118, 73, -105, 73, -100, 69, -115, 69], [80, 6, 82, 7, 81, 9, 80, 9.5], [120, 18, 122, 18, 124, 12, 126, 7, 123, 8, 121, 14], [-85, 22, -80, 23, -74, 20, -77, 20]]

// [name, left %, top %] on the map. Faisalabad sits next to Mumbai and Dubai,
// using the same scale as the other pins (nudge the two numbers if you want it
// a little to the left/right or up/down).
const locations = [
  ['New York', 29, 35], ['Los Angeles', 20, 39], ['Mexico City', 27, 51],
  ['São Paulo', 42, 72], ['London', 48, 29], ['Lagos', 50, 53],
  ['Cairo', 55, 44], ['Dubai', 61, 48], ['Mumbai', 66, 52],
  ['Faisalabad', 66, 43],
  ['Singapore', 71, 57], ['Beijing', 73, 37], ['Tokyo', 79, 39],
  ['Sydney', 83, 75], ['Toronto', 31, 31],
] as const

// The dot sweep runs p: 0 -> 1.2 over 2000ms, so the sweep front reaches a
// map position `fx` (0..1) after fx * 2000 / 1.2 ms. Pins use the same maths.
const SWEEP_MS = 2000 / 1.2

export default function GlobalSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduced(reducedMotion)

    // ---------- Build the dot grid from the continent outlines ----------
    // Draw the continents on a small mask canvas, then keep every grid
    // point that lands on land. fx/fy are fractions of the map (0..1),
    // so the dots line up with the pins and arcs.
    const mask = document.createElement('canvas')
    mask.width = 700
    mask.height = 280
    const mctx = mask.getContext('2d')
    if (!mctx) return
    mctx.fillStyle = '#fff'
    LAND.forEach((poly) => {
      mctx.beginPath()
      for (let i = 0; i < poly.length; i += 2) {
        const x = (poly[i] + 170) * 2
        const y = (84 - poly[i + 1]) * 2
        if (i === 0) mctx.moveTo(x, y)
        else mctx.lineTo(x, y)
      }
      mctx.closePath()
      mctx.fill()
    })
    const maskData = mctx.getImageData(0, 0, 700, 280).data

    type Dot = { fx: number; fy: number; b: number; s: number }
    const dots: Dot[] = []
    for (let la = 84, row = 0; la > -57; la -= 1.7, row++) {
      for (let lo = -170 + (row % 2 ? 0.85 : 0); lo < 180; lo += 1.7) {
        const px = Math.floor((lo + 170) * 2)
        const py = Math.floor((84 - la) * 2)
        if (px < 700 && py < 280 && maskData[(py * 700 + px) * 4 + 3] > 128) {
          const nz = (Math.sin(lo * 0.21) + Math.cos(la * 0.33) + Math.sin((lo + la) * 0.11)) / 3 * 0.5 + 0.5
          dots.push({
            fx: (lo + 170) / 350,
            fy: (84 - la) / 140,
            b: 0.4 + 0.45 * nz + 0.15 * Math.random(),
            s: 0.65 + 0.45 * nz,
          })
        }
      }
    }

    // ---------- Dot sprite (one soft circle, reused for every dot) ----------
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 16
    const sctx = sprite.getContext('2d')
    if (!sctx) return
    sctx.fillStyle = '#d8d8d8'
    sctx.beginPath()
    sctx.arc(8, 8, 7.5, 0, Math.PI * 2)
    sctx.fill()

    // ---------- Sizing (devicePixelRatio aware) ----------
    let W = 0
    let H = 0
    const size = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (!w || !h) return false
      if (w !== W || h !== H) {
        W = w
        H = h
        const r = Math.min(window.devicePixelRatio || 1, 2)
        canvas.width = Math.round(w * r)
        canvas.height = Math.round(h * r)
        ctx.setTransform(r, 0, 0, r, 0, 0)
      }
      return true
    }

    // ---------- Draw one frame ----------
    // Dots sweep in left-to-right over ~2s (p: 0 -> 1.2), then twinkle.
    let t0 = 0
    const draw = (now: number) => {
      const p = reducedMotion ? 1.2 : Math.min(1.2, (now - t0) / 2000)
      const st = (1.7 / 350) * W * 0.34
      ctx.clearRect(0, 0, W, H)
      for (const d of dots) {
        const v = p - d.fx
        if (v <= 0) continue
        const twinkle = reducedMotion ? 1 : 0.72 + 0.28 * Math.sin(now / 850 - d.fx * 10 + d.fy * 6)
        ctx.globalAlpha = Math.min(1, v * 6) * d.b * twinkle
        const r = st * d.s
        ctx.drawImage(sprite, d.fx * W - r, d.fy * H - r, r * 2, r * 2)
      }
      ctx.globalAlpha = 1
    }

    // ---------- Run only while the section is visible ----------
    let raf = 0
    let running = false
    let started = false
    const loop = (now: number) => {
      if (!running) return
      if (size()) draw(now)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (!started) {
        started = true
        t0 = performance.now()
        // Same moment the dot sweep starts: let the pins and arcs begin too.
        setRevealed(true)
      }
      if (reducedMotion) {
        if (size()) draw(performance.now())
      } else if (!running) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start()
        else stop()
      },
      { threshold: 0.15 },
    )
    observer.observe(canvas)

    const ro = new ResizeObserver(() => {
      if (!started) return
      if (reducedMotion) {
        if (size()) draw(performance.now())
      } else {
        size()
      }
    })
    ro.observe(canvas)

    return () => {
      stop()
      observer.disconnect()
      ro.disconnect()
    }
  }, [])

  return (
    <section className="gl rv">
      <h2 className="gh">We serve <span className="lm">globally</span></h2>
      <div className="gt">
        <div className="gtl">
          <svg className="sq" viewBox="0 0 24 90" aria-hidden="true">
            <path
              pathLength={1}
              d="M12 2C20 10 4 14 12 22S4 34 12 42S20 54 12 62S4 74 12 82"
              fill="none"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <p>
            <span className="ld">Our work has no borders.</span> From startups to
            established brands, we build websites, apps and AI automation for
            clients around the world, shaped to each market and language.
          </p>
        </div>
        <div className="gtr">
          <svg className="bd2" viewBox="0 0 100 100" role="img" aria-label="We are global">
            <defs>
              <path id="global-label" d="M50 50m-33 0a33 33 0 1 1 66 0a33 33 0 1 1-66 0" />
            </defs>
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--li)" strokeOpacity=".4" strokeWidth="2" strokeDasharray="2 2.6" />
            <g className="rng">
              <text fontSize="8" fill="currentColor" letterSpacing="6.4">
                <textPath href="#global-label">MineDev---- AGENCY -- </textPath>
              </text>
            </g>
            <text className="anton" x="50" y="58" textAnchor="middle" fontSize="20" fill="var(--ac)" transform="rotate(-8 60 60)">WE ARE</text>
          </svg>
          <p>We don&apos;t just work locally.<br />We deliver worldwide.</p>
        </div>
      </div>

      {/* World map: dotted continents on canvas, arcs + glowing pins on top */}
      <div className="map" aria-label="Our clients are based around the world" style={{ position: 'relative', aspectRatio: '1.923' }}>
        <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
        <svg
          className="arcs"
          viewBox="0 0 1000 520"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            opacity: revealed ? 1 : 0,
            transition: reduced ? 'none' : 'opacity 1.2s ease 1.6s', // fade in once the pins have landed
          }}
        >
          <path d="M480 155 Q370 60 290 185" />
          <path d="M480 155 Q550 50 690 160" />
          <path d="M480 155 Q590 240 720 220" />
          <path d="M290 185 Q360 300 420 390" />
          <path d="M690 160 Q740 310 820 390" />
        </svg>
        <div id="pins">
          {locations.map(([name, left, top], index) => {
            // Each pin pops in as the dot sweep passes it (left to right).
            const delay = Math.round((left / 100) * SWEEP_MS)
            const dim = name !== 'Faisalabad' && index % 3 === 2 // keeps the original softer look on every third pin
            return (
              <i
                key={name}
                className="pin"
                title={name === 'Faisalabad' ? 'Faisalabad, Pakistan' : name}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  '--d': `${index * 0.22}s`,
                  opacity: revealed ? (dim ? 0.6 : 1) : 0,
                  scale: revealed ? '1' : '0',
                  transition: reduced
                    ? 'none'
                    : `opacity .35s ease ${delay}ms, scale .6s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
                } as CSSProperties}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}