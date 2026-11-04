import { useMemo, useState } from 'react'

import { geniusProjects } from '../data/geniusProjects'
import { projects, type Project } from '../data/projects'
import { verifiedSpotifyReleases } from '../data/verifiedSpotifyReleases'
import { ProjectDialog } from './ProjectDialog'

const releaseTypes = ['All', 'Single', 'Album', 'EP'] as const
type ReleaseTypeFilter = (typeof releaseTypes)[number]

function releaseYear(project: Project): string {
  return project.releaseDate === 'Unknown date' ? 'Unknown' : project.releaseDate.slice(-4)
}

function normalizedTitle(title: string): string {
  return title.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
}

/**
 * Curated records and explicitly matched Spotify release pages are public.
 * Genius-only credits remain in the source catalogue, not in the release archive.
 */
const legacyProjectsByTitle = new Map(projects.map((project) => [normalizedTitle(project.title), project]))
const matchedLegacyIds = new Set<string>()
const geniusArchiveProjects: Project[] = geniusProjects.filter((project) => Boolean(verifiedSpotifyReleases[project.id])).map((project) => {
  const existing = legacyProjectsByTitle.get(normalizedTitle(project.title))
  if (existing) {
    matchedLegacyIds.add(existing.id)
    return existing
  }
  return {
    id: project.id,
    title: project.title,
    artist: project.artist,
    releaseType: project.releaseType,
    releaseDate: project.releaseDate,
    artworkUrl: project.artworkUrl,
    spotifyUrl: verifiedSpotifyReleases[project.id],
    listenLabel: 'Listen on Spotify',
    creditedTrackCount: project.creditedTrackCount,
  }
})

const calendarProjects = [...geniusArchiveProjects, ...projects.filter((project) => !matchedLegacyIds.has(project.id))]

export function ReleaseCalendar() {
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedType, setSelectedType] = useState<ReleaseTypeFilter>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null)
  const years = useMemo(() => [...new Set(calendarProjects.map(releaseYear))], [])
  const visibleReleases = calendarProjects.filter((project) => (
    (selectedYear === 'All' || releaseYear(project) === selectedYear)
    && (selectedType === 'All' || project.releaseType === selectedType)
  ))

  return (
    <>
      <section className="release-calendar" aria-labelledby="release-calendar-title">
        <div className="release-calendar__heading">
          <div>
            <p className="eyebrow">02 / Archive in motion</p>
            <h1 id="release-calendar-title">Release calendar</h1>
          </div>
          <p>Filter the verified archive. Open a record.</p>
        </div>
        <div className="release-calendar__filters">
          <div className="release-calendar__years" aria-label="Release years">
            <button aria-pressed={selectedYear === 'All'} className={selectedYear === 'All' ? 'is-active' : ''} onClick={() => setSelectedYear('All')} type="button">All</button>
            {years.map((year) => (
              <button aria-pressed={selectedYear === year} className={selectedYear === year ? 'is-active' : ''} key={year} onClick={() => setSelectedYear(year)} type="button">{year}</button>
            ))}
          </div>
          <div className="release-calendar__types" aria-label="Release types">
            {releaseTypes.map((type) => {
              const label = type === 'All' ? 'All types' : type === 'EP' ? 'EPs' : `${type}s`
              return (
                <button aria-pressed={selectedType === type} className={selectedType === type ? 'is-active' : ''} key={type} onClick={() => setSelectedType(type)} type="button">{label}</button>
              )
            })}
          </div>
        </div>
        <ol className="release-calendar__track">
          {visibleReleases.map((project) => (
            <li key={project.id}>
              <span className="release-calendar__date">{project.releaseDate}</span>
              <button
                aria-label={`Open release ${project.title}`}
                onClick={(event) => {
                  setReturnFocusTo(event.currentTarget)
                  setSelectedProject(project)
                }}
                type="button"
              >
                <img src={project.artworkUrl} alt="" />
                <span className="release-calendar__record-type">{project.releaseType}</span>
                <strong>{project.title}</strong>
                <span>{project.artist}</span>
                <i aria-hidden="true">↗</i>
              </button>
            </li>
          ))}
        </ol>
      </section>
      {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} returnFocusTo={returnFocusTo} />}
    </>
  )
}
