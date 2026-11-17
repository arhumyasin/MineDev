'use client'

import { useEffect, useRef, useState } from 'react'

export default function ThreeIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const cls = (extra = '') => `${extra} t3-rv ${seen ? 't3-seen' : ''}`

  return (
    <div ref={ref} className="t3-head">
      <span className={cls('t3-eb')}>
        <i />
        Immersive web experiences
      </span>
      <h2 className={cls('t3-h')} style={{ transitionDelay: '.08s' }}>
        Go beyond flat pages with <span className="t3-hl">3D that converts.</span>
      </h2>
      <p className={cls('t3-sub')} style={{ transitionDelay: '.16s' }}>
        Interactive 3D, smooth motion and real-time effects turn a simple visit into an experience people
        remember, stay for, and come back to.
      </p>
    </div>
  )
}
