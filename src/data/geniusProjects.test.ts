import { describe, expect, it } from 'vitest'

import { geniusProjects } from './geniusProjects'

describe('Genius release archive', () => {
  it('exposes every unique credited release container from the verified Genius catalogue', () => {
    expect(geniusProjects).toHaveLength(69)
    expect(new Set(geniusProjects.map((project) => project.id)).size).toBe(69)
  })

  it('keeps the Eno and Gökhan Abi collaboration grouped as one EP release', () => {
    const project = geniusProjects.find((entry) => entry.title === 'HÖR AM STÜCK (EP)')

    expect(project).toMatchObject({
      artist: 'Eno & Gökhan Abi',
      releaseType: 'EP',
      creditedTrackCount: 4,
    })
  })

  it('uses Genius as the source when no verified Spotify release URL exists', () => {
    expect(geniusProjects.every((project) => project.listenLabel === 'View on Genius')).toBe(true)
    expect(geniusProjects.every((project) => project.listenUrl.startsWith('https://genius.com/'))).toBe(true)
  })
})
