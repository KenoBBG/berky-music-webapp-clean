import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project, trigger: HTMLButtonElement) => void
  openLabelPrefix?: string
}

export function ProjectCard({ project, onSelect, openLabelPrefix = 'Open' }: ProjectCardProps) {
  return (
    <article className="project-card">
      <img src={project.artworkUrl} alt={`Artwork for ${project.title}`} />
      <div className="project-card__body">
        <p className="eyebrow">{project.releaseType} · {project.releaseDate}</p>
        <h3>{project.title}</h3>
        <p>{project.artist}</p>
        <button type="button" onClick={(event) => onSelect(project, event.currentTarget)} aria-label={`${openLabelPrefix} ${project.title}`}>
          Open release record
        </button>
      </div>
    </article>
  )
}
