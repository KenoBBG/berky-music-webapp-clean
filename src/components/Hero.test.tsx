import { render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { collaborators, currentSignal, dashboardStats, geniusCatalogue } from '../data/signal'
import { CurrentSignal } from './CurrentSignal'
import { Hero } from './Hero'
import { StatsDashboard } from './StatsDashboard'

function setReducedMotion(reduced: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: reduced && query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })) as unknown as typeof window.matchMedia
}

describe('Hero', () => {
  it('leaves the reel free of overlaid copy', () => {
    const { container } = render(<Hero />)

    expect(screen.getByLabelText('Berky visual reel')).toBeInTheDocument()
    expect(container.querySelector('.credit-ticker')).toBeNull()
    expect(screen.queryByText(/songs credited/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/producer \/ writer \/ pianist/i)).not.toBeInTheDocument()
  })

  it('keeps the wordmark as the single page-level heading in the brand bar', () => {
    const { container } = render(<Hero />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(within(heading).getByRole('img', { name: 'Berky Musik' })).toBeInTheDocument()
    expect(container.querySelector('.brand-bar')).toContainElement(heading)
  })
})

describe('StatsDashboard', () => {
  it('names the collaborators it can source and surfaces the catalogue count as a stat card', () => {
    setReducedMotion(false)
    render(<StatsDashboard />)

    const ticker = screen.getByRole('list', { name: /credited collaborators/i })
    for (const { name } of collaborators) {
      expect(within(ticker).getAllByText(name).length).toBeGreaterThan(0)
    }

    const songs = dashboardStats.find(stat => stat.id === 'songs')!
    const songsCard = screen.getByLabelText(`${songs.display} ${songs.label}`)
    expect(within(songsCard).getByRole('link', { name: /genius, read 29 oct 2026/i })).toHaveAttribute(
      'href',
      geniusCatalogue.sourceUrl,
    )
    expect(screen.getByLabelText('65 Artists worked with')).toBeInTheDocument()
    expect(screen.getByLabelText('4 Releases as artist')).toBeInTheDocument()
  })

  it('labels the live platform metrics as pending rather than inventing a figure', () => {
    setReducedMotion(false)
    render(<StatsDashboard />)

    expect(screen.getByText('Live metrics — in evaluation')).toBeInTheDocument()
    expect(screen.getByText('Spotify popularity score')).toBeInTheDocument()
    expect(screen.getByText('Monthly listeners')).toBeInTheDocument()
    // The pending card must not fabricate a figure: no digits inside it.
    const pending = screen.getByText('Live metrics — in evaluation').closest('.stat-card--pending')!
    expect(pending.textContent).not.toMatch(/\d/)
  })

  it('duplicates the ticker for seamless scrolling but hides the copy from screen readers', () => {
    setReducedMotion(false)
    const { container } = render(<StatsDashboard />)

    const runs = container.querySelectorAll('.credit-ticker__run')
    expect(runs).toHaveLength(2)
    expect(runs[1]).toHaveAttribute('aria-hidden', 'true')
  })

  it('drops the duplicated run in reduced-motion mode so nothing is in motion', () => {
    setReducedMotion(true)
    const { container } = render(<StatsDashboard />)

    expect(container.querySelectorAll('.credit-ticker__run')).toHaveLength(1)
    expect(container.querySelector('.credit-ticker')).toHaveAttribute('data-static', 'true')
  })
})

describe('CurrentSignal', () => {
  it('renders every signal block with its heading', () => {
    render(<CurrentSignal />)

    const region = screen.getByRole('region', { name: /where the practice stands now/i })
    for (const block of currentSignal) {
      expect(within(region).getByRole('heading', { level: 4, name: block.heading })).toBeInTheDocument()
    }
  })

  it('states the snapshot date on every figure it quotes rather than implying live data', () => {
    render(<CurrentSignal />)

    expect(screen.getByText(/723,277 streams, read 25 Oct 2026/)).toBeInTheDocument()
    expect(screen.getByText(/Sum of lead-track Spotify counts, read 25 Oct 2026/)).toBeInTheDocument()
  })

  it('links the latest release out to Spotify in a new tab', () => {
    render(<CurrentSignal />)

    const link = screen.getByRole('link', { name: /planet on spotify/i })
    expect(link).toHaveAttribute('href', 'https://open.spotify.com/album/4AGuMclFqXQScBUF4OICPS')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })
})
