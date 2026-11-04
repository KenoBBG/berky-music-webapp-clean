export const projectRoles = ['Producer', 'Artist', 'Composer'] as const

export type ProjectRole = (typeof projectRoles)[number]

export interface SpotifySnapshot {
  label: 'Spotify snapshot'
  capturedAt: '2026-10-25'
  streams: number
}

export interface Project {
  id: string
  title: string
  artist: string
  releaseType: 'Album' | 'EP' | 'Single'
  releaseDate: string
  artworkUrl: string
  /** Spotify for curated records; Genius for the complete verified credit archive. */
  spotifyUrl: string
  listenLabel?: 'Listen on Spotify' | 'View on Genius'
  creditedTrackCount?: number
  spotifySnapshot?: SpotifySnapshot
  /** Record-level roles are omitted unless an official source establishes them. */
  roles?: readonly ProjectRole[]
}

const source = 'https://berkymusik.com/'

export const projects: readonly Project[] = [
  { id: 'planet', title: 'planet', artist: 'berky x eno', releaseType: 'Single', releaseDate: '06/2026', artworkUrl: 'https://i.scdn.co/image/ab67616d0000b2736b02049a99ee11b7eccf370c', spotifyUrl: 'https://open.spotify.com/album/4AGuMclFqXQScBUF4OICPS', spotifySnapshot: { label: 'Spotify snapshot', capturedAt: '2026-10-25', streams: 723277 } },
  { id: 'renn', title: 'renn', artist: 'ayliva', releaseType: 'Single', releaseDate: '01/2026', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2026/02/ayliva-renn.png', spotifyUrl: 'https://open.spotify.com/intl-de/album/6Kb7RsCVhNArBtaJkLOflg?si=xaVooRpiTxOpv9JzAGTafw' },
  { id: 'born-spinner', title: 'born spinner', artist: 'reezy', releaseType: 'Album', releaseDate: '08/2025', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2026/02/reezy-bornspiner.jpg', spotifyUrl: 'https://open.spotify.com/intl-de/album/04p6W318hkCTz3SNUqtsP8?si=BzmSTKjYTnS91s1d8geD3g' },
  { id: 'move-like-water', title: 'move like water', artist: 'berky x donel', releaseType: 'Single', releaseDate: '06/2025', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2026/02/berkyxdonel-movelikewater.jpeg', spotifyUrl: 'https://open.spotify.com/intl-de/album/7zjtrZiDsIEqIS8KbdBXDs?si=vm6cNAvcQcOFqDQcZO0EEw', spotifySnapshot: { label: 'Spotify snapshot', capturedAt: '2026-10-25', streams: 239510 } },
  { id: 'wie', title: 'wie?', artist: 'ayliva', releaseType: 'Single', releaseDate: '02/2025', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2025/05/ayliva-wie.png', spotifyUrl: 'https://open.spotify.com/intl-de/album/3WjhvJaQYvDdud4lPBtrlH?si=gn_wsDecRTarNYmEVm0Paw' },
  { id: 'wilmersdorfs-kind', title: 'wilmersdorfs kind', artist: 'ski aggu', releaseType: 'Album', releaseDate: '08/2024', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2024/09/skiaggu-wilmersdorfs-kind.png', spotifyUrl: 'https://open.spotify.com/intl-de/album/1qGEpCF1NA9ToIocKI4xVK?si=VSs2oFloRJGlSIamNrblAA' },
  { id: 'in-liebe', title: 'in liebe', artist: 'ayliva', releaseType: 'Album', releaseDate: '04/2024', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2024/08/ayliva-in-liebe.jpg', spotifyUrl: 'https://open.spotify.com/intl-de/album/3cB6tCOD8fqXuYwbpcrcdV?si=sNgKQ92JQ_Kmxvnkd2nnng' },
  { id: 'wunder', title: 'wunder', artist: 'ayliva x apache207', releaseType: 'Single', releaseDate: '04/2024', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2024/05/aylivaxapache207-wunder.png', spotifyUrl: 'https://open.spotify.com/intl-de/album/5O4Ps6WmC2nFKpUP5TIIMa?si=3ngROXDxR9aGOgmcRLj4mg' },
  { id: 'zornig', title: 'zornig', artist: 'ski aggu', releaseType: 'Single', releaseDate: '01/2024', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2024/01/ski-aggu-zornig.jpg', spotifyUrl: 'https://open.spotify.com/intl-de/album/6jd8NOxJvrkCjWGfbyZbHg?si=hbX8gvzdRXWDl5rZfWPPlA' },
  { id: 'bullet', title: 'bullet', artist: 'mero x ayliva', releaseType: 'Single', releaseDate: '01/2024', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2024/01/mero-x-ayliva-bullet.jpeg', spotifyUrl: 'https://open.spotify.com/intl-de/album/4DBIgjUHPxgdgmi56gaHEF?si=owBMmGgPSxCqazFCu-2xHQ' },
  { id: 'freier-fall', title: 'freier fall', artist: 'berky x lea', releaseType: 'Single', releaseDate: '10/2023', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2023/10/BERKY-x-LEA-FREIER-FALL-Large.jpeg', spotifyUrl: 'https://open.spotify.com/intl-de/album/0vZb5L8sFYWoDbc8iPIuMx?si=hFAl1I_xQtyzfLj5DxNXVg', spotifySnapshot: { label: 'Spotify snapshot', capturedAt: '2026-10-25', streams: 2540173 } },
  { id: 'nachtcafe', title: 'nachtcafé', artist: 'berky x bausa', releaseType: 'Single', releaseDate: '03/2023', artworkUrl: 'https://i.scdn.co/image/ab67616d0000b2730de1c0930a5d032f80f9804a', spotifyUrl: 'https://open.spotify.com/album/5wh48f4shKCbv6ZusbvY7A', spotifySnapshot: { label: 'Spotify snapshot', capturedAt: '2026-10-25', streams: 1403906 } },
  { id: 'der-letzte-macht-das-licht-aus', title: 'der letzte macht das licht aus', artist: 'bausa', releaseType: 'Album', releaseDate: '09/2023', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2023/11/Bausa-DerLetztemachtdasLichtaus.jpeg', spotifyUrl: 'https://open.spotify.com/intl-de/album/19K7C9s0FuANXCrjOB5cPF?si=3RfVUS-kRreCe08h2ibfBA' },
  { id: 'gartenstadt', title: 'gartenstadt', artist: 'apache207', releaseType: 'Album', releaseDate: '06/2023', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2023/11/Apache-Gartenstadt-01-Medium.jpeg', spotifyUrl: 'https://open.spotify.com/intl-de/album/6Sd0rVatEiURCktc2Yr4EU?si=XJhf8VwFT3eGFKO2tPiJlg' },
  { id: 'neunzig', title: 'neunzig', artist: 'apache207', releaseType: 'Single', releaseDate: '04/2023', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2023/11/Apache-Neunzig-01-Medium.jpeg', spotifyUrl: 'https://open.spotify.com/intl-de/album/4sTrbesmnig1SJYSBYAJBn?si=pBMLC-R2QHyjM6KgLXmqtg' },
  { id: 'venus', title: 'VENUS', artist: 'BAUSA', releaseType: 'Single', releaseDate: '08/2021', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2023/08/Bausa-Venus-01.png', spotifyUrl: 'https://open.spotify.com/intl-de/album/7zZsQEPxQ7y8hfR5e1ZeHi?si=2zV8RqP5RMawFyA2JcpPnQ' },
  { id: 'madonna', title: 'Madonna', artist: 'BAUSA x apache207', releaseType: 'Single', releaseDate: '02/2021', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2023/08/BausaApache-Madonna-01.png', spotifyUrl: 'https://open.spotify.com/intl-de/album/70DNEZBWsHHPYBFNQn3Ena?si=mEyBIgKXSK-wer2M0s3iFw' },
  { id: '100-pro', title: '100 pro', artist: 'BAUSA', releaseType: 'Album', releaseDate: '02/2021', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2023/07/100pro-BAUSA.jpg', spotifyUrl: 'https://open.spotify.com/intl-de/album/3KAtEV9jbwMKd1BPbN4XfV?si=kkEK9GTCSnyBNg4uG-FgKg' },
  { id: 'centre-court', title: 'centre court', artist: 'BAUSA, Rin & ufo361', releaseType: 'Single', releaseDate: '12/2020', artworkUrl: 'https://berkymusik.com/wp-content/uploads/2023/08/BausaRinUfo-CentreCourt-01.png', spotifyUrl: 'https://open.spotify.com/intl-de/album/6fgZ1vMdzZs8CUmA4c82Ms?si=5DoYdhc-SgOLvxj_NLM-Ag' },
]

export const featuredProjectIds = ['planet', 'move-like-water', 'freier-fall', 'nachtcafe'] as const

export const projectSourceUrl = source
