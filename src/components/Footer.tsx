import Link from 'next/link'
import Image from 'next/image'
import { Icon } from './Design'

const pages = [
  ['Home', '/'], ['About', '/about'], ['Services', '/services'],
  ['Projects', '/projects'], ['Contact', '/contact'],
] as const

/* Facebook + Reddit icons: same style as the other social icons
   (24x24, 2px round stroke, inherits the link colour via currentColor).
   They live in this file, so nothing needs to change in ./Design. */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function RedditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="14" rx="8" ry="5.5" />
      <circle cx="3.6" cy="11.4" r="1.9" />
      <circle cx="20.4" cy="11.4" r="1.9" />
      <circle cx="9" cy="13.6" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M9.2 16.6c1.5 1.1 4.1 1.1 5.6 0" />
      <path d="M12 8.5 13.3 3.2l4.2 1" />
      <circle cx="18.4" cy="4.4" r="1.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="ft max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="fw flex flex-col items-center w-full">
        <div className="ftop flex items-center justify-between w-full flex-wrap gap-5">
          <div>
            <h3 className="fh">Have a <span style={{ color: 'var(--li)' }}>Project</span> in mind?</h3>
            <p style={{ margin: 0 }}>Tell us what you&apos;re building. We&apos;ll reply within one business day</p>
          </div>
          <Link className="btn lt mag" href="/contact">Start a project<i className="ar"><Icon name="arrow" /></i></Link>
        </div>
        <div className="fgrid w-full">
          <div className="fc fb">
            <Link className="logo flex items-center" href="/">
              <Image
                src="/logo3.png"
                alt="MineDev"
                width={155}
                height={36}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </Link>
            <p style={{ margin: '14px 0 0', maxWidth: '34ch' }}>Web apps and AI automation for businesses around the world</p>
            <div className="soc flex items-center flex-wrap">
              <a href="https://www.linkedin.com/company/minedev-agency/" target="_blank" aria-label="LinkedIn"><Icon name="ln" className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/minedev_agency" target="_blank" aria-label="Instagram"><Icon name="ig" className="w-5 h-5" /></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FacebookIcon className="w-5 h-5" /></a>
              <a href="https://www.reddit.com/" target="_blank" rel="noopener noreferrer" aria-label="Reddit"><RedditIcon className="w-5 h-5" /></a>
              <a href="https://x.com/" target='_blank' aria-label="X"><span>𝕏</span></a>
            </div>
          </div>
          <div className="fc"><h4>Pages</h4>{pages.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>
          <div className="fc"><h4>Services</h4>
            <Link href="/services">Custom web apps</Link><Link href="/services">UI/UX design</Link>
            <Link href="/services">E-commerce</Link><Link href="/services">AI automation</Link><Link href="/services">AI chatbots</Link>
          </div>
          <div className="fc"><h4>Get in touch</h4>
            <a href="mailto:Contact@minedev.agency">Contact@minedev.agency</a><a href="tel:+923291130061">+92 3291130061</a>
            <span className="stt flex items-center"><u />Open for new projects</span>
          </div>
        </div>
        <div className="fbig" aria-hidden="true">MineDev</div>
        <div className="fbot flex items-center justify-between w-full flex-wrap">
          <span>© 2026 MineDev. All rights reserved</span>
          <span>Web apps &amp; AI automation</span>
          <a className="ib flex place-items-center" href="#top" aria-label="Back to top"><Icon name="up" className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  )
}