import { useEffect, useRef } from 'react'

interface AmbientVideoProps {
  /** Accessible name; the clip carries no audio, so this describes the visual. */
  label: string
  /** Public-folder path, kept out of the JS bundle so the clip stays separately cacheable. */
  src: string
  poster: string
  className?: string
  /**
   * Hero clips may fetch metadata immediately. Everything below the fold stays at
   * `preload="none"` until it scrolls into view.
   */
  eager?: boolean
}

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function AmbientVideo({ className, eager = false, label, poster, src }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = prefersReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video || reducedMotion) return

    const play = () => {
      const started = video.play()
      if (started && typeof started.catch === 'function') started.catch(() => {})
    }

    if (typeof IntersectionObserver !== 'function') {
      play()
      return
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) play()
        else video.pause()
      }
    }, { threshold: 0.2 })

    observer.observe(video)
    return () => observer.disconnect()
  }, [reducedMotion, src])

  return (
    <video
      ref={videoRef}
      aria-label={label}
      className={className}
      controls={reducedMotion}
      loop
      muted
      playsInline
      poster={poster}
      preload={eager ? 'metadata' : 'none'}
      src={src}
    />
  )
}
