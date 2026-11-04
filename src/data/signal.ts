/**
 * Facts about Berky's catalogue and current standing, each tied to the public
 * source it came from. Figures are snapshots, not live numbers - every one of
 * them carries the date it was read so the page never implies it is live.
 */

export const SNAPSHOT_DATE = '2026-10-29' as const

export interface Collaborator {
  name: string
  /** Songs in the Genius catalogue where Berky is credited and this act appears. */
  songs: number
}

/**
 * Every independently presented act with four or more credited songs, ranked by
 * count, read from the Genius API rather than the artist page. Gökhan Abi is
 * intentionally represented with Eno because all four shared credits are on
 * their joint EP.
 *
 * An act counts when it appears on a song Berky is credited on, whether as
 * lead or alongside others, which is how the credit reads in practice.
 * Regenerate with scripts/fetch-genius-credits.py.
 */
export const collaborators: readonly Collaborator[] = [
  { name: 'Bausa', songs: 32 },
  { name: 'TheDoDo', songs: 18 },
  { name: 'Apache 207', songs: 12 },
  { name: 'Eno', songs: 12 },
  { name: 'AYLIVA', songs: 11 },
  { name: 'Dardan', songs: 7 },
  { name: 'Ski Aggu', songs: 6 },
  { name: 'CIVAN', songs: 6 },
  { name: 'Kane', songs: 4 },
  { name: 'reezy', songs: 4 },
  { name: 'YUNG SAINT PAUL', songs: 4 },
]

/**
 * Songs where Genius names him in producer_artists or writer_artists: 135 as
 * producer, 122 as writer, the overlap being songs he both produced and wrote.
 * Lower than the 158 the artist page advertises, because that total also counts
 * songs merely associated with him, such as ones naming him in the lyrics.
 */
export const geniusCatalogue = {
  songs: 140,
  collaboratorCount: 65,
  capturedAt: SNAPSHOT_DATE,
  sourceUrl: 'https://genius.com/artists/Berky',
} as const

/**
 * Berky's own releases as credited artist, newest first. Genius lists five
 * songs with him as lead, but two are Nachtcafe and its radio edit.
 */
export const artistReleaseCount = 4

export interface SignalBlock {
  id: string
  eyebrow: string
  heading: string
  body: string
  /** Optional footnote naming where the claim can be checked. */
  footnote?: string
  link?: { label: string, href: string }
}

export const currentSignal: readonly SignalBlock[] = [
  {
    id: 'latest',
    eyebrow: 'Latest release',
    heading: 'Planet, with Eno',
    body: 'Released 11 June 2026. Self-released, distributed by VARY - the record is his own, start to finish.',
    footnote: '723,277 streams, read 25 Oct 2026',
    link: { label: 'Planet on Spotify', href: 'https://open.spotify.com/album/4AGuMclFqXQScBUF4OICPS' },
  },
  {
    id: 'independence',
    eyebrow: 'Ownership',
    heading: 'Major run, then his own imprint.',
    body: 'Nachtcafe and Freier Fall came out through GOLD LEAGUE and Sony Music Germany in 2023. Since Move Like Water in 2025 every Berky release has been self-released under his own copyright.',
  },
  {
    id: 'reach',
    eyebrow: 'As artist',
    heading: 'Four releases, 4.9 million streams.',
    body: 'Nachtcafe with Bausa, Freier Fall with LEA, Move Like Water with Donel, Planet with Eno. Two of the four passed a million on their own.',
    footnote: 'Sum of lead-track Spotify counts, read 25 Oct 2026',
  },
  {
    id: 'tempo',
    eyebrow: 'Method',
    heading: 'Tempo rubato.',
    body: 'The term he took from classical piano: time bent to the feeling rather than fixed to a grid. It is the rule the beats still follow - hard drums under classical melody, built to make you move and think at once.',
    footnote: 'In his own words on berkymusik.com',
  },
]

export const tickerSourceUrl = geniusCatalogue.sourceUrl

const SPOTIFY_ARTIST_URL =
  'https://open.spotify.com/intl-de/artist/2pMOrhY7Oit4TTRe6zEvJ2?si=-Q08X5qRStmu0YT0sz6SLg'

export interface DashboardStat {
  id: string
  /** Target used for the count-up; the visible figure is formatted from it. */
  value: number
  /** How the figure reads once settled, e.g. "4.9M". */
  display: string
  label: string
  /** The breakdown or caveat shown under the figure. */
  detail: string
  /** Where the figure can be checked, with the date it was read. */
  source: { label: string, href: string }
}

/**
 * The hero dashboard figures. Every one is a dated snapshot carried straight
 * from the sourced facts above - nothing here is a live counter, which the
 * section states in its own copy and each card repeats in its source line.
 */
export const dashboardStats: readonly DashboardStat[] = [
  {
    id: 'songs',
    value: geniusCatalogue.songs,
    display: String(geniusCatalogue.songs),
    label: 'Songs credited',
    detail: '135 as producer / 122 as writer',
    source: { label: 'Genius, read 29 Oct 2026', href: geniusCatalogue.sourceUrl },
  },
  {
    id: 'artists',
    value: geniusCatalogue.collaboratorCount,
    display: String(geniusCatalogue.collaboratorCount),
    label: 'Artists worked with',
    detail: 'Distinct credited collaborators',
    source: { label: 'Genius, read 29 Oct 2026', href: geniusCatalogue.sourceUrl },
  },
  {
    id: 'streams',
    value: 4_900_000,
    display: '4.9M',
    label: 'Streams as artist',
    detail: 'Sum of lead-track Spotify counts',
    source: { label: 'Spotify, read 25 Oct 2026', href: SPOTIFY_ARTIST_URL },
  },
  {
    id: 'releases',
    value: artistReleaseCount,
    display: String(artistReleaseCount),
    label: 'Releases as artist',
    detail: 'Self-released via VARY since 2025',
    source: { label: 'Spotify, read 25 Oct 2026', href: SPOTIFY_ARTIST_URL },
  },
]

/** The newest release, highlighted as the dashboard's lead card. */
export const latestReleaseStat = {
  title: 'Planet',
  feature: 'with Eno',
  streams: 723_277,
  streamsDisplay: '723,277',
  releasedOn: '11 June 2026',
  capturedAt: 'read 25 Oct 2026',
  href: 'https://open.spotify.com/album/4AGuMclFqXQScBUF4OICPS',
} as const

export interface PendingMetric {
  id: string
  label: string
  note: string
}

/**
 * Metrics the next version wants to show live but has no confirmed source for
 * yet. Rendered as explicit placeholders so the dashboard never fabricates a
 * number it cannot stand behind. Under evaluation via a Musicstax trial.
 */
export const pendingMetrics: readonly PendingMetric[] = [
  { id: 'popularity', label: 'Spotify popularity score', note: 'Live source in evaluation' },
  { id: 'listeners', label: 'Monthly listeners', note: 'Live source in evaluation' },
  { id: 'crossplatform', label: 'Cross-platform reach', note: 'Live source in evaluation' },
]
