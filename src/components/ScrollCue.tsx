import { useEffect, useRef, useState } from 'react'

const CONTENT_ID = 'page-content'

/**
 * Bottom-of-hero cue that the page continues. It is a real button rather than
 * decoration, so the first screen is operable by keyboard, and it retires once
 * the visitor has started scrolling and no longer needs the hint.
 */
export function ScrollCue() {
  const [retired, setRetired] = useState(false)
  const frame = useRef<number>(0)

  useEffect(() => {
    function onScroll() {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        setRetired(window.scrollY > window.innerHeight * 0.12)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function toContent() {
    const target = document.getElementById(CONTENT_ID)
    if (!target) return

    const reduced = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <button
      aria-hidden={retired ? 'true' : undefined}
      className="scroll-cue"
      data-retired={retired ? 'true' : undefined}
      onClick={toContent}
      tabIndex={retired ? -1 : undefined}
      type="button"
    >
      <span className="scroll-cue__label">Scroll</span>
      <span className="scroll-cue__rail" aria-hidden="true">
        <span className="scroll-cue__dot" />
      </span>
    </button>
  )
}
