import { useMemo, useState } from 'react'

import { featuredProjectIds, projects, type Project } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectDialog } from './ProjectDialog'

export function Archive() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null)
  const featuredProjects = useMemo(
    () => featuredProjectIds.map((id) => projects.find((project) => project.id === id)).filter((project): project is Project => Boolean(project)),
    [],
  )

  const closeDialog = () => setSelectedProject(null)

  const selectProject = (nextProject: Project, trigger: HTMLButtonElement) => {
    setReturnFocusTo(trigger)
    setSelectedProject(nextProject)
  }

  return (
    <>
      <section className="selected-projects" aria-labelledby="selected-projects-title">
        <div className="archive__heading">
          <div>
            <p className="eyebrow">Selected works</p>
            <h2 id="selected-projects-title">Selected projects</h2>
          </div>
        </div>
        <div className="project-grid project-grid--selected">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onSelect={selectProject} openLabelPrefix="Open selected" />
          ))}
        </div>
      </section>
      {selectedProject && <ProjectDialog project={selectedProject} onClose={closeDialog} returnFocusTo={returnFocusTo} />}
    </>
  )
}
