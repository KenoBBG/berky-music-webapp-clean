import credits from './genius-credits.json'

export type GeniusReleaseType = 'Album' | 'EP' | 'Single'

export interface GeniusProject {
  id: string
  title: string
  artist: string
  releaseType: GeniusReleaseType
  releaseDate: string
  artworkUrl: string
  listenUrl: string
  listenLabel: 'View on Genius'
  creditedTrackCount: number
}

interface GeniusAlbum {
  id: number
  name: string
  artist: string
  cover: string | null
  url: string
}

interface GeniusSong {
  id: number
  title: string
  url: string
  release_date: string | null
  primary_artist: string
  art: string | null
  album: GeniusAlbum | null
}

interface GeniusCatalogue {
  songs: readonly GeniusSong[]
}

const catalogue = credits as GeniusCatalogue

function releaseDate(date: string | null): string {
  if (!date) return 'Unknown date'
  const [year, month] = date.split('-')
  return `${month}/${year}`
}

function releaseType(album: GeniusAlbum): GeniusReleaseType {
  return /\bep\b/i.test(album.name) ? 'EP' : 'Album'
}

function sortNewestFirst(left: GeniusProject, right: GeniusProject): number {
  if (left.releaseDate === 'Unknown date') return 1
  if (right.releaseDate === 'Unknown date') return -1
  const [leftMonth, leftYear] = left.releaseDate.split('/').map(Number)
  const [rightMonth, rightYear] = right.releaseDate.split('/').map(Number)
  return rightYear - leftYear || rightMonth - leftMonth
}

const albumProjects = [...new Map(
  catalogue.songs
    .filter((song): song is GeniusSong & { album: GeniusAlbum } => Boolean(song.album))
    .map((song) => [song.album.id, song]),
).values()].map((representative) => {
  const album = representative.album
  const creditedTrackCount = catalogue.songs.filter((song) => song.album?.id === album.id).length

  return {
    id: `genius-album-${album.id}`,
    title: album.name,
    artist: album.artist,
    releaseType: releaseType(album),
    releaseDate: releaseDate(representative.release_date),
    artworkUrl: album.cover ?? representative.art ?? '',
    listenUrl: album.url,
    listenLabel: 'View on Genius' as const,
    creditedTrackCount,
  }
})

const singleProjects = catalogue.songs
  .filter((song) => !song.album)
  .map((song) => ({
    id: `genius-song-${song.id}`,
    title: song.title,
    artist: song.primary_artist,
    releaseType: 'Single' as const,
    releaseDate: releaseDate(song.release_date),
    artworkUrl: song.art ?? '',
    listenUrl: song.url,
    listenLabel: 'View on Genius' as const,
    creditedTrackCount: 1,
  }))

export const geniusProjects: readonly GeniusProject[] = [...albumProjects, ...singleProjects].sort(sortNewestFirst)
