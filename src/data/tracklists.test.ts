import { describe, expect, it } from 'vitest'

import { getTracklist, releaseTracklists } from './tracklists'

describe('release tracklists', () => {
  it('includes the complete imported Spotify tracklists for every album dossier', () => {
    expect(releaseTracklists).toHaveLength(6)
    expect(getTracklist('born-spinner')?.tracks).toHaveLength(17)
    expect(getTracklist('in-liebe')?.tracks).toHaveLength(15)
    expect(getTracklist('wilmersdorfs-kind')?.tracks).toHaveLength(14)
    expect(getTracklist('der-letzte-macht-das-licht-aus')?.tracks).toHaveLength(15)
    expect(getTracklist('gartenstadt')?.tracks).toHaveLength(15)
    expect(getTracklist('100-pro')?.tracks).toHaveLength(16)
  })

  it('credits every track the Genius API names Berky on', () => {
    // Counts come from the API catalogue, not the artist page, which truncates
    // to 20 entries and previously left all but three of these unknown.
    const perProject = Object.fromEntries(
      releaseTracklists.map((tracklist) => [
        tracklist.projectId,
        tracklist.tracks.filter((track) => track.creditStatus === 'verified').length,
      ]),
    )

    expect(perProject).toEqual({
      'born-spinner': 3,
      'in-liebe': 7,
      'wilmersdorfs-kind': 5,
      'der-letzte-macht-das-licht-aus': 8,
      gartenstadt: 5,
      '100-pro': 4,
    })
  })

  it('backs every credited track with a Genius source and a named role', () => {
    const confirmed = releaseTracklists.flatMap((tracklist) => tracklist.tracks)
      .filter((track) => track.creditStatus === 'verified')

    expect(confirmed).toHaveLength(32)
    expect(confirmed.every((track) => track.creditSourceUrl?.startsWith('https://genius.com/'))).toBe(true)
    expect(confirmed.every((track) => track.creditRoles?.length)).toBe(true)
  })

  it('provides an auditable credited-track list for archive releases without a manually imported Spotify dossier', () => {
    const tracklist = getTracklist('genius-album-1693572')

    expect(tracklist).toMatchObject({
      projectId: 'genius-album-1693572',
      isComplete: true,
      sourceLabel: 'Genius source ↗',
    })
    expect(tracklist?.tracks).toHaveLength(22)
    expect(tracklist?.tracks.map((track) => track.title)).toEqual([
      '1 Mio Hörer Freestyle', 'art attack', 'Weh tun', 'San Remo', 'mein cutie ˂3', 'Mein Type', 'Hände hoch', 'Werbistndu? Freestyle', '3 Racks', 'Infinity', 'Schengenraum', 'Brunello', 'Anfürsich', 'Desert Pink Sunset', 'Du bist wie', 'Golden Goose', 'Hippies in Designer', 'Gucci Slipper Fur', 'In der Luft', 'Practice Freestyle', 'In Bewegung', 'Voddi & Selters',
    ])
    const credited = tracklist?.tracks.filter((track) => track.creditStatus === 'verified')
    expect(credited?.map((track) => track.title)).toEqual(['San Remo', 'mein cutie ˂3', 'Mein Type', 'Hände hoch'])
    expect(credited?.every((track) => track.creditRoles?.length)).toBe(true)
  })
})
