import type { ReactNode } from 'react'
import Link from 'next/link'

const iconPaths: Record<string, string> = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  award: 'M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12ZM8.5 14 7 22l5-3 5 3-1.5-8',
  box: 'm12 2 9 5v10l-9 5-9-5V7l9-5Zm-9 5 9 5 9-5m-9 5v10',
  bot: 'M12 8V4m-3 9v2m6-2v2M7 8h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z',
  briefcase: 'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11H3V8Zm6-2V4h6v2m-12 6h18m-11-2v4h4v-4',
  buoy: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-6.4-.4 3.6 3.6m8.8 5.8-3.6-3.6m3.6-5.8-3.6 3.6m-5.2 2.2-3.6 3.6',
  chat: 'M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-4-.9L3 21l1.8-4.4a8 8 0 1 1 16.2-5.1Z',
  cart: 'M2 3h3l3 12h10l3-9H6m3 14h.01M18 20h.01',
  check: 'm4 12 5 5L20 6',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6m-3-14-4 20',
  cpu: 'M5 5h14v14H5zM9 9h6v6H9zm3-7v3m0 14v3M2 9h3m14 0h3M2 15h3m14 0h3',
  globe: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-10-10h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20Z',
  folder: 'M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z',
  news: 'M5 3h14a2 2 0 0 1 2 2v16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 5h8m-8 4h8m-8 4h5',
  palette: 'M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1.5-3.3 1.8 1.8 0 0 1 1.4-3h.8A4.3 4.3 0 0 0 21 10.4 7.4 7.4 0 0 0 12 3ZM7.5 10h.01M10 7h.01m5 1h.01m1.5 4h.01',
  phone: 'M6 2h12v20H6zM10 18h4',
  plug: 'M9 3v5m6-5v5M6 8h12v4a6 6 0 0 1-12 0V8Zm6 10v3',
  rocket: 'M13 2 4 13h7l-1 9 10-12h-7l1-8Z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm6-2 4 4',
  sparkles: 'm12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Zm7 12 1.2 3.8L24 20l-3.8 1.2L19 25l-1.2-3.8L14 20l3.8-1.2L19 15Z',
  trend: 'm3 17 6-6 4 4 8-8m-6 0h6v6',
  users: 'M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.9m-1-12a4 4 0 0 1 0 7.8',
  zap: 'm13 2-9 12h7l-1 8 10-12h-7l1-8Z',
  send: 'm22 2-7 20-4-9-9-4ZM22 2 11 13',
  x: 'M6 6l12 12M18 6 6 18',
  up: 'M12 19V5M5 12l7-7 7 7',
  mic: 'M9 2h6v12a3 3 0 0 1-6 0V2ZM5 11a7 7 0 0 0 14 0M12 18v4',
  fb: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  ln: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  gh: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-1-2.6c3.3-.4 6.8-1.6 6.8-7.3A5.7 5.7 0 0 0 21.3 4.8 5.3 5.3 0 0 0 21.2 1S20 .6 17 2.6a13.4 13.4 0 0 0-7 0C7 .6 5.8 1 5.8 1a5.3 5.3 0 0 0-.1 3.8A5.7 5.7 0 0 0 4.2 8.8c0 5.7 3.5 6.9 6.8 7.3a3.4 3.4 0 0 0-1 2.6V22',
  ig: 'M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5 4a4 4 0 1 0 8 0 4 4 0 0 0-8 0Zm9.5-5.5h.01',
  rd: 'M4 14a8 6.5 0 1 0 16 0a8 6.5 0 1 0-16 0M12 7.6 15.8 3.4M15.6 2.6a1 1 0 1 0 2 0a1 1 0 1 0-2 0M8.1 13.5a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0-1.8 0M14.1 13.5a0.9 0.9 0 1 0 1.8 0a0.9 0.9 0 1 0-1.8 0M9.5 16.8Q12 18.3 14.5 16.8',
  xx: 'M4 4l16 16M20 4 4 20',
  cash: 'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4 6a6 6 0 0 1 12 0 6 6 0 0 1-12 0Zm6-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  agent: 'M10 9h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2ZM10.8 12.5h.01M13.2 12.5h.01M12 9V4M12 4h.01M2 13a10 5 0 1 0 20 0 10 5 0 0 0-20 0ZM22 13h.01',
  workflow: 'M4 6h4v4H4Zm12 0h4v4h-4Zm-6 12h4v4h-4ZM8 8h8m-4 2v8',
  target: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z',
  monitor: 'M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 18h8m-4-4v4',
  layers: 'M12 2l10 5-10 5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM12 6v6l4 2',
  whatsapp: 'M12 2a10 10 0 0 0-10 10c0 2.1.7 4 1.8 5.6L2 22l4.6-1.7A10 10 0 1 0 12 2ZM9 7h6v8H9Zm2 6h2',
  mobileapp: 'M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM8 6h3v3H8zM13 6h3v3h-3zM8 11h3v3H8zM13 11h3v3h-3zM10 18.5h4',

}

export function Icon({ name, className = 'i', color }: { name: string; className?: string; color?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={color ? { color } : undefined}
    >
      <path d={iconPaths[name] ?? iconPaths.sparkles} />
    </svg>
  )
}

export function Badge({ icon, children, className = '' }: { icon: string; children: ReactNode; className?: string }) {
  return <span className={`bdg ${className}`}><b><Icon name={icon} /></b>{children}</span>
}

export function ActionLink({ href, children, light = false, className = '' }: { href: string; children: ReactNode; light?: boolean; className?: string }) {
  return <Link className={`btn mag${light ? ' lt' : ''}${className ? ` ${className}` : ''}`} href={href}>{children}<i className="ar"><Icon name="arrow" /></i></Link>
}

export function PageFrame({ children }: { children: ReactNode }) {
  return (
    <main id="top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <section className="page flex flex-col items-center w-full">
        <div className="w-full">{children}</div>
      </section>
    </main>
  )
}

export const serviceItems = [
  { icon: 'cpu', title: 'High-Performance Web Apps', description: 'Powerful custom apps and portals built to handle your business smoothly, scale without crashing, and keep your revenue flowing.', status: 'Now' },
  { icon: 'palette', title: 'High-Converting Design', description: 'Stunning, user-friendly designs crafted specifically to turn casual website visitors into paying buyers.', status: 'Now' },
  { icon: 'cart', title: 'Online Stores That Sell', description: 'Lightning-fast online stores with a seamless checkout process designed to double your daily online sales', status: 'Now' },
  { icon: 'bot', title: 'Automated Workflows', description: 'Smart systems that handle customer emails, leads, and tasks automatically—saving your team hours and cutting overhead costs.', status: 'Now' },
  { icon: 'chat', title: '24/7 Sales Assistant', description: 'An intelligent digital salesperson active on your website and WhatsApp round-the-clock, qualifying leads and closing deals while you sleep.', status: 'Now' },
  { icon: 'plug', title: 'Seamless Connections', description: 'Connecting all your software, payment gateways, and tools into one smooth system so nothing ever slips through the cracks.', status: 'Now' },
  { icon: 'mobileapp', title: 'Mobile & PWA', description: 'Installable apps that feel native on any phone, load instantly, keep working on weak internet, and bring customers back with a home-screen icon and timely reminders.', status: 'Now' },
  { icon: 'rocket', title: 'SEO & Performance', description: 'Lightning-fast websites tuned for Core Web Vitals, with secure hosting and ongoing maintenance, so Google ranks you higher, visitors stay longer, and nothing breaks while you focus on your business.', status: 'Now' },
  { icon: 'agent', title: 'Autonomous AI Agents', description: 'AI agents that plan and complete multi-step tasks on their own, from researching leads to sending follow-ups, saving your team hours every day.', status: 'Now' },
  { icon: 'mic', title: 'Voice AI', description: 'Voice assistants that answer calls, handle support and book appointments around the clock, so no customer is ever left waiting.', status: 'Now' },
  { icon: 'globe', title: 'Personalised Websites', description: 'Pages that adapt content to each visitor in real time.', status: 'Now' },
  { icon: 'box', title: '3D & Immersive Web', description: 'Interactive 3D product views and WebXR experiences.', status: 'Now' },
  { icon: 'cart', title: 'Agentic Commerce Stores', description: 'Online stores built so AI shopping assistants can find your products, compare them and place orders, bringing you buyers who never open a browser.', status: 'Now' },
  { icon: 'plug', title: 'MCP & AI Integrations', description: 'Connect your CRM, inventory and payments through MCP so any AI assistant can safely use your business tools and data.', status: 'Now' },
  { icon: 'shield', title: 'AI Guardrails & Governance', description: 'Spending limits, approval steps and audit logs that keep every AI agent safe, in control and accountable.', status: 'Next' },
  { icon: 'search', title: 'AI Search Visibility', description: 'Get your business recommended by ChatGPT, Claude and Gemini, not just ranked on Google.', status: 'Next' },
  { icon: 'workflow', title: 'Multi-Agent Workflows', description: 'Teams of AI agents that work together, one finds leads, one follows up, one reports, so your operations run themselves.', status: 'Next' },
] as const




export const projects = [
  {
    id: 'saas',
    title: 'Guraisu',
    shortTitle: <>E-commerce | <span style={{ color: 'var(--li)' }}>Luxury Brand</span></>,
    tag: 'Premier Luxury Store',
    type: 'Luxury E-commerce',
    category: 'E-commerce',
    description: 'A high-end, lightning-fast digital storefront built to deliver an exclusive shopping experience and drive premium sales.',
    subtitle: 'A premium D2C shopping experience designed for high conversions and speed',
    sector: 'Fashion & Luxury',
    engagement: 'Store & Brand Build',
    status: 'Live',
    theme: '',
    image: '/projects/E-commerce.jpg',
    challenge: 'The client needed a luxurious online presence that reflected their high-end brand identity while offering ultra-fast page load speeds, seamless payment integrations, and zero inventory friction during high-traffic sales.',
    technologies: ['Next.js', 'React', 'Shopify Plus', 'Stripe', 'Tailwind CSS', 'Vercel'],
    built: [
      ['Luxury UI/UX', 'Custom high-end interface tailored to convey brand exclusivity.'],
      ['Lightning-Fast Checkout', 'Optimized checkout flow reducing cart abandonment rates.'],
      ['Automated Inventory', 'Real-time stock synchronization across warehouse and storefront.'],
      ['Mobile Optimization', 'Fluid mobile navigation delivering an app-like shopping experience.']
    ]
  },
  {
    id: 'ai',
    title: 'DocNode',
    shortTitle: <><span style={{ color: 'var(--li)' }}>AI Healthcare</span> Platform</>,
    tag: 'Web App · AI Systems',
    type: 'Healthcare Technology',
    category: 'AI Automation',
    description: 'AI-Powered Hospital Management System that automates patient records, scheduling, and hospital workflows seamlessly.',
    subtitle: 'Streamlining hospital management and patient records with intelligent automation.',
    sector: 'Healthcare',
    engagement: 'Full-Stack & AI Build',
    status: 'Live',
    theme: 'b',
    image: '/projects/HealthCare.jpg',
    challenge: 'Hospitals faced immense delays due to manual patient onboarding, scattered medical records, and inefficient appointment scheduling, which increased administrative costs and reduced patient satisfaction.',
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'OpenAI API', 'Docker'],
    built: [
      ['Smart Patient Triage', 'AI agent categorizes patient inquiries and schedules urgent care appointments.'],
      ['Automated EMR Management', 'Instant record updates and summaries generated from patient interactions.'],
      ['Staff Allocation Dashboard', 'Real-time tracking of doctor availability and ward capacities.'],
      ['Secure Data Compliance', 'Role-based encryption ensuring patient health records remain confidential.']
    ]
  },
  {
    id: 'store',
    title: 'LeadBot',
    shortTitle: <><span style={{ color: 'var(--li)' }}>AI CRM</span> & Assistant</>,
    tag: 'AI Agent · Messaging CRM',
    type: 'AI System',
    category: 'Sales Automation',
    description: 'AI-powered CRM and phone messaging assistant that handles incoming leads, calls, and customer chats 24/7.',
    subtitle: 'An intelligent digital assistant that qualifies leads and closes sales on autopilot.',
    sector: 'Sales & Customer Engagement',
    engagement: 'AI Agent & CRM Build',
    status: 'Live',
    theme: 'c',
    image: '/projects/AiCRM.jpg',
    challenge: 'Businesses were losing potential clients outside of operating hours because human agents could not respond instantly to phone calls, WhatsApp messages, and website leads.',
    technologies: ['OpenAI', 'Python', 'WhatsApp Business API', 'Twilio', 'Node.js', 'MongoDB'],
    built: [
      ['24/7 Phone & Chat Agent', 'Responds to inquiries across WhatsApp, SMS, and web instantly.'],
      ['Automated Lead Qualification', 'Asks custom qualifying questions and tags high-value prospects.'],
      ['CRM Auto-Sync', 'Directly creates and updates deals in the client’s existing sales pipeline.'],
      ['Smart Human Handover', 'Seamlessly routes hot leads to sales reps with full chat history.']
    ]
  },
  {
    id: 'voice-receptionist',
    title: 'AI Voice Receptionist',
    shortTitle: <><span style={{ color: 'var(--li)' }}>AI Voice</span> Receptionist</>,
    tag: 'Voice AI · Phone Reception',
    type: 'Voice AI',
    category: 'Voice Assistant',
    description: 'A natural-sounding AI receptionist that answers every call, books appointments and routes urgent requests to your team, day and night.',
    subtitle: 'Every call answered, every appointment booked — even after hours.',
    sector: 'Customer Support & Services',
    engagement: 'Voice AI Build',
    status: 'Live',
    theme: '',
    image: '/projects/AiVoice.png',
    challenge: 'Businesses were missing calls outside office hours and losing customers to faster competitors, while reception staff spent their whole day on repetitive phone screening instead of helping the people in front of them.',
    technologies: ['OpenAI', 'ElevenLabs', 'Twilio', 'Node.js', 'Next.js', 'PostgreSQL'],
    built: [
      ['Natural Voice Reception', 'A human-like voice agent that greets callers, answers questions and takes messages.'],
      ['Appointment Booking', 'Books, reschedules and confirms appointments straight into the team calendar.'],
      ['Smart Call Routing', 'Urgent requests are transferred to a team member instantly, with full context.'],
      ['After-Hours Coverage', 'The receptionist works nights and weekends, so no call is ever missed.']
    ]
  },
  {
    id: 'agentic-commerce',
    title: '3D Animated Website',
    shortTitle: <><span style={{ color: 'var(--li)' }}>3D Animated</span> Website</>,
    tag: '3D Animations · Interactive Web',
    type: '3D Animated',
    category: 'Three.js',
    description: 'An immersive, cinema-grade 3D web experience engineered for smooth 60fps interaction — blending real-time WebGL visuals with high-converting brand storytelling',
    subtitle: 'An interactive 3D web experience engineered for smooth motion — built to engage visitors visually and convert attention into action',
    sector: 'Creative Tech & Interactive Brand Experience',
    engagement: 'Full-Stack 3D Web Design & Engineering',
    status: 'Live',
    theme: 'b',
    image: '/projects/3D.jpg',
    challenge: 'Most 3D websites fail in production because heavy polygonal meshes, uncompressed textures, and unoptimized shader passes crush frame rates — causing laggy scroll interactions, overheating on mobile devices, and slow initial load times that kill user retention before the first scene even renders',
    technologies: ['Three.js', 'React Three Fiber', 'Next.js', 'GSAP', 'GLSL'],
    built: [
      ['Smooth 60fps 3D Rendering', 'Optimized draw calls, scene lighting, and GPU rendering pipelines to keep interactions fluid across desktop and mobile screens'],
      ['Scroll-Driven Motion Choreography', 'Synced camera movement, transitions, and 3D object states with user scroll so storytelling feels natural and responsive'],
      ['Compressed 3D Assets & Fast Load', 'Streamlined 3D meshes and textures for rapid initial loading without sacrificing visual detail or clarity'],
      ['Interactive UI & CTA Flow', 'Paired real-time 3D visuals with clean interface layouts and clear project inquiry pathways so visitors can move smoothly from exploration to action']
    ]
  },
  {
    id: 'mcp-hub',
    title: 'MCP Integration Hub',
    shortTitle: <><span style={{ color: 'var(--li)' }}>MCP</span> Integration Hub</>,
    tag: 'AI Integration · MCP',
    type: 'AI Integration',
    category: 'AI Integrations',
    description: 'A secure hub that connects your CRM, inventory and payments to AI assistants through MCP, so teams can work with their own data in plain language.',
    subtitle: 'Your business data, connected to AI assistants — securely, in plain language.',
    sector: 'Business Operations',
    engagement: 'Integration Build',
    status: 'Live',
    theme: 'c',
    image: '/projects/MCP.jpg',
    challenge: 'Teams wanted to ask AI assistants questions about their own business — sales, stock, payments — but their data lived in separate tools with no safe way to connect it, so answers were guesses instead of facts.',
    technologies: ['Model Context Protocol', 'Node.js', 'TypeScript', 'PostgreSQL', 'OpenAI API', 'Docker'],
    built: [
      ['Secure MCP Connectors', 'CRM, inventory and payments connected through MCP with scoped access.'],
      ['Plain-Language Questions', 'Ask in normal words and get answers from your own live data.'],
      ['Permission Controls', 'Every assistant sees only the data its role is allowed to see.'],
      ['Live Data Sync', 'Answers always come from current data, never from an old export.']
    ]
  },
  {
    id: 'multi-agent-ops',
    title: 'Multi-Agent Operations',
    shortTitle: <><span style={{ color: 'var(--li)' }}>Multi-Agent</span> Operations</>,
    tag: 'AI Agents · Operations',
    type: 'AI Agents',
    category: 'Multi-Agent Workflows',
    description: 'A team of specialised AI agents that research leads, write outreach, follow up and report, working together so routine operations run on their own.',
    subtitle: 'A team of AI agents that runs routine operations while your team focuses on growth.',
    sector: 'Sales & Operations',
    engagement: 'Multi-Agent Build',
    status: 'Live',
    theme: '',
    image: '/projects/AiAgent.jpg',
    challenge: 'The sales team spent most of its week on routine work — researching leads, writing outreach, chasing replies and compiling reports — leaving almost no time for real conversations and closing deals.',
    technologies: ['OpenAI', 'LangChain', 'Python', 'PostgreSQL', 'Slack API', 'Next.js'],
    built: [
      ['Lead Research Agent', 'Researches every new lead and builds a short brief before outreach.'],
      ['Outreach Writer', 'Writes personalised outreach in the team’s voice, ready to send.'],
      ['Follow-Up Agent', 'Chases replies politely and hands warm leads to a human at the right moment.'],
      ['Reporting Dashboard', 'Daily summary of what each agent did, what worked and what needs attention.']
    ]
  },
  {
    id: 'saas-analytics-platform',
    title: 'SaaS Analytics Platform',
    shortTitle: <><span style={{ color: 'var(--li)' }}>SaaS Analytics</span> Platform</>,
    tag: 'SaaS · Analytics Dashboard',
    type: 'SaaS Platform',
    category: 'Web Apps',
    description: 'A subscription analytics platform that turns revenue, churn and usage data into clear dashboards and AI-written insights founders can act on.',
    subtitle: 'Revenue, churn and usage — turned into decisions, not just charts.',
    sector: 'SaaS & Startups',
    engagement: 'SaaS Product Build',
    status: 'Live',
    theme: 'b',
    image: '/projects/Saas.jpg',
    challenge: 'Founders were checking five different tools to understand their subscription business, spotting churn and falling revenue only after the money was already gone.',
    technologies: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Stripe', 'Vercel'],
    built: [
      ['Real-Time Dashboards', 'Revenue, churn and usage update live from every billing and product source.'],
      ['AI-Written Insights', 'Plain-language insights explain what changed and what to do about it.'],
      ['Churn Alerts', 'Automatic alerts when a valuable customer is at risk of leaving.'],
      ['One-Click Reports', 'Weekly performance reports generated and shared automatically.']
    ]
  },
] as const


export function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const img = 'image' in project ? (project.image as string | undefined) : undefined
  return (
    <Link className="card sp rv" href={`/projects/${project.id}`}>
      <div className={`th${img ? ' has-img' : ''}${project.theme ? ` ${project.theme}` : ''}`}>
        {img && <img src={img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
      </div>
      <div className="row"><span className="pl">{project.type}</span><span className="pl">{project.category}</span></div>
      <h3>{project.shortTitle}</h3>
      <p>{project.description}</p>
      <span className="more">View case study <Icon name="arrow" /></span>
    </Link>
  )
}

export function ServiceCard({ service, tagged = false }: { service: (typeof serviceItems)[number]; tagged?: boolean }) {
  return (
    <div className="card sp rv">
      {tagged && <span className={`tag${service.status === 'Next' ? ' n' : ''}`}>{service.status === 'Now' ? 'Available' : 'Coming next'}</span>}
      <div className="ic"><Icon name={service.icon} /></div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  )
}
