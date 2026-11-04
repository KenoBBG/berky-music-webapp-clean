import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import App from './App'

afterEach(() => window.history.replaceState({}, '', '/'))

describe('producer archive', () => {
  it('features verified producer credits before artist releases and links to the archive', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'The work behind the sound.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Wunder by AYLIVA, Berky producer credit on Genius/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Nie deins by AYLIVA, Berky producer credit on Genius/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Explore the full release archive/i })).toHaveAttribute('href', '/archive')
    expect(screen.queryByRole('heading', { name: 'Release calendar' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Selected projects' })).toBeInTheDocument()
  })

  it('renders the complete archive on a direct /archive visit', async () => {
    window.history.replaceState({}, '', '/archive')
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('heading', { name: 'Selected projects' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Release calendar' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^Open release /i })).toHaveLength(32)
    expect(screen.queryByRole('button', { name: /open release wie\? \(cover\)/i })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open release afterhour/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'EPs' }))
    expect(screen.getByRole('button', { name: /open release hör am stück/i })).toBeInTheDocument()
  })

  it('presents the artist signal, process, and booking route', () => {
    render(<App />)

    expect(screen.getByRole('img', { name: 'Berky Musik' })).toBeInTheDocument()
    expect((screen.getByLabelText('Berky visual reel') as HTMLVideoElement).muted).toBe(true)
    expect(within(screen.getByRole('heading', { level: 1 })).getByRole('img', { name: 'Berky Musik' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const signalStrip = screen.getByLabelText('Artist roles')
    expect(within(signalStrip).getByText('Producer')).toBeInTheDocument()
    expect(within(signalStrip).getByText('Writer')).toBeInTheDocument()
    expect(within(signalStrip).getByText('Pianist')).toBeInTheDocument()
    expect(within(signalStrip).getByText('Artist')).toBeInTheDocument()
    expect(screen.getByText(/sound architecture/i)).toBeInTheDocument()

    const spotifyProfile = screen.getByRole('link', { name: /spotify artist profile/i })
    expect(spotifyProfile).toHaveAttribute('href', 'https://open.spotify.com/intl-de/artist/2pMOrhY7Oit4TTRe6zEvJ2?si=-Q08X5qRStmu0YT0sz6SLg')
    expect(spotifyProfile).toHaveAttribute('target', '_blank')
    expect(spotifyProfile).toHaveAttribute('rel', 'noreferrer')
    expect(screen.getByText('Booking [placeholder]')).toBeInTheDocument()
  })

  it('removes the lower releases archive while retaining selected projects', () => {
    render(<App />)

    expect(screen.queryByRole('heading', { name: 'Releases' })).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Search the archive')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Selected projects' })).toBeInTheDocument()
  })

  it('keeps visible project titles as semantic headings after archive styling', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 3, name: 'move like water' })).toHaveLength(1)
    expect(screen.getAllByRole('heading', { level: 3, name: 'freier fall' })).toHaveLength(1)
  })

  it('presents an about section on the homepage', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'About Berky' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /berky in a maze-like set/i })).toBeInTheDocument()
  })

  it('filters the release calendar across the full archive and exposes the active state', async () => {
    window.history.replaceState({}, '', '/archive')
    const user = userEvent.setup()
    render(<App />)

    const filter2020 = screen.getByRole('button', { name: '2020' })
    await user.click(filter2020)

    expect(filter2020).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /open release centre court/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /open release renn/i })).not.toBeInTheDocument()
  })

  it('labels releases without an API date explicitly instead of exposing a malformed year filter', () => {
    window.history.replaceState({}, '', '/archive')
    render(<App />)

    expect(screen.queryByRole('button', { name: 'Unknown' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'date' })).not.toBeInTheDocument()
  })

  it('filters the full Genius archive by release type without splitting Eno and Gökhan Abi', async () => {
    window.history.replaceState({}, '', '/archive')
    const user = userEvent.setup()
    render(<App />)

    const epFilter = screen.getByRole('button', { name: 'EPs' })
    await user.click(epFilter)

    expect(epFilter).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /open release hör am stück/i })).toBeInTheDocument()
    expect(screen.getByText('Eno & Gökhan Abi')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /open release renn/i })).not.toBeInTheDocument()
  })

  it('shows a complete album tracklist and highlights Genius-confirmed Berky contributions', async () => {
    window.history.replaceState({}, '', '/archive')
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /open release born spinner/i }))

    expect(screen.getByRole('heading', { name: 'Tracklist' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /hide & seek on spotify/i })).toHaveAttribute(
      'href',
      'https://open.spotify.com/track/2gbTS4lVPP5oZwIyyWHeym',
    )
    expect(screen.getByText(/name Berky in the Genius credits/i)).toBeInTheDocument()
    // All three credited tracks on this release are production-only.
    expect(screen.getAllByText(/^Produced ·/)).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'View Genius listing for SASHIMI' })).toHaveAttribute(
      'href',
      'https://genius.com/Reezy-sashimi-lyrics',
    )
  })

  it('shows selected projects in a separately labelled section', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Selected projects' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open selected move like water' })).toBeInTheDocument()
  })

  it('traps focus in project details and initially focuses the close control', async () => {
    const user = userEvent.setup()
    render(<App />)

    const backgroundTrigger = screen.getByRole('button', { name: 'Open selected freier fall' })
    await user.click(screen.getByRole('button', { name: 'Open selected move like water' }))

    const closeButton = screen.getByRole('button', { name: /close project details/i })
    const spotifyLink = screen.getByRole('link', { name: /listen on spotify/i })
    expect(closeButton).toHaveFocus()

    await user.tab()
    expect(spotifyLink).toHaveFocus()
    await user.tab()
    expect(closeButton).toHaveFocus()
    expect(backgroundTrigger).not.toHaveFocus()
    await user.tab({ shift: true })
    expect(spotifyLink).toHaveFocus()
    expect(backgroundTrigger).not.toHaveFocus()
  })

  it('closes project details with Escape and restores focus to its trigger', async () => {
    const user = userEvent.setup()
    render(<App />)

    const trigger = screen.getByRole('button', { name: 'Open selected move like water' })
    await user.click(trigger)
    expect(screen.getByRole('dialog', { name: /move like water/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
