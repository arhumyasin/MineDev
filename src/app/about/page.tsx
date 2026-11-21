import { ActionLink, Badge, Icon, PageFrame } from '@/components/Design'

const steps = [
  { icon: 'search', title: 'Discover', text: 'We learn your goals users and budget' },
  { icon: 'palette', title: 'Design', text: 'You approve clear interfaces before we build' },
  { icon: 'code', title: 'Build', text: 'Tested on real devices and browsers' },
  { icon: 'trend', title: 'Automate and grow', text: 'AI workflows support and updates' },
]

const reasons = [
  {
    icon: 'rocket',
    title: 'Fast by default',
    text: 'Every site and app is built for speed because slow pages lose customers before they ever read a word',
  },
  {
    icon: 'trend',
    title: 'Built around revenue',
    text: 'We design for enquiries sales and saved hours not for pretty screenshots',
  },
  {
    icon: 'chat',
    title: 'Straight talk',
    text: 'You speak directly to the people building your product Clear updates no jargon a reply within one business day',
  },
  {
    icon: 'users',
    title: 'Your approval first',
    text: 'You see and approve the design before development starts so there are no expensive surprises later',
  },
]

/* Your problem -> our fix */
const fixes = [
  { problem: 'Your website is slow and visitors leave', fix: 'We rebuild it for speed so more people stay and enquire' },
  { problem: 'Leads come in but nobody follows up in time', fix: 'AI chatbots and automations reply instantly 24/7' },
  { problem: 'Your team wastes hours on repetitive work', fix: 'We automate it so your people focus on growth' },
]

/* ─────────────────────────────────────────────────────────────
   TEAM: edit names, roles and bios here.
   Photos live in the /public/team folder:
   Arhum.png  Hadi.png  Zainab.jpeg  Abdullah.jpeg  Ahmad.jpeg
   (file names are case sensitive and must match exactly).
───────────────────────────────────────────────────────────── */
const founder = {
  name: 'Arhum Yasin',
  role: 'Founder & UI/UX Designer',
  initials: 'AR',
  bio: 'I started MineDev with one belief that a leader serves before he leads so I put trust before profit and excellence before excuses and treat every client as a responsibility I will answer for',
  photo: '/team/Arhum.png' as string,
}

const members = [
  { name: 'Mashal Hadi', role: 'C-T-O / AI & FullStack Engineer', initials: 'HD', bio: 'I lead our technology and architecture and build scalable full-stack applications and AI systems that are fast and secure and ready to grow with your business', photo: '/team/Hadi.png' as string },
  { name: 'Zainab', role: 'Software Engineer', initials: 'ZN', bio: 'I turn requirements into clean reliable code and build responsive features and integrations that work smoothly on every device and scale with your business', photo: '/team/Zainab.jpeg' as string },
  { name: 'Tayyaba Khan', role: 'Content & Branding Manager', initials: 'AH', bio: 'I shape your brand voice and visual identity and create clear persuasive content that builds trust and keeps every message consistent across your website and channels', photo: '/team/tayyaba.jpeg' as string },
  { name: 'Abdullah Azeem', role: 'Lead Generation & Social-Media Marketer', initials: 'AB', bio: 'I grow your audience and fill your pipeline with targeted social media campaigns and lead generation strategies that bring in qualified customers and measurable results', photo: '/team/Abdullah.jpeg' as string },
  { name: 'Ahmad Ali', role: 'Graphic Designer & Video Editor', initials: 'AH', bio: 'I create eye-catching graphics and polished videos that make your brand stand out and turn attention into engagement across your website and social media', photo: '/team/Ahmad.jpeg' as string },
]

const css = `
.ab-intro{max-width:820px;margin:34px auto 0;text-align:center}
.ab-eb{display:inline-flex;align-items:center;gap:10px;font-size:.72rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--li)}
.ab-eb i{width:8px;height:8px;border-radius:50%;background:var(--li);box-shadow:0 0 10px var(--li);animation:pl 1.6s infinite}
.ab-intro h1{margin:18px 0 0;font-size:clamp(2.3rem,6vw,4.4rem);line-height:1.06}
.ab-intro h1 span{color:var(--li)}
.ab-sub{margin:12px auto 0;max-width:620px;font-size:1.05rem;line-height:1.75}
.ab-approach{display:grid;grid-template-columns:1fr auto 1.1fr;gap:clamp(16px,2.5vw,32px);align-items:start;max-width:1080px;margin:clamp(64px,8vw,96px) auto 0;padding:0 8px}
.ab-approach h2{margin:0;font-size:clamp(1.9rem,4.2vw,3rem);line-height:1.08}
.ab-approach h2 span{color:var(--li)}
.ab-approach p{max-width:none;font-size:.98rem;line-height:1.75}
.ab-approach p:last-child{margin-bottom:0}
@media(max-width:900px){.ab-approach{grid-template-columns:1fr}.ab-div{display:none}}
.ab-div{align-self:stretch;width:2px;border-radius:2px;background:linear-gradient(to bottom,transparent,var(--fg) 15%,var(--fg) 85%,transparent);box-shadow:0 0 14px rgba(255,255,255,.45);position:relative}
.ab-div::before,.ab-div::after{content:"";position:absolute;left:50%;transform:translateX(-50%);width:10px;height:10px;border-radius:50%;background:var(--fg);box-shadow:0 0 12px rgba(255,255,255,.6)}
.ab-div::before{top:0}
.ab-div::after{bottom:0}
.ab-hero{margin-top:clamp(64px,8vw,96px)}
.ab-why{max-width:1080px;margin:clamp(64px,8vw,96px) auto 0}
.ab-why .hd{margin-top:0}
.ab-big{font-size:clamp(2.5rem,6.4vw,4.9rem)}
.ab-big-sm{font-size:clamp(2.2rem,5.6vw,4.2rem)}
.ab-big-sm span{color:var(--li)}
.ab-fix{max-width:1080px;margin:clamp(64px,8vw,96px) auto 0}
.ab-fix .hd{margin-top:0}
.ab-fix h2{margin:0 0 28px;font-size:clamp(1.9rem,4.2vw,3rem);line-height:1.08}
.hd h2 span{color:var(--li)}

/* ── Team ── */
.ab-team-badge{display:flex;justify-content:center;margin-bottom:20px}
.ab-hero .chips span{color:var(--fg);text-shadow:0 0 10px rgba(158,235,32,.6),0 0 22px rgba(158,235,32,.3)}
.tm-lead{max-width:none;font-size:1.02rem;line-height:1.75}
.tm-label{display:inline-flex;align-items:center;gap:10px;margin:34px 0 14px;font-size:.78rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--li)}
.tm-label i{width:8px;height:8px;border-radius:50%;background:var(--li);box-shadow:0 0 10px var(--li);animation:pl 1.6s infinite}
.tm-fix{display:grid;gap:12px}
.tm-row{display:grid;grid-template-columns:1fr auto 1.2fr;gap:18px;align-items:center;padding:16px 22px;border:1px solid var(--bd);border-radius:20px;background:var(--cd)}
.tm-row p{margin:0;max-width:none}
.tm-prob{color:var(--fg);font-size:.95rem;font-weight:500}
.tm-arr{color:var(--li);font-weight:800;font-size:1.2rem}
.tm-sol{font-weight:700;color:var(--fg)!important;font-size:.98rem}
@media(max-width:700px){.tm-row{grid-template-columns:1fr;gap:6px}.tm-arr{rotate:90deg;width:fit-content}}
.tm-meet{margin:44px 0 6px}
.tm-meet h3{margin:0 0 6px;font-size:clamp(1.4rem,3vw,2rem)}
.tm-meet p{margin:0}
.tm-av{flex:none;display:grid;place-items:center;width:64px;height:64px;border-radius:50%;font-weight:800;letter-spacing:.02em;color:#0B0F14;background:linear-gradient(135deg,var(--li),#d6ff8a);background-size:cover;background-position:center 20%}
.tm-founder{display:grid;grid-template-columns:auto 1fr auto;gap:clamp(16px,3vw,28px);align-items:center;margin-top:22px;padding:clamp(18px,3vw,28px);border:1px solid color-mix(in srgb,var(--li) 45%,var(--bd));border-radius:28px;background:var(--cd)}
.tm-founder .tm-av{width:128px;height:128px;font-size:2.2rem}
@media(max-width:560px){.tm-founder .tm-av{width:104px;height:104px;font-size:1.9rem}}
.tm-founder h4{margin:0;font-size:1.5rem;letter-spacing:-.02em}
.tm-role{display:block;margin:2px 0 10px;color:var(--li);font-weight:700;font-size:.85rem;letter-spacing:.04em}
.tm-founder p{margin:0;max-width:60ch;font-size:.95rem;line-height:1.7}
@media(max-width:560px){.tm-founder{grid-template-columns:1fr}.tm-founder .btn{width:100%;justify-content:space-between}}
.tm-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-top:14px}
@media(max-width:620px){.tm-grid{grid-template-columns:1fr}}
.tm-card{display:flex;align-items:center;gap:20px;padding:24px}
.tm-card .tm-av{width:96px;height:96px;font-size:1.6rem}
@media(max-width:380px){.tm-card{gap:14px;padding:18px}.tm-card .tm-av{width:76px;height:76px;font-size:1.3rem}}
.tm-card h4{margin:0;font-size:1.15rem;letter-spacing:-.01em}
.tm-card .tm-role{margin:2px 0 10px;font-size:.8rem}
.tm-card p{margin:0;font-size:.9rem;line-height:1.6}
@media(prefers-reduced-motion:reduce){.ab-eb i,.tm-label i{animation:none}}

/* Founder aur team cards ki bio: chips jaisa white text + green glow */
.tm-founder p,.tm-card p{color:var(--fg);text-shadow:0 0 10px rgba(142,251,3,.6),0 0 22px rgba(142,251,3,.3)}

/* ───────── MOBILE ONLY (700px se neeche): sab se neeche rakha hai taake base rules ko override kare ───────── */
@media(max-width:700px){
  /* Our team card: paragraphs hide */
  .tm-lead{display:none}

  /* heading aur button center mein, button ke neeche gap */
  .ab-hero .two{text-align:center;justify-items:center;margin-bottom:28px}
  .ab-hero .two h1,.ab-hero .two h2{text-align:center}

  /* "We create digital products:" line aur chips hide */
  .ab-hero > strong,.ab-hero .chips{display:none}

  /* "We start with your goals, not a template" section hide */
  .ab-approach{display:none}
}
`

export default function AboutPage() {
  return (
    <PageFrame>
      {/* ───────── 1. About intro ───────── */}
      <section className="ab-intro w-full">
        <span className="ab-eb rv"><i />About MineDev</span>
        <h1 className="rv">
          We build <span>Websites & AI</span> that turn visitors into <span>customers</span>
        </h1>
        <p className="ab-sub rv">
          We help founders and growing brands around the world turn ideas into fast websites
          web apps and AI automation that bring in customers and save hours every week
        </p>
      </section>

      {/* ───────── 2. OUR TEAM (story + stacks + members + photo) ───────── */}
      <section className="fr sp ab-hero w-full">
        <div className="ab-team-badge rv"><Badge icon="users">Our team</Badge></div>

        <div className="two w-full">
          <h2 className="ab-big ab-big-sm">A <span>creative</span> team that <span>builds</span> around your <span>business</span></h2>
          <div className="rv">
            <p className="tm-lead">
              Behind every MineDev project is a small senior team that works as one with you Your strategist
              designer developer and AI engineer are in the same conversation from day one so nothing gets
              lost between &ldquo;idea&rdquo; and &ldquo;live&rdquo;
            </p>
            <p className="tm-lead">
              We don&apos;t just deliver a website We take responsibility for the result: more customers
              fewer manual tasks and a business that runs smarter
            </p>
            <ActionLink href="/contact">Talk to our team</ActionLink>
          </div>
        </div>

        <strong>We create digital products:</strong>
        <div className="chips flex items-center flex-wrap gap-2.5">
          <span>React Websites</span><span>Next.js</span><span>Web Apps &amp; SaaS</span><span>WordPress &amp; WooCommerce</span>
          <span>E-commerce</span><span>Mobile App</span><span>AI Development</span><span>AI Agents &amp; MCP</span>
          <span>AI Automation</span><span>Chatbots</span><span>WhatsApp AI Bots</span><span>Voice AI Agents</span>
          <span>Claude Design Conversion</span><span>Responsive Design</span><span>SEO</span>
        </div>

        {/* Members */}
        <div className="tm-meet rv">
          <span className="tm-label" style={{ marginTop: 0 }}><i />Meet the people</span>
          <h3>Real people Real accountability</h3>
          <p>Every project is handled by the team below from the first call to launch and beyond</p>
        </div>

        <div className="tm-founder rv">
          <div
            className="tm-av"
            style={founder.photo ? { backgroundImage: `url(${founder.photo})` } : undefined}
            aria-hidden="true"
          >
            {founder.photo ? '' : founder.initials}
          </div>
          <div>
            <h4>{founder.name}</h4>
            <span className="tm-role">{founder.role}</span>
            <p>{founder.bio}</p>
          </div>
          <ActionLink href="mailto:Contact@minedev.agency">Meet the Founder</ActionLink>
        </div>

        <div className="tm-grid">
          {members.map((member, index) => (
            <div className="card sp tm-card rv" key={`${member.role}-${index}`}>
              <div
                className="tm-av"
                style={member.photo ? { backgroundImage: `url(${member.photo})` } : undefined}
                aria-hidden="true"
              >
                {member.photo ? '' : member.initials}
              </div>
              <div>
                <h4>{member.name}</h4>
                <span className="tm-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 3. Your problem, our fix ───────── */}
      <section className="ab-fix w-full">
        <div className="hd w-full flex flex-col items-center justify-center text-center">
          <span className="tm-label rv" style={{ marginTop: 0 }}><i />Your problem our fix</span>
          <h2>We <span style={{ color: 'var(--li)' }}>Fix</span> what slows your <span style={{ color: 'var(--li)' }}>Business</span> down</h2>
        </div>
        <div className="tm-fix">
          {fixes.map((item) => (
            <div className="tm-row rv" key={item.problem}>
              <p className="tm-prob">{item.problem}</p>
              <span className="tm-arr" aria-hidden="true">→</span>
              <p className="tm-sol">{item.fix}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 4. Why clients choose us ───────── */}
      <section className="ab-why w-full">
        <div className="hd w-full flex flex-col items-center justify-center text-center">
          <Badge icon="trend" className="rv">Proven Results</Badge>
          <h2>Why <span>clients</span> choose <span>us</span></h2>
          <p>Four promises we keep on every single project</p>
        </div>
        <div className="grid w-full">
          {reasons.map((reason) => (
            <div className="card sp rv" key={reason.title}>
              <div style={{ width: 52, height: 52, display: 'grid', placeItems: 'center', borderRadius: 16, background: 'rgba(158,235,32,0.24)', color: 'var(--li)', marginBottom: 16 }}><Icon name={reason.icon} className="w-6 h-6" /></div>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── 5. Our approach ───────── */}
      <section className="ab-approach w-full">
        <h2 className="rv">
          We start with your <span>goals</span> not a <span>template</span>
        </h2>
        <div className="ab-div" aria-hidden="true" />
        <div className="rv">
          <p>
            A website that looks good but brings no customers is a cost not an asset So we start every
            project with your goals — more enquiries more sales less manual work — and build toward that number
          </p>
          <p>
            We design clear interfaces and build with Next.js React Node.js and Python Then we add AI where
            it saves real time — chatbots that answer customers automations that remove repetitive work and
            systems that follow up on every lead
          </p>
          <p>
            And you always talk directly to the people building your product Clear updates no jargon and a
            reply within one business day
          </p>
        </div>
      </section>

      {/* ───────── 6. How we work ───────── */}
      <div className="hd w-full flex flex-col items-center justify-center text-center">
        <Badge icon="users" className="rv">How we work</Badge>
        <h2>From <span>idea</span> to <span>launch</span></h2>
      </div>
      <div className="grid w-full">
        {steps.map((step) => (
          <div className="card sp rv" key={step.title}>
            <div style={{ width: 52, height: 52, display: 'grid', placeItems: 'center', borderRadius: 16, background: 'rgba(158,235,32,0.24)', color: 'var(--li)', marginBottom: 16 }}><Icon name={step.icon} className="w-6 h-6" /></div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>

      {/* ───────── 7. CTA ───────── */}
      <section className="cc w-full flex flex-col items-center justify-center text-center">
        <Badge icon="rocket" className="rv">Let&apos;s build something</Badge>
        <h2>Your next <span style={{ color: 'var(--li)' }}>Idea</span> starts here</h2>
        <p>Tell us what you&apos;re working on and we&apos;ll help plan the next step</p>
        <div className="cta flex items-center justify-center">
          <ActionLink href="/contact">Talk to our team</ActionLink>
        </div>
      </section>

      <style>{css}</style>
    </PageFrame>
  )
}