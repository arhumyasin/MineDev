import Link from 'next/link'
import ThreeScene from '@/components/ThreeScene'
import MotionReel from '@/components/MotionReel'
import HeroVisual from '@/components/HeroVisual'
import TechMarquee from '@/components/TechMarquee'
import DashboardPreview from '@/components/DashboardPreview'
import GlobalSection from '@/components/GlobalSection'
import ThreeIntro from '@/components/ThreeIntro'
import { ActionLink, Badge, Icon, PageFrame, ProjectCard, ServiceCard, serviceItems, projects } from '@/components/Design'


const reasons = [
  { icon: 'zap', title: 'Fast delivery', text: 'Lightweight pages that load quickly on any device.' },
  { icon: 'code', title: 'Clean code', text: 'Maintainable work your team can build on.' },
  { icon: 'bot', title: 'AI first', text: 'Automation designed in from day one.' },
  { icon: 'buoy', title: 'Ongoing support', text: 'We stay with you after launch.' },
]

export default function HomePage() {
  return (
    <PageFrame>
      {/* ═══ Hero Section ═══ */}
      <section className="fr hero sp bt w-full">
        <div className="hero-copy">
          <Badge icon="trend"><span className="shm">On demand, live support</span></Badge>
          <h1>Web apps &amp; AI that <span className="hl">10x</span> <span className="hl">your</span> <span className="hl">Revenue</span></h1>
          <div className="cta flex items-center flex-wrap gap-3">
            <ActionLink href="/contact">Get started now</ActionLink>
            <ActionLink href="/services" light>Learn more</ActionLink>
          </div>
          <p className="smt">We build custom websites and AI solutions that give you an unbeatable edge over your competitors—turning every visitor into a customer so you never lose a deal.</p>
        </div>
        <HeroVisual />
      </section>


      {/* ═══ Tech Stack Marquee ═══ */}
      <div className="w-full flex justify-center">
        <TechMarquee />
      </div>

      {/* ═══ Dashboard Preview ═══ */}
      <div className="w-full flex flex-col items-center">
        <DashboardPreview />
      </div>

      <ThreeIntro />

      {/* yahan se aapka "Websites that feel alive" wala 3D card */}
      {/* ═══ 3D Scene ═══ */}
      <section className="d3 fr sp rv w-full">
        <div>
          <Badge icon="box">3D &amp; interactive</Badge>
          <h2>Websites that feel alive.</h2>
          <p>Real-time 3D running right in the browser. Move your mouse over the scene and it follows you.</p>
          <ActionLink href="/contact">Add 3D to my site</ActionLink>
        </div>
        <ThreeScene />
      </section>

      {/* ═══ Motion Reel ═══ */}
      <div className="hd w-full flex flex-col items-center justify-center text-center">
        <Badge icon="monitor" className="rv">Our Work</Badge>
        <h2>See how <span style={{ color: 'var(--li)' }}>We Work</span></h2>
      </div>
      <div className="w-full flex justify-center">
        <MotionReel />
      </div>

      {/* ═══ What We Offer ═══ */}
      <div className="hd w-full flex flex-col items-center justify-center text-center">
        <Badge icon="briefcase" className="rv">Business approach</Badge>
        <h2><span style={{ color: 'var(--li)' }}>How</span> It <span style={{ color: 'var(--li)' }}>Makes</span> More <span style={{ color: 'var(--li)' }}>Money</span></h2>
        <p>We build high-converting websites and smart AI systems that save you time, cut manual work, and bring in more paying customers.</p>
      </div>
      <div className="grid w-full" id="mini">
        {serviceItems.slice(0, 6).map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>

      {/* ═══ Why Us ═══ */}
      <div className="hd w-full flex flex-col items-center justify-center text-center">
        <Badge icon="award" className="rv">Why us</Badge>
        <h2><span style={{ color: 'var(--li)' }}>Trusted</span> Agency</h2>
        <p>We believe in clear communication, clean work and results you can measure.</p>
      </div>
      <div className="grid w-full">
        {reasons.map((reason, index) => (
          <div className="card sp rv" key={reason.title}>
            {/* Icon fix: poora box inline style se banaya hai, taake .ic / .i ki CSS icon ko bahar na dhakel sake */}
            <div style={{ display: 'grid', placeItems: 'center', width: 52, height: 52, minWidth: 52, borderRadius: 16, background: 'rgba(142, 251, 3, 0.24)', color: '#8EFB03', flexShrink: 0, marginBottom: 16 }}>
              <Icon name={reason.icon} className="w-6 h-6" />
            </div>
            <h3>{reason.title}</h3>
            <p>{reason.text}</p>
            <div className="nm">0{index + 1}</div>
          </div>
        ))}
      </div>


      {/* ═══ Global Section ═══ */}
      <div className="w-full">
        <GlobalSection />
      </div>

      {/* ═══ Dark Automation Panel ═══ */}
      <section className="dk w-full" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* VIDEO BACKGROUND — loop me chalegi. File ko public/videos/ folder me rakho aur src me uska naam do. */}
        <video
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        >
          <source src="/videos/file.mp4" type="video/mp4" />
        </video>
        {/* Overlay — video ko halka dark karta hai taake text readable rahe. 0.5 kam/zayada kar sakte ho. */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.5)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2>Better to see it once than hear about it a thousand times.</h2>
          <p>Here&apos;s the kind of work AI automation does for you every day, without anyone clicking a button.</p>
          <ActionLink href="/projects" light>See projects</ActionLink>
        </div>
        <div className="col" style={{ position: 'relative', zIndex: 1 }}>
          <div className="it flex items-center gap-3"><i style={{ display: 'grid', placeItems: 'center', width: 30, height: 30, minWidth: 30, borderRadius: '50%', background: '#8EFB03', color: '#0B0F14', flexShrink: 0 }}><Icon name="check" className="w-5 h-5" /></i>Lead captured and added to CRM</div>
          <div className="it flex items-center gap-3"><i style={{ display: 'grid', placeItems: 'center', width: 30, height: 30, minWidth: 30, borderRadius: '50%', background: '#8EFB03', color: '#0B0F14', flexShrink: 0 }}><Icon name="check" className="w-5 h-5" /></i>Customer question answered by AI</div>
          <div className="it flex items-center gap-3"><i style={{ display: 'grid', placeItems: 'center', width: 30, height: 30, minWidth: 30, borderRadius: '50%', background: '#8EFB03', color: '#0B0F14', flexShrink: 0 }}><Icon name="check" className="w-5 h-5" /></i>Invoice sent automatically</div>
        </div>
      </section>


      {/* ═══ CTA ═══ */}
      <section className="cc w-full flex flex-col items-center justify-center text-center">
        <Badge icon="rocket" className="rv">Ready when you are</Badge>
        <h2>Get a <span style={{ color: 'var(--li)' }}>Project</span> in minutes?</h2>
        <p>Tell us your idea. We&apos;ll reply with next steps</p>
        <div className="cta flex items-center justify-center"><ActionLink href="/contact">Get started now</ActionLink></div>
      </section>

    </PageFrame>
  )
}
