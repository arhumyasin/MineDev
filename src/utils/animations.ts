/**
 * Shared animation utilities, easing curves, and motion helpers.
 * All timing and physics values are extracted from the original design's
 * Motion library and CSS keyframes to ensure frame-rate parity.
 */

/* ─── Easing Curves ─────────────────────────────────────────────── */

/** The design's primary ease-out curve: cubic-bezier(.22,1,.36,1) */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Spring-like ease for reveals */
export const EASE_SPRING: [number, number, number, number] = [0.2, 0.8, 0.2, 1]

/** Linear ease */
export const EASE_LINEAR = 'linear'

/* ─── Duration Constants (seconds) ──────────────────────────────── */
export const DURATION_REVEAL = 0.65
export const DURATION_SCENE_ENTER = 0.6
export const DURATION_SHIMMER = 2.6
export const DURATION_LOGO_SPIN = 6
export const DURATION_FLOAT = 5
export const DURATION_BORDER_ROTATE = 4
export const DURATION_REEL_SLIDE = 4
export const DURATION_HOLO = 50
export const DURATION_MARQUEE = 24

/* ─── Stagger Values ────────────────────────────────────────────── */
export const STAGGER_CARD = 0.07
export const STAGGER_WORD = 0.055
export const STAGGER_PIN = 0.09

/* ─── IntersectionObserver Helper ────────────────────────────────── */
export function observeReveal(
  root: Element,
  selector: string,
  callback: (el: HTMLElement) => void,
  options?: IntersectionObserverInit
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target as HTMLElement)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.14, ...options }
  )
  root.querySelectorAll<HTMLElement>(selector).forEach((el) => observer.observe(el))
  return observer
}

/* ─── Spotlight Pointer Tracking ─────────────────────────────────── */
export function setupSpotlight() {
  if (typeof window === 'undefined') return () => {}

  function handler(e: PointerEvent) {
    const target = (e.target as HTMLElement)?.closest?.('.sp')
    if (target instanceof HTMLElement) {
      const rect = target.getBoundingClientRect()
      target.style.setProperty('--x', `${e.clientX - rect.left}px`)
      target.style.setProperty('--y', `${e.clientY - rect.top}px`)
    }
  }

  window.addEventListener('pointermove', handler, { passive: true })
  return () => window.removeEventListener('pointermove', handler)
}

/* ─── Magnetic Button Effect ─────────────────────────────────────── */
// Magnetic movement removed — buttons no longer follow the cursor.
// Arrow icon slides right on hover via CSS (.btn:hover .ar) only.
export function setupMagnetic() {
  return () => {}
}

/* ─── 3D Card Tilt ───────────────────────────────────────────────── */
export function setupCardTilt() {
  if (typeof window === 'undefined') return () => {}
  const fine = window.matchMedia('(pointer:fine)').matches
  if (!fine) return () => {}

  /**
   * Single shared RAF loop — no per-card RAF conflicts.
   * Each card keeps its own (curX, curY) current angles and
   * (tgtX, tgtY) target angles. The loop runs only while any
   * card is still moving.
   */

  interface CardState {
    curX: number  // current rotateX (deg)
    curY: number  // current rotateY (deg)
    tgtX: number  // target  rotateX
    tgtY: number  // target  rotateY
    active: boolean
  }

  const cards = new Map<HTMLElement, CardState>()
  let rafId = 0

  function getState(el: HTMLElement): CardState {
    if (!cards.has(el)) cards.set(el, { curX: 0, curY: 0, tgtX: 0, tgtY: 0, active: false })
    return cards.get(el)!
  }

  const LERP = 0.09   // 0.09 = snappy-smooth; lower → more lag

  function loop() {
    let stillMoving = false

    cards.forEach((s, el) => {
      s.curX += (s.tgtX - s.curX) * LERP
      s.curY += (s.tgtY - s.curY) * LERP

      const doneX = Math.abs(s.tgtX - s.curX) < 0.005
      const doneY = Math.abs(s.tgtY - s.curY) < 0.005

      if (doneX && doneY && !s.active) {
        // Snap to exactly zero when resting so transform can be cleared
        s.curX = 0; s.curY = 0
        el.style.transform = ''
      } else {
        el.style.transform = `perspective(900px) rotateX(${s.curX}deg) rotateY(${s.curY}deg)`
        if (!doneX || !doneY) stillMoving = true
      }
    })

    rafId = stillMoving ? requestAnimationFrame(loop) : 0
  }

  function startLoop() {
    if (!rafId) rafId = requestAnimationFrame(loop)
  }

  function onMove(e: PointerEvent) {
    const card = (e.target as HTMLElement)?.closest?.('.sp.card')
    if (!(card instanceof HTMLElement)) return

    const s = getState(card)
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // −0.5 … +0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5

    s.tgtX = -y * 10   // rotateX: tilt up/down
    s.tgtY =  x * 10   // rotateY: tilt left/right
    s.active = true
    startLoop()
  }

  function onLeave(e: PointerEvent) {
    const card = (e.target as HTMLElement)?.closest?.('.sp.card')
    if (!(card instanceof HTMLElement)) return
    // Only reset when the pointer actually exits the card (not a child)
    if (e.relatedTarget instanceof Node && card.contains(e.relatedTarget)) return

    const s = getState(card)
    s.tgtX = 0
    s.tgtY = 0
    s.active = false
    startLoop()
  }

  // Attach per-card listeners so leave is reliable across child elements
  function attach(card: HTMLElement) {
    card.addEventListener('pointermove', onMove,  { passive: true })
    card.addEventListener('pointerleave', onLeave, { passive: true })
  }

  // Wire up all existing cards
  document.querySelectorAll<HTMLElement>('.sp.card').forEach(attach)

  // Also wire up cards added after mount
  const mo = new MutationObserver((records) => {
    records.forEach((r) =>
      r.addedNodes.forEach((n) => {
        if (n instanceof HTMLElement) {
          if (n.matches('.sp.card')) attach(n)
          n.querySelectorAll<HTMLElement>('.sp.card').forEach(attach)
        }
      })
    )
  })
  mo.observe(document.body, { childList: true, subtree: true })

  return () => {
    cancelAnimationFrame(rafId)
    mo.disconnect()
    cards.forEach((_, el) => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.style.transform = ''
    })
    cards.clear()
  }
}

/* ─── Reduced Motion Check ───────────────────────────────────────── */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
