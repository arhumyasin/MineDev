import { Badge, PageFrame, ProjectCard, projects } from '@/components/Design'

const css = `
.pgrid{display:grid;gap:16px;grid-template-columns:repeat(3,1fr)}
@media(max-width:900px){.pgrid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.pgrid{grid-template-columns:1fr}}
`

export default function ProjectsPage() {
  return (
    <PageFrame>
      <style>{css}</style>
      <div className="hd w-full flex flex-col items-center justify-center text-center" style={{ marginTop: 40 }}>
        <Badge icon="folder" className="rv">Our work</Badge>
        <h1><span style={{ color: 'var(--li)' }}>Projects</span> that are <span style={{ color: 'var(--li)' }}>Making Money</span></h1>
        <p>A few examples of web apps, AI experiences and commerce workflows built for ambitious teams.</p>
      </div>
      <div className="pgrid w-full">
        {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </PageFrame>
  )
}
