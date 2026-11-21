'use client'

import { useEffect, useRef, useState } from 'react'

export default function MotionReel() {
  const videoRef  = useRef<HTMLVideoElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted,   setMuted]   = useState(false)

  /* ── IntersectionObserver: 75% visible → play, nahi to pause ── */
  useEffect(() => {
    const video = videoRef.current
    const wrap  = wrapRef.current
    if (!video || !wrap) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!started) return
        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {})
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: 0.75 }
    )
    observer.observe(wrap)
    return () => observer.disconnect()
  }, [started])

  /* ── Pehli baar play — user click se sound unlock ── */
  function handleStart() {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    video.volume = 1
    video.play()
      .then(() => { setStarted(true); setPlaying(true); setMuted(false) })
      .catch(() => {
        video.muted = true
        video.play().then(() => { setStarted(true); setPlaying(true); setMuted(true) }).catch(() => {})
      })
  }

  /* ── Video click → play/pause toggle ── */
  function handleVideoClick() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  /* ── Mute toggle ── */
  function toggleMute() {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div
      ref={wrapRef}
      className="reel rv"
      style={{ width: '100%', maxWidth: 960, minWidth: 0, margin: '0 auto', position: 'relative' }}
    >
      <div
        className="stage"
        style={{
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: 24,
          overflow: 'hidden',
          background: '#000',
          position: 'relative',
          cursor: started ? 'pointer' : 'default',
        }}
      >
        <video
          ref={videoRef}
          src="/videos/home.mp4"
          loop
          playsInline
          preload="metadata"
          muted
          onClick={started ? handleVideoClick : undefined}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* ── Play-with-sound overlay (pehli baar) ── */}
        {!started && (
          <button
            onClick={handleStart}
            aria-label="Play video with sound"
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 14,
              background: 'rgba(0,0,0,0.52)',
              border: 'none', cursor: 'pointer', color: '#fff',
            }}
          >
            <span style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'var(--li)',
              display: 'grid', placeItems: 'center',
              boxShadow: '0 0 0 12px rgba(142,251,3,.18)',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#0B0F14">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </span>
            <span style={{
              fontSize: '.88rem', fontWeight: 600,
              fontFamily: 'Metropolis, Montserrat, sans-serif',
              letterSpacing: '.06em', opacity: .85,
            }}>
              Play with sound
            </span>
          </button>
        )}

        {/* ── Mute button — bottom left ── */}
        {started && (
          <button
            onClick={e => { e.stopPropagation(); toggleMute() }}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            title={muted ? 'Unmute' : 'Mute'}
            style={{
              position: 'absolute', bottom: 14, left: 14,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(0,0,0,0.60)',
              border: '1.5px solid rgba(255,255,255,.22)',
              color: '#fff', cursor: 'pointer',
              display: 'grid', placeItems: 'center',
            }}
          >
            {muted
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97V10.18l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18l1.1 1.1L20.1 18 5.1 3H4.27zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
            }
          </button>
        )}

        {/* ── Paused indicator ── */}
        {started && !playing && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'grid', placeItems: 'center',
            pointerEvents: 'none',
          }}>
            <span style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)',
              display: 'grid', placeItems: 'center',
              border: '1.5px solid rgba(255,255,255,.3)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </span>
          </div>
        )}
      </div>

      <style>{`
        .reel { box-sizing: border-box; overflow-x: clip; }
        .reel * { box-sizing: border-box; }
        @media (max-width: 640px) {
          .reel .stage { aspect-ratio: auto; height: clamp(200px, 56vw, 340px); }
        }
      `}</style>
    </div>
  )
}
