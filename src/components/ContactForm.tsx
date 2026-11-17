'use client'

import { FormEvent, useState } from 'react'
import { Icon } from './Design'

const FORMSPREE_URL = 'https://formspree.io/f/xeaggkwp'

const SERVICES = [
  'Custom Web App',
  'UI/UX Design',
  'E-commerce Store',
  'AI Automation',
  'AI Chatbot',
  'Mobile / PWA',
  'SEO & Performance',
  'Other',
]

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [services, setServices] = useState<string[]>([])

  function toggleService(s: string) {
    setServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? '').trim()
    const name = get('name')
    const company = get('company')

    // Services chips live in state, not in the form — add them, plus a
    // clear email subject. Sent as FormData (a normal browser form post),
    // NOT as JSON — Formspree's spam filter trusts a real form post far
    // more than a JSON API post, which is why the test went to Spam.
    f.append('services', services.length ? services.join(', ') : 'Not specified')
    f.append('_subject', `Project inquiry from ${name}${company ? ` — ${company}` : ''}`)
    f.append('_gotcha', '') // honeypot — empty = real human

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: f,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setSent(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError((data as { error?: string }).error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error — please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .cf-wrap {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }
        .cf-section {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .cf-section-label {
          font: 700 .78rem/1 Metropolis, Montserrat, sans-serif;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--li);
          padding-bottom: 10px;
          border-bottom: 1px solid var(--bd);
        }
        .cf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 600px) {
          .cf-row { grid-template-columns: 1fr; }
        }
        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cf-field label {
          font: 600 .82rem/1 Metropolis, Montserrat, sans-serif;
          color: var(--mu);
          letter-spacing: .04em;
        }
        .cf-field label span {
          color: var(--li);
          margin-left: 2px;
        }
        .cf-field input,
        .cf-field select,
        .cf-field textarea {
          width: 100%;
          background: var(--cd);
          border: 1.5px solid var(--bd);
          border-radius: 10px;
          padding: 11px 15px;
          color: var(--fg);
          font: 400 .93rem/1.5 Metropolis, Montserrat, sans-serif;
          outline: none;
          transition: border-color .2s, box-shadow .2s;
          box-sizing: border-box;
          appearance: none;
          -webkit-appearance: none;
        }
        .cf-field select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238EFB03' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          color-scheme: dark;
        }
        .cf-field select option {
          background-color: #1a1f26;
          color: #e8edf2;
        }
        .cf-field select option:disabled {
          color: #5a6472;
        }
        .cf-field input::placeholder,
        .cf-field textarea::placeholder {
          color: var(--mu);
          opacity: .55;
        }
        .cf-field input:focus,
        .cf-field select:focus,
        .cf-field textarea:focus {
          border-color: var(--li);
          box-shadow: 0 0 0 3px rgba(142,251,3,.10);
        }
        .cf-services {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .cf-chip {
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 15px;
          border-radius: 99px;
          border: 1.5px solid var(--bd);
          background: var(--cd);
          font: 600 .84rem/1 Metropolis, Montserrat, sans-serif;
          color: var(--mu);
          transition: border-color .2s, color .2s, background .2s;
          user-select: none;
        }
        .cf-chip.on {
          border-color: var(--li);
          color: #0B0F14;
          background: var(--li);
        }
        .cf-chip .cf-chip-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: currentColor;
          opacity: .5;
          transition: opacity .2s;
        }
        .cf-chip.on .cf-chip-dot { opacity: 1; }
        .cf-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
          padding: 60px 24px;
        }
        .cf-success-icon {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: rgba(142,251,3,.12);
          display: grid; place-items: center;
          font-size: 1.8rem;
        }
        .cf-success h3 {
          font: 700 1.4rem/1.2 Metropolis, Montserrat, sans-serif;
          color: var(--fg);
          margin: 0;
        }
        .cf-success p {
          color: var(--mu);
          font-size: .92rem;
          margin: 0;
          max-width: 340px;
        }
      `}</style>

      {sent ? (
        <div className="cf-success">
          <div className="cf-success-icon">✅</div>
          <h3>Inquiry sent successfully!</h3>
          <p>
            We&apos;ve received your message and will get back to you within 24 hours. You can also
            reach us at{' '}
            <a href="mailto:minedev544@gmail.com" style={{ color: 'var(--li)' }}>
              minedev544@gmail.com
            </a>
          </p>
          <button className="btn lt" onClick={() => { setSent(false); setError('') }}>
            Send another <i className="ar"><Icon name="arrow" /></i>
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="cf-wrap" noValidate>

          {/* ── Section 1: Personal Info ── */}
          <div className="cf-section">
            <p className="cf-section-label">01 — Your Details</p>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-name">Full Name <span>*</span></label>
                <input
                  id="cf-name" name="name" type="text"
                  placeholder="John Smith"
                  autoComplete="name" required
                />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-email">Email Address <span>*</span></label>
                <input
                  id="cf-email" name="email" type="email"
                  placeholder="john@company.com"
                  autoComplete="email" required
                />
              </div>
            </div>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-phone">Phone Number</label>
                <input
                  id="cf-phone" name="phone" type="tel"
                  placeholder="+1 (555) 000-0000"
                  autoComplete="tel"
                />
              </div>
              <div className="cf-field">
                <label htmlFor="cf-company">Company / Business Name</label>
                <input
                  id="cf-company" name="company" type="text"
                  placeholder="Acme Corp."
                  autoComplete="organization"
                />
              </div>
            </div>
          </div>

          {/* ── Section 2: Project Details ── */}
          <div className="cf-section">
            <p className="cf-section-label">02 — Project Details</p>

            <div className="cf-field">
              <label>Services Needed</label>
              <div className="cf-services">
                {SERVICES.map(s => (
                  <button
                    key={s} type="button"
                    className={`cf-chip${services.includes(s) ? ' on' : ''}`}
                    onClick={() => toggleService(s)}
                  >
                    <span className="cf-chip-dot" />
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-projType">Project Type <span>*</span></label>
                <select id="cf-projType" name="projType" required defaultValue="">
                  <option value="" disabled>Select a type…</option>
                  <option>New project from scratch</option>
                  <option>Redesign / Revamp</option>
                  <option>Add features to existing product</option>
                  <option>Consultation / Strategy</option>
                </select>
              </div>
              <div className="cf-field">
                <label htmlFor="cf-timeline">Timeline / Deadline</label>
                <select id="cf-timeline" name="timeline" defaultValue="">
                  <option value="" disabled>Select timeline…</option>
                  <option>ASAP (under 2 weeks)</option>
                  <option>1–2 months</option>
                  <option>3–6 months</option>
                  <option>6+ months</option>
                  <option>Flexible / No deadline</option>
                </select>
              </div>
            </div>

            <div className="cf-field">
              <label htmlFor="cf-brief">Project Brief <span>*</span></label>
              <textarea
                id="cf-brief" name="brief" rows={5}
                placeholder="Tell us about your project — what problem are you solving, what are your goals, and what do you envision?"
                required
              />
            </div>
          </div>

          {/* ── Section 3: Budget & Expectations ── */}
          <div className="cf-section">
            <p className="cf-section-label">03 — Budget &amp; Expectations</p>
            <div className="cf-row">
              <div className="cf-field">
                <label htmlFor="cf-budget">Budget Range <span>*</span></label>
                <select id="cf-budget" name="budget" required defaultValue="">
                  <option value="" disabled>Select a range…</option>
                  <option>Under $1,000</option>
                  <option>$1,000 – $5,000</option>
                  <option>$5,000 – $15,000</option>
                  <option>$15,000 – $30,000</option>
                  <option>$30,000+</option>
                  <option>Let&apos;s discuss</option>
                </select>
              </div>
              <div className="cf-field">
                <label htmlFor="cf-source">How did you find us?</label>
                <select id="cf-source" name="source" defaultValue="">
                  <option value="" disabled>Select…</option>
                  <option>Google Search</option>
                  <option>Social Media</option>
                  <option>Referral / Word of mouth</option>
                  <option>LinkedIn</option>
                  <option>GitHub</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="cf-field">
              <label htmlFor="cf-thoughts">Why MineDev? Your Expectations</label>
              <textarea
                id="cf-thoughts" name="thoughts" rows={4}
                placeholder="What made you reach out to us? What are your expectations from this partnership? Any specific concerns?"
              />
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <p role="alert" style={{
              color: '#ff5c5c',
              background: 'rgba(255,92,92,.08)',
              border: '1px solid rgba(255,92,92,.25)',
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '.88rem',
              margin: 0,
            }}>
              ⚠️ {error}
            </p>
          )}

          {/* ── Submit ── */}
          <button
            className="btn mag"
            type="submit"
            disabled={loading}
            style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Sending…' : 'Send Inquiry'}{' '}
            <i className="ar"><Icon name="arrow" /></i>
          </button>

        </form>
      )}
    </>
  )
}
