import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import type { Project } from '../data/projects'
import type { CreditRole } from '../data/tracklists'
import { getTracklist } from '../data/tracklists'

/**
 * Name the credit the way a liner note would. Falls back to the neutral wording
 * when Genius flags him on a song without naming a role, which happens on a
 * handful of entries.
 */
function formatRoles(roles: readonly CreditRole[] | undefined): string {
  const produced = roles?.includes('producer')
  const written = roles?.includes('writer')

  if (produced && written) return 'Produced & written'
  if (produced) return 'Produced'
  if (written) return 'Written'
  return 'Berky credited'
}

interface ProjectDialogProps {
  project: Project
  onClose: () => void
  returnFocusTo: HTMLElement | null
}

export function ProjectDialog({ project, onClose, returnFocusTo }: ProjectDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLElement>(null)
  const tracklist = getTracklist(project.id)

  useEffect(() => {
    const main = document.querySelector<HTMLElement>('#root')
    const previousAriaHidden = main ? main.getAttribute('aria-hidden') : null

    if (main) {
      main.inert = true
      main.setAttribute('aria-hidden', 'true')
    }

    closeButtonRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()

      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable?.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialogRef.current?.contains(event.target)) {
        closeButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
      if (main) {
        main.inert = false
        if (previousAriaHidden === null) main.removeAttribute('aria-hidden')
        else main.setAttribute('aria-hidden', previousAriaHidden)
      }
      returnFocusTo?.focus()
    }
  }, [onClose, returnFocusTo])

  return createPortal(
    <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section ref={dialogRef} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
        <div className="project-dialog__cover-glow" style={{ backgroundImage: `url(${project.artworkUrl})` }} aria-hidden="true" />
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close project details">×</button>
        <img src={project.artworkUrl} alt={`Artwork for ${project.title}`} />
        <p className="eyebrow">{project.releaseType} · {project.releaseDate}</p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p>{project.artist}</p>
        <p className="dialog-note">Practice labels in the archive describe general practice, not project-specific credits.</p>
        {project.creditedTrackCount && (
          <p className="dialog-note">
            {project.creditedTrackCount} {project.creditedTrackCount === 1 ? 'verified Berky credit' : 'verified Berky credits'} on this release. Details are sourced from Genius.
          </p>
        )}
        {project.spotifySnapshot && <p>{project.spotifySnapshot.label}: {project.spotifySnapshot.streams.toLocaleString()} streams ({project.spotifySnapshot.capturedAt})</p>}
        {tracklist && (
          <section className="dialog-tracklist" aria-labelledby="tracklist-title">
            <div className="dialog-tracklist__heading">
              <div>
                <p className="eyebrow">{tracklist.isComplete === false ? 'Verified credits' : 'Album detail'}</p>
                <h3 id="tracklist-title">{tracklist.isComplete === false ? 'Credited tracks' : 'Tracklist'}</h3>
              </div>
              <a href={tracklist.sourceUrl} target="_blank" rel="noreferrer">{tracklist.sourceLabel ?? 'Spotify source ↗'}</a>
            </div>
            <p className="dialog-tracklist__verification">
              {tracklist.isComplete === false
                ? 'Genius names Berky on every track listed below, with the role shown exactly as recorded. This is a verified credit list, not an inferred complete album tracklist.'
                : tracklist.sourceLabel === 'Genius source ↗'
                  ? 'Full tracklist sourced from Genius. Highlighted tracks name Berky in the Genius credits, with the role shown exactly as recorded.'
                  : 'Highlighted tracks name Berky in the Genius credits, with the role shown as Genius records it. Spotify links stay attached to each track; nothing is inferred beyond those two sources.'}
            </p>
            <ol>
              {tracklist.tracks.map((track, index) => (
                <li className={track.creditStatus === 'verified' ? 'is-credited' : ''} key={`${index}-${track.title}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {track.spotifyUrl
                    ? <a aria-label={`${track.title} on ${track.trackSourceLabel ?? 'Spotify'}`} href={track.spotifyUrl} target="_blank" rel="noreferrer">{track.title}</a>
                    : <span className="dialog-tracklist__title">{track.title}</span>}
                  {track.creditStatus === 'verified' && (
                    <strong>
                      {formatRoles(track.creditRoles)} · <a aria-label={`View Genius listing for ${track.title}`} href={track.creditSourceUrl} target="_blank" rel="noreferrer">Genius</a>
                    </strong>
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}
        <a href={project.spotifyUrl} target="_blank" rel="noreferrer">{project.listenLabel ?? 'Listen on Spotify'}</a>
      </section>
    </div>
  , document.body)
}
