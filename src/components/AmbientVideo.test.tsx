import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AmbientVideo } from './AmbientVideo'

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void

let observerCallback: ObserverCallback | null = null
const observe = vi.fn()
const disconnect = vi.fn()

function setReducedMotion(reduced: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

beforeEach(() => {
  observerCallback = null
  observe.mockClear()
  disconnect.mockClear()
  setReducedMotion(false)
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: ObserverCallback) {
      observerCallback = callback
    }
    observe = observe
    disconnect = disconnect
    unobserve = vi.fn()
    takeRecords = vi.fn()
    root = null
    rootMargin = ''
    thresholds = []
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('AmbientVideo', () => {
  it('ships a poster and never downloads the clip up front', () => {
    render(<AmbientVideo label="Test reel" poster="/media/poster.webp" src="/media/clip.mp4" />)

    const video = screen.getByLabelText('Test reel') as HTMLVideoElement
    expect(video).toHaveAttribute('poster', '/media/poster.webp')
    expect(video).toHaveAttribute('preload', 'none')
    expect(video.muted).toBe(true)
    expect(video.loop).toBe(true)
    expect(video.autoplay).toBe(false)
  })

  it('allows an eager poster-sized metadata preload for the hero clip', () => {
    render(<AmbientVideo eager label="Hero reel" poster="/media/poster.webp" src="/media/clip.mp4" />)

    expect(screen.getByLabelText('Hero reel')).toHaveAttribute('preload', 'metadata')
  })

  it('plays only while intersecting and pauses when it leaves the viewport', () => {
    render(<AmbientVideo label="Test reel" poster="/media/poster.webp" src="/media/clip.mp4" />)

    const video = screen.getByLabelText('Test reel') as HTMLVideoElement
    const play = vi.spyOn(video, 'play').mockResolvedValue(undefined)
    const pause = vi.spyOn(video, 'pause').mockImplementation(() => {})

    expect(observe).toHaveBeenCalledWith(video)

    observerCallback?.([{ isIntersecting: true }])
    expect(play).toHaveBeenCalledOnce()

    observerCallback?.([{ isIntersecting: false }])
    expect(pause).toHaveBeenCalledOnce()
  })

  it('never autoplays in reduced-motion mode and leaves the poster in place', () => {
    setReducedMotion(true)
    render(<AmbientVideo label="Test reel" poster="/media/poster.webp" src="/media/clip.mp4" />)

    const video = screen.getByLabelText('Test reel') as HTMLVideoElement
    const play = vi.spyOn(video, 'play').mockResolvedValue(undefined)

    expect(observe).not.toHaveBeenCalled()
    observerCallback?.([{ isIntersecting: true }])
    expect(play).not.toHaveBeenCalled()
    expect(video).toHaveAttribute('controls')
  })
})
