import type { Project, ProjectRole } from '../data/projects'

type SearchableProject = Pick<Project, 'title' | 'artist' | 'roles'>

export function filterProjects<T extends SearchableProject>(
  projects: readonly T[],
  query: string,
  role: ProjectRole | 'All',
): T[] {
  const normalizedQuery = query.trim().toLowerCase()

  return projects.filter((project) => {
    const matchesQuery = !normalizedQuery
      || project.title.toLowerCase().includes(normalizedQuery)
      || project.artist.toLowerCase().includes(normalizedQuery)
    const matchesRole = role === 'All' || project.roles?.includes(role) === true

    return matchesQuery && matchesRole
  })
}
