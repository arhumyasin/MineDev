import { Badge, PageFrame } from '@/components/Design'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <PageFrame>
      <section className="fr two sp">
        <div><Badge icon="chat" className="rv">Free consultation</Badge><h1>Let’s <span style={{ color: 'var(--li)' }}>talk</span></h1><p>Tell us about your project. We’ll reply with next steps</p><p><strong><a href="mailto:Contact@minedev.agency">Contact@minedev.agency</a></strong><br />+92 329 1130061</p></div>
        <div className="rv"><ContactForm /></div>
      </section>
    </PageFrame>
  )
}
