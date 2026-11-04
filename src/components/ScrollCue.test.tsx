import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Mock } from 'vitest'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ScrollCue } from './ScrollCue'

function setReducedMotion(reduced: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

function scrollTo(y: number) {
  act(() => {
    Object.defineProperty(window, 'scrollY', { configurable: true, value: y, writable: true })
    window.dispatchEvent(new Event('scroll'))
  })
}

describe('ScrollCue', () => {
  let target: HTMLElement
  let scrollIntoView: Mock<(arg?: boolean | ScrollIntoViewOptions) => void>

  beforeEach(() => {
    setReducedMotion(false)
    window.innerHeight = 800
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0, writable: true })
    scrollIntoView = vi.fn<(arg?: boolean | ScrollIntoViewOptions) => void>()
    target = document.createElement('div')
    target.id = 'page-content'
    target.scrollIntoView = scrollIntoView
    document.body.append(target)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
  })

  afterEach(() => {
    target.remove()
    vi.restoreAllMocks()
  })

  it('offers the cue as a button so the first screen is operable by keyboard', () => {
    render(<ScrollCue />)

    expect(screen.getByRole('button', { name: /scroll/i })).toBeInTheDocument()
  })

  it('jumps to the page content when used', async () => {
    render(<ScrollCue />)

    await userEvent.click(screen.getByRole('button', { name: /scroll/i }))

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
  })

  it('jumps without animation when the visitor asked for reduced motion', async () => {
    setReducedMotion(true)
    render(<ScrollCue />)

    await userEvent.click(screen.getByRole('button', { name: /scroll/i }))

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' })
  })

  it('retires itself from sight and tab order once scrolling has started', () => {
    const { container } = render(<ScrollCue />)
    const cue = container.querySelector('.scroll-cue')!

    expect(cue).not.toHaveAttribute('data-retired')

    scrollTo(400)

    expect(cue).toHaveAttribute('data-retired', 'true')
    expect(cue).toHaveAttribute('aria-hidden', 'true')
    expect(cue).toHaveAttribute('tabindex', '-1')
  })

  it('stays visible for a nudge too small to mean the visitor has moved on', () => {
    const { container } = render(<ScrollCue />)

    scrollTo(40)

    expect(container.querySelector('.scroll-cue')).not.toHaveAttribute('data-retired')
  })
})
