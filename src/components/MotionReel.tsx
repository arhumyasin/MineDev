'use client'

import { useEffect, useState } from 'react'
import { Icon } from './Design'

const scenes = [
  { title: 'Discover', caption: 'We learn your goals, users and budget.' },
  { title: 'Design', caption: 'Interfaces you approve before we build.' },
  { title: 'Automate', caption: 'AI that keeps working after you log off.' },
  { title: 'Launch', caption: 'Live, fast and ready to grow.' },
]

/*
  Responsive guard for the reel. Every rule is scoped under .reel so it only
  affects this component, and it sits on top of your existing .stage / .sc /
  .mk / .cb / .cnt / .rc styles and animations (nothing is renamed).

  What it fixes on phones:
  - The stage no longer uses a min-height that fights aspect-ratio. On small
    screens it gets a normal height instead, so its width can't be pushed
    wider than the screen.
  - min-width: 0 and max-width: 100% on the reel, the stage and the controls
    row, so flex/grid parents can't stretch them.
  - overflow-x: clip on the reel as a last safety net.
  - Text and the chat bubbles wrap instead of running off the right edge.
  - The stage is tall enough on a phone for the "Automate" chat scene.
*/
const responsiveCss = `
.reel{box-sizing:border-box;width:100%;max-width:min(960px,100%);min-width:0;margin-inline:auto;overflow-x:clip}
.reel *,.reel *::before,.reel *::after{box-sizing:border-box}
.reel .stage{width:100%;max-width:100%;min-width:0;min-height:0;aspect-ratio:16/9;overflow:hidden}
.reel .sc{max-width:100%;padding:clamp(12px,3vw,20px)}
.reel .sc h3{max-width:100%;font-size:clamp(1.6rem,6vw,3rem);overflow-wrap:anywhere}
.reel .sc p{max-width:100%;padding:0 4px;overflow-wrap:anywhere;text-wrap:balance}
.reel .mk{width:min(300px,78%)}
.reel .cb{width:min(340px,90%)}
.reel .cb span{max-width:100%;overflow-wrap:anywhere}
.reel .rc{min-width:0;gap:10px}
.reel .pbar{min-width:0}
.reel .rc>span{min-width:0;white-space:nowrap}
@media(max-width:640px){
  .reel .stage{aspect-ratio:auto;height:clamp(320px,92vw,380px);border-radius:24px}
  .reel .cb{gap:6px}
  .reel .cb span{padding:6px 12px;font-size:.78rem}
  .reel .cnt{font-size:clamp(3rem,18vw,4.5rem)}
}
`

export default function MotionReel() {
  const [scene, setScene] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setScene((current) => (current + 1) % scenes.length), 4000)
    return () => window.clearInterval(timer)
  }, [paused])

  const current = scenes[scene]
  return (
    // Size: 960px — standard video size (960x540).
    // Container ke andar centered. Responsive: mobile par width screen se bahar nahi jati (responsiveCss dekho).
    <div className="reel rv" style={{ width: '100%', maxWidth: 960, minWidth: 0 }}>
      <div className={`stage stage-${scene}`} key={scene} aria-live="polite">
        <div className="sc">
          {/* ═══ VIDEO YAHAN LAGANI HAI ═══
              Asli video lagane ke liye neeche wali 4 lines (rings / mk / cb / cnt)
              ko hata kar is jagah ye tag lagao:

              <video src="/videos/reel.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

              - Video file ko public/videos/ folder me rakho, src me uska path do.
              - autoPlay + muted: video khud chalegi (muted ke baghair browser autoplay rok deta hai).
              - loop: video khatam ho kar dobara chalegi.
              - Video poori stage bharni ho to neeche wala h3 aur p bhi hata do.
              - Har scene ki alag video ho to scenes array me har scene me 'video' field add karo. */}
          {scene === 0 && <div className="rings" aria-hidden="true"><i /><i /><i /></div>}
          {scene === 1 && <div className="mk" aria-hidden="true"><b /><div className="mr"><i /><i /><i /></div><u /><u /></div>}
          {scene === 2 && <div className="cb" aria-hidden="true"><span>Hi, what do you offer?</span><span className="r">Web apps, AI automation and more.</span><span>Can you book a call?</span><span className="r">Booked. Talk soon.</span></div>}
          {scene === 3 && <div className="cnt" aria-hidden="true">100%</div>}
          <h3>{current.title}</h3>
          <p>{String(scene + 1).padStart(2, '0')} · {current.caption}</p>
        </div>
      </div>
      <div className="rc">
        <button className="ib" type="button" aria-label={paused ? 'Play motion reel' : 'Pause motion reel'} onClick={() => setPaused((value) => !value)}>{paused ? '▶' : 'Ⅱ'}</button>
        <button className="ib" type="button" aria-label="Next scene" onClick={() => setScene((value) => (value + 1) % scenes.length)}>›</button>
        <div className="pbar"><u className={paused ? 'paused' : ''} key={`${scene}-${paused}`} /></div>
        <span>{String(scene + 1).padStart(2, '0')} / 04</span>
      </div>
      <style>{responsiveCss}</style>
    </div>
  )
}