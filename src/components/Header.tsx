'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Icon } from './Design'
import gsap from 'gsap'

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

/* ───────────── bubble tuning (play with these) ─────────────
   elastic.out(amplitude, period)
   · amplitude  1 = normal overshoot, 1.3+ = bouncier (GSAP never goes below 1)
   · period     0.3 = fast and jittery, 0.75 = soft and smooth, 1 = very lazy
*/
const MOVE_EASE = 'elastic.out(1, 0.75)' // bubble travelling from one link to another
const MOVE_TIME = 0.9
const POP_EASE = 'elastic.out(1, 0.6)' // bubble appearing on the first link
const POP_TIME = 0.7
const JELLY = 0.22 // how much the bubble stretches while travelling (0 = none)
const FADE_OUT = 0.3 // seconds to fade away when the cursor leaves the nav
const HIDE_DELAY = 90 // ms grace so crossing the gap between links never flickers
const PAD_X = 4 // bubble is a little bigger than the link
const PAD_Y = 2
const MAX_DROPLETS = 36 // cap so fast hovering can't pile up hundreds of little bubbles

/** Position and size of the bubble for a given link (relative to the nav). */
const boxOf = (a: HTMLElement) => ({
  x: a.offsetLeft - PAD_X,
  y: a.offsetTop - PAD_Y,
  width: a.offsetWidth + PAD_X * 2,
  height: a.offsetHeight + PAD_Y * 2,
})

/* ───────────── responsive header (phones) ─────────────
   · the logo never shrinks below 112px and grows with the screen up to its full size
   · the button stays on ONE line, gets smaller on phones, and below 450px it shows
     the short label "Consult" (the full text is still used by screen readers)
*/
const headerCss = `
header .logo{flex:none}
header .logo-img{display:block;width:clamp(112px,30vw,154px);height:auto;max-width:none;flex:none;object-fit:contain}
header .tools{flex:none;gap:8px}
header .tools .btn{white-space:nowrap;flex:none}
header .lbl-short{display:none}
@media(min-width:640px){header .logo-img{width:173px}}
@media(max-width:640px){
  header .bar{gap:8px;padding-left:14px;padding-right:6px}
  header .tools .btn.sm{padding:4px 4px 4px 14px;font-size:.84rem;gap:8px;line-height:1.2}
  header .tools .btn .ar{width:28px;height:28px}
  header .tools .btn .ar svg{width:14px;height:14px}
}
@media(max-width:450px){
  header .lbl-full{display:none}
  header .lbl-short{display:inline}
}
@media(max-width:379px){
  header .tools .btn.sm{padding:3px 3px 3px 12px;font-size:.8rem;gap:6px}
  header .tools .ib{width:38px;height:38px}
}
`

const isDesktop = () => !window.matchMedia('(max-width: 900px)').matches
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Header() {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const bubRef = useRef<HTMLElement>(null)
  const lastLink = useRef<HTMLAnchorElement | null>(null)
  const hideTimer = useRef(0)
  const droplets = useRef(0)
  const [menuOpen, setMenuOpen] = useState(false)

  /* The bubble is driven by GSAP directly on the DOM node (no React state),
     so hovering never triggers a re-render and nothing fights the animation. */
  useEffect(() => {
    const bub = bubRef.current
    const nav = navRef.current
    if (bub) {
      bub.style.transition = 'none' // CSS transitions must not fight GSAP
      bub.style.willChange = 'transform, width, height, opacity'
      gsap.set(bub, { opacity: 0, x: 0, y: 0, width: 0, height: 0, scaleX: 1, scaleY: 1, transformOrigin: '50% 50%' })
    }

    const onResize = () => {
      const b = bubRef.current
      const l = lastLink.current
      if (b && l) gsap.set(b, boxOf(l))
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(hideTimer.current)
      if (bub) gsap.killTweensOf(bub)
      nav?.querySelectorAll('.bb2').forEach((el) => {
        gsap.killTweensOf(el)
        el.remove()
      })
    }
  }, [])

  /* Little water bubbles that float up from the link */
  function waterBubbles(target: HTMLAnchorElement) {
    const nav = navRef.current
    if (!nav) return

    for (let i = 0; i < 12; i++) {
      if (droplets.current >= MAX_DROPLETS) return
      droplets.current += 1

      const b = document.createElement('span')
      b.className = 'bb2'
      const size = 2 + Math.random() * 4
      b.style.width = `${size}px`
      b.style.height = `${size}px`
      b.style.left = `${target.offsetLeft + Math.random() * target.offsetWidth}px`
      b.style.top = `${target.offsetTop + target.offsetHeight * 0.6}px`
      nav.appendChild(b)

      gsap.set(b, { opacity: 0, scale: 0 })
      gsap
        .timeline({
          delay: i * 0.035,
          onComplete: () => {
            droplets.current -= 1
            b.remove()
          },
        })
        .to(b, { opacity: 1, duration: 0.15, ease: 'power1.out' }, 0)
        .to(b, { scale: 1, duration: 0.55, ease: 'elastic.out(1, 0.5)' }, 0) // pops like a real bubble
        .to(b, { y: -(32 + Math.random() * 34), duration: 1.3, ease: 'power1.out' }, 0) // rises
        .to(b, { x: (Math.random() - 0.5) * 28, duration: 1.3, ease: 'sine.inOut' }, 0) // drifts sideways
        .to(b, { opacity: 0, scale: 1.5, duration: 0.35, ease: 'power1.in' }, '>-0.4') // pops and fades
    }
  }

  function moveBubble(target: HTMLAnchorElement) {
    const bub = bubRef.current
    if (!bub || !isDesktop()) return

    window.clearTimeout(hideTimer.current) // cursor is on a link again: cancel any pending fade-out

    // Same link as before: nothing to move. Just make sure it is fully visible again.
    if (lastLink.current === target) {
      if (!reducedMotion() && Number(gsap.getProperty(bub, 'opacity')) < 1) {
        gsap.to(bub, { opacity: 1, duration: 0.2, overwrite: 'auto' })
      }
      return
    }

    const previous = lastLink.current
    lastLink.current = target
    const box = boxOf(target)
    const visible = Number(gsap.getProperty(bub, 'opacity')) > 0.02

    if (reducedMotion()) {
      gsap.set(bub, { ...box, opacity: 1, scaleX: 1, scaleY: 1 })
      return
    }

    gsap.killTweensOf(bub)

    if (!visible || !previous) {
      // First link: appear exactly where the cursor is, then pop in.
      gsap.set(bub, { ...box, scaleX: 0.6, scaleY: 0.6, opacity: 0 })
      gsap.to(bub, { opacity: 1, duration: 0.18, ease: 'power1.out' })
      gsap.to(bub, { scaleX: 1, scaleY: 1, duration: POP_TIME, ease: POP_EASE })
    } else {
      // Moving between links: slide + resize with an elastic ease,
      // and stretch like jelly in the direction of travel.
      const distance = Math.abs(box.x - Number(gsap.getProperty(bub, 'x')))
      const stretch = Math.min(distance / 280, JELLY)

      gsap.to(bub, { ...box, duration: MOVE_TIME, ease: MOVE_EASE })
      gsap.to(bub, { opacity: 1, duration: 0.15, ease: 'power1.out' })
      gsap
        .timeline()
        .to(bub, { scaleX: 1 + stretch, scaleY: 1 - stretch * 0.45, duration: 0.1, ease: 'power2.out' })
        .to(bub, { scaleX: 1, scaleY: 1, duration: 0.95, ease: 'elastic.out(1, 0.5)' })
    }

    // water bubbles only when arriving on a new link
    if (!reducedMotion()) waterBubbles(target)
  }

  function hideBubble() {
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => {
      const bub = bubRef.current
      lastLink.current = null
      if (!bub) return
      // Fade out WHERE IT IS. Position and size are never touched, so the
      // bubble can't slide back to Home any more. Only opacity changes.
      gsap.to(bub, { opacity: 0, duration: reducedMotion() ? 0.01 : FADE_OUT, ease: 'power2.out', overwrite: 'auto' })
    }, HIDE_DELAY)
  }

  function closeMenu() {
    setMenuOpen(false)
    hideBubble()
  }

  return (
    <header className="w-full flex justify-center">
      <div className="bar max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link className="logo flex items-center" href="/" onClick={closeMenu}>
          <Image
            src="/logo3.png"
            alt="MineDev"
            width={154}
            height={32}
            priority
            className="logo-img"
          />
        </Link>
        <nav
          ref={navRef}
          id="nav"
          className={`flex items-center${menuOpen ? ' open' : ''}`}
          aria-label="Main navigation"
          onPointerOver={(event) => {
            if (event.pointerType === 'touch') return
            const link = (event.target as HTMLElement).closest('a')
            if (link instanceof HTMLAnchorElement) moveBubble(link)
          }}
          onPointerLeave={hideBubble}
          onFocusCapture={(event) => {
            const link = (event.target as HTMLElement).closest('a')
            if (link instanceof HTMLAnchorElement) moveBubble(link)
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) hideBubble()
          }}
        >
          <b className="pill" aria-hidden="true" />
          <b className="bub" ref={bubRef} aria-hidden="true" />
          {navigation.map(({ label, href }) => {
            const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                href={href}
                key={href}
                className={active ? 'on' : undefined}
                aria-current={active ? 'page' : undefined}
                onClick={closeMenu}
              >
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="tools flex items-center gap-2">
          <Link className="btn lt sm" href="/contact" aria-label="Free Consultation">
            <span className="lbl-full">Free Consultation</span>
            <span className="lbl-short" aria-hidden="true">Consult</span>
            <i className="ar"><Icon name="arrow" /></i>
          </Link>
          <button
            className="ib bgr"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>
      <style>{headerCss}</style>
    </header>
  )
}