'use client'

import { useEffect, useRef, useState } from 'react'

/*
  AgencyDashboard: animated dashboard (dark / lime theme), single file.

  How to use:
  1. Save this file as src/components/AgencyDashboard.tsx
  2. Import it in your page:  import AgencyDashboard from '@/components/AgencyDashboard'
  3. Use it anywhere:  <AgencyDashboard />

  No extra packages needed. Styles and animations are inside this file.
  Animations start when the dashboard scrolls into view, pause when it leaves,
  and are switched off for visitors who prefer reduced motion.

  Exact size
    section     92% of its parent (a little narrower than your other sections), up to 1400px, margin 110px auto
    window      max-width 1360px, radius 20px, about 506px tall (45px bar + 460px body)
    sidebar     18% of the width (130px to 200px)      chart bars  195px high
    chat card   270px wide      toast       left -18px, bottom 46px
*/

const NAV_ITEMS = ['Overview', 'Customers', 'AI Assistant', 'Billing']
const INITIAL_BARS = [34, 52, 42, 68, 58, 80, 95]
const TARGETS = [12480, 48.2, 3920]

type ChatStep = 'hidden' | 'question' | 'typing' | 'answer'

const styles = `
.dx-section{box-sizing:border-box;width:100%;padding:0;background:transparent;color:#fff;font-family:Metropolis,Montserrat,system-ui,-apple-system,sans-serif;font-weight:300;font-size:17px;line-height:1.65}
.dx-section *,.dx-section *::before,.dx-section *::after{box-sizing:border-box}
.dx-head{max-width:760px;margin:110px auto 0;text-align:center}
.dx-eb{display:inline-flex;align-items:center;gap:10px;font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#8EFB03}
.dx-eb i{width:8px;height:8px;border-radius:50%;background:#8EFB03;box-shadow:0 0 10px #8EFB03;animation:adPulse 1.6s infinite}
.dx-h{margin:18px 0 0;font-size:clamp(2.2rem,5vw,3.6rem);font-weight:800;line-height:1.08;letter-spacing:-.035em;color:#f5f5f5}
.dx-hl{display:block;color:#8EFB03}
.dx-sub{margin:20px auto 0;max-width:660px;font-size:1.05rem;line-height:1.75;font-weight:300;color:#8b8b98}
.dx-dash{position:relative;width:92%;max-width:1400px;margin:56px auto 110px}
.dx-rv{opacity:0;transform:translateY(28px);transition:opacity .65s cubic-bezier(.22,1,.36,1),transform .65s cubic-bezier(.22,1,.36,1)}
.dx-rv.dx-seen{opacity:1;transform:none}
.dx-toast.dx-rv{transition-delay:.07s}
.dx-chat.dx-rv{transition-delay:.14s}
.dx-window{max-width:1360px;margin:0 auto;background:#000;border:1px solid rgba(255,255,255,.12);border-radius:20px;overflow:hidden;box-shadow:0 0 0 1px rgba(255,255,255,.06),0 20px 50px rgba(0,0,0,.6)}
.dx-topbar{display:flex;align-items:center;gap:7px;padding:12px 16px;border-bottom:1px solid rgba(255,255,255,.12)}
.dx-topbar i{width:11px;height:11px;border-radius:50%;background:#ff5f57}
.dx-topbar i:nth-child(2){background:#febc2e}
.dx-topbar i:nth-child(3){background:#28c840}
.dx-topbar span{margin:0 auto;padding:4px 40px;border-radius:8px;background:rgba(255,255,255,.05);font-size:.75rem;color:#8EFB03;font-weight:600;letter-spacing:.02em}
.dx-body{display:grid;grid-template-columns:clamp(130px,18%,200px) 1fr;min-height:460px}
.dx-side{position:relative;padding:16px 10px;border-right:1px solid rgba(255,255,255,.12);display:grid;align-content:start;gap:4px}
.dx-side b{padding:0 10px 10px;font-size:.85rem}
.dx-link{position:relative;z-index:1;display:block;padding:8px 10px;border-radius:10px;font-size:.82rem;color:#b3b3b3;cursor:default}
.dx-link.on{color:#0B0F14;font-weight:700}
.dx-pill{position:absolute;left:10px;right:10px;top:0;height:0;border-radius:10px;background:#8EFB03;transition:top .5s cubic-bezier(.34,1.35,.64,1),height .5s cubic-bezier(.34,1.35,.64,1)}
.dx-main{padding:16px;display:grid;gap:14px;align-content:start}
.dx-kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.dx-kpi>div{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px 14px}
.dx-kpi small{display:block;color:#b3b3b3;font-size:.72rem}
.dx-kpi b{font-size:1.4rem;letter-spacing:-.03em}
.dx-chart{border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px 14px}
.dx-chart small{font-size:.78rem;font-weight:700}
.dx-bars{display:flex;align-items:flex-end;gap:8px;height:195px;margin-top:10px}
.dx-bars u{flex:1;display:block;border-radius:8px 8px 4px 4px;background:rgba(142,251,3,.3);text-decoration:none;transform-origin:bottom}
.dx-bars u:last-child{background:#8EFB03}
.dx-toast{position:absolute;left:-18px;bottom:46px;z-index:2;display:flex;gap:12px;align-items:center;padding:12px 18px;background:#000;border:1px solid rgba(255,255,255,.12);border-radius:22px;box-shadow:0 0 0 1px rgba(255,255,255,.06),0 20px 50px rgba(0,0,0,.6);font-size:.85rem;line-height:1.25;font-weight:600;animation:adFloat 5s ease-in-out -1s infinite}
.dx-toast i{width:38px;height:38px;border-radius:10px;background:rgba(142,251,3,.4);display:grid;place-items:center;flex:none}
.dx-toast small{display:block;color:#b3b3b3;font-weight:400}
.dx-chat{position:absolute;right:-14px;top:78px;z-index:2;width:270px;padding:14px;background:#000;border:1px solid rgba(255,255,255,.12);border-radius:22px;box-shadow:0 0 0 1px rgba(255,255,255,.06),0 20px 50px rgba(0,0,0,.6);animation:adFloat 5s ease-in-out -3s infinite}
.dx-chat-head{display:flex;align-items:center;gap:10px;font-weight:700;font-size:.85rem;margin-bottom:10px}
.dx-chat-head i{width:28px;height:28px;border-radius:50%;background:#0B0F14;color:#8EFB03;display:grid;place-items:center;flex:none}
.dx-dot{margin-left:auto;width:8px;height:8px;border-radius:50%;background:#22c55e;animation:adPulse 1.6s infinite}
.dx-chat p{margin:0 0 8px;padding:8px 12px;border-radius:14px;font-size:.78rem;line-height:1.4;color:#fff;transition:opacity .35s,transform .35s}
.dx-q{background:#3430f5;border-bottom-right-radius:5px!important;margin-left:auto!important;width:fit-content}
.dx-t{position:absolute;left:14px;bottom:6px;width:fit-content;letter-spacing:3px;color:#b3b3b3!important}
.dx-a{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-bottom-left-radius:5px!important}
@keyframes adFloat{50%{translate:0 -9px}}
@keyframes adPulse{50%{opacity:.35;scale:.8}}
@media(max-width:900px){.dx-side{display:none}.dx-body{grid-template-columns:1fr}.dx-toast,.dx-chat{position:relative;left:auto;right:auto;top:auto;bottom:auto;width:auto;margin-top:12px}.dx-t{position:static}.dx-kpi b{font-size:1.1rem}}
@media(max-width:520px){.dx-kpi{grid-template-columns:1fr 1fr}.dx-kpi>div:nth-child(3){display:none}}
@media(prefers-reduced-motion:reduce){.dx-toast,.dx-chat,.dx-dot,.dx-eb i{animation:none!important}.dx-rv,.dx-pill,.dx-chat p{transition:none!important}}
`

export default function AgencyDashboard() {
  const rootRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<(HTMLSpanElement | null)[]>([])

  const [inView, setInView] = useState(false)
  const [seen, setSeen] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [counts, setCounts] = useState<number[]>([0, 0, 0])
  const [barHeights, setBarHeights] = useState<number[]>(INITIAL_BARS)
  const [chatStep, setChatStep] = useState<ChatStep>('hidden')
  const [activeNav, setActiveNav] = useState(0)
  const [pill, setPill] = useState({ top: 0, height: 0 })

  // Respect "reduce motion"
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Know when the dashboard is on screen
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setSeen(true)
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Count-up numbers (0 to 12,480 / $48.2k / 3,920), replays each time it scrolls into view
  useEffect(() => {
    if (reduced) {
      setCounts(TARGETS)
      return
    }
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const duration = 1800
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setCounts(TARGETS.map((t) => t * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced])

  // Bars re-randomise every 2.8s while visible
  useEffect(() => {
    if (!inView || reduced) return
    const live = window.setInterval(() => {
      setBarHeights(INITIAL_BARS.map(() => 25 + Math.random() * 70))
    }, 2800)
    return () => window.clearInterval(live)
  }, [inView, reduced])

  // AI chat: question, typing dots, answer. Repeats every 9 seconds
  useEffect(() => {
    if (reduced) {
      setChatStep('answer')
      return
    }
    if (!inView) return
    let timers: number[] = []
    const runChat = () => {
      timers.forEach((t) => window.clearTimeout(t))
      setChatStep('hidden')
      timers = [
        window.setTimeout(() => setChatStep('question'), 30),
        window.setTimeout(() => setChatStep('typing'), 930),
        window.setTimeout(() => setChatStep('answer'), 2400),
      ]
    }
    runChat()
    const loop = window.setInterval(runChat, 9000)
    return () => {
      window.clearInterval(loop)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [inView, reduced])

  // Sidebar highlight cycles through the menu every 2.2s
  useEffect(() => {
    if (!inView || reduced) return
    const cycle = window.setInterval(() => {
      setActiveNav((v) => (v + 1) % NAV_ITEMS.length)
    }, 2200)
    return () => window.clearInterval(cycle)
  }, [inView, reduced])

  // Move the green pill behind the active menu item
  useEffect(() => {
    const measure = () => {
      const el = linkRefs.current[activeNav]
      if (el) setPill({ top: el.offsetTop, height: el.offsetHeight })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [activeNav])

  const formatCount = (value: number, index: number) =>
    index === 1 ? `$${value.toFixed(1)}k` : Math.round(value).toLocaleString('en-US')

  const shown = seen || reduced
  const barsUp = inView || reduced
  const questionOn = chatStep !== 'hidden'

  return (
    <section ref={rootRef} className="dx-section" aria-label="Animated agency dashboard">
      <div className="dx-head">
        <span className={`dx-eb dx-rv ${shown ? 'dx-seen' : ''}`}>
          <i />
          The AI business ecosystem
        </span>
        <h2 className={`dx-h dx-rv ${shown ? 'dx-seen' : ''}`} style={{ transitionDelay: '.08s' }}>
          Turn technology into <span className="dx-hl">business growth.</span>
        </h2>
        <p className={`dx-sub dx-rv ${shown ? 'dx-seen' : ''}`} style={{ transitionDelay: '.16s' }}>
          See how websites, AI automation and intelligent sales systems help businesses attract customers and
          generate revenue.
        </p>
      </div>

      <div className="dx-dash">
        <div className={`dx-window dx-rv ${shown ? 'dx-seen' : ''}`}>
          <div className="dx-topbar">
            <i />
            <i />
            <i />
            <span style={{ color: '#8EFB03', fontWeight: 600 }}>MineDev.agency</span>
          </div>

          <div className="dx-body">
            <aside className="dx-side">
              <b>Dashboard</b>
              <span className="dx-pill" aria-hidden="true" style={{ top: pill.top, height: pill.height }} />
              {NAV_ITEMS.map((item, i) => (
                <span
                  key={item}
                  ref={(el) => {
                    linkRefs.current[i] = el
                  }}
                  className={`dx-link ${activeNav === i ? 'on' : ''}`}
                  aria-current={activeNav === i ? 'true' : undefined}
                >
                  {item}
                </span>
              ))}
            </aside>

            <div className="dx-main">
              <div className="dx-kpi">
                <div>
                  <small>Active users</small>
                  <b>{formatCount(counts[0], 0)}</b>
                </div>
                <div>
                  <small>Monthly revenue</small>
                  <b>{formatCount(counts[1], 1)}</b>
                </div>
                <div>
                  <small>AI replies</small>
                  <b>{formatCount(counts[2], 2)}</b>
                </div>
              </div>

              <div className="dx-chart">
                <small>Weekly growth</small>
                <div className="dx-bars">
                  {barHeights.map((height, i) => (
                    <u
                      key={i}
                      style={{
                        height: `${height}%`,
                        transform: `scaleY(${barsUp ? 1 : 0})`,
                        transition: reduced
                          ? 'none'
                          : `transform .7s cubic-bezier(.22,1,.36,1) ${i * 80}ms, height .9s cubic-bezier(.34,1.4,.64,1)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`dx-toast dx-rv ${shown ? 'dx-seen' : ''}`}>
          <i>
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#8EFB03"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m4 12 5 5L20 6" />
            </svg>
          </i>
          <span>
            Deployed to production
            <small>All checks passed</small>
          </span>
        </div>

        <div className={`dx-chat dx-rv ${shown ? 'dx-seen' : ''}`}>
          <div className="dx-chat-head">
            <i>
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="4" y="8" width="16" height="12" rx="2" />
                <path d="M12 8V4M9 13v2M15 13v2" />
              </svg>
            </i>
            AI Assistant
            <span className="dx-dot" />
          </div>
          <p
            className="dx-q"
            style={{ opacity: questionOn ? 1 : 0, transform: questionOn ? 'none' : 'translateY(10px)' }}
          >
            How did signups go last week?
          </p>
          <p
            className="dx-t"
            aria-hidden="true"
            style={{
              opacity: chatStep === 'typing' ? 1 : 0,
              transform: chatStep === 'typing' ? 'none' : 'translateY(10px)',
            }}
          >
            •••
          </p>
          <p
            className="dx-a"
            style={{
              opacity: chatStep === 'answer' ? 1 : 0,
              transform: chatStep === 'answer' ? 'none' : 'translateY(10px)',
            }}
          >
            Signups are up 18%, and most came from the pricing page.
          </p>
        </div>
      </div>

      <style>{styles}</style>
    </section>
  )
}