import albumTracklists from './genius-album-tracklists.json'
import credits from './genius-credits.json'

export type CreditStatus = 'verified' | 'unknown'

/** What Genius names him as on a track. Most songs carry both roles. */
export type CreditRole = 'producer' | 'writer'

export interface ReleaseTrack {
  title: string
  /** Spotify for manual dossiers; undefined when Genius has no direct track URL. */
  spotifyUrl?: string
  /**
   * Whether the Genius API names him on this track, read from
   * producer_artists or writer_artists rather than the artist page, which
   * truncates to 20 entries and left most tracks here wrongly unknown.
   * Regenerate with scripts/sync-tracklist-credits.py.
   */
  creditStatus: CreditStatus
  creditSourceUrl?: string
  creditRoles?: readonly CreditRole[]
  /** The manual dossiers link to Spotify; generated archive credits link to Genius. */
  trackSourceLabel?: 'Spotify' | 'Genius'
}

export interface ReleaseTracklist {
  projectId: string
  sourceUrl: string
  /** A full Spotify-derived tracklist, versus verified Genius credits only. */
  isComplete?: boolean
  sourceLabel?: string
  tracks: readonly ReleaseTrack[]
}

export const releaseTracklists: readonly ReleaseTracklist[] = [
    {
      "projectId": "born-spinner",
      "sourceUrl": "https://open.spotify.com/album/04p6W318hkCTz3SNUqtsP8",
      "tracks": [
        {
          "title": "HIDE & SEEK",
          "spotifyUrl": "https://open.spotify.com/track/2gbTS4lVPP5oZwIyyWHeym",
          "creditStatus": "unknown"
        },
        {
          "title": "DALÉ",
          "spotifyUrl": "https://open.spotify.com/track/1sgBmF3v07mSgGfq1DgCMv",
          "creditStatus": "unknown"
        },
        {
          "title": "FUNKEL",
          "spotifyUrl": "https://open.spotify.com/track/05dqHMKyyfljPXUejy2WoD",
          "creditStatus": "unknown"
        },
        {
          "title": "TWINS",
          "spotifyUrl": "https://open.spotify.com/track/04pirMs7PuxxA0oXQl711R",
          "creditStatus": "unknown"
        },
        {
          "title": "GANGSTAAA (GLS CLASS)",
          "spotifyUrl": "https://open.spotify.com/track/01n0AAFCwna3a3rA5rQbVY",
          "creditStatus": "unknown"
        },
        {
          "title": "SASHIMI",
          "spotifyUrl": "https://open.spotify.com/track/78TzMoTSRAHzvbPbfq35v6",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Reezy-sashimi-lyrics",
          "creditRoles": [
            "producer"
          ]
        },
        {
          "title": "TO BE HONEST",
          "spotifyUrl": "https://open.spotify.com/track/0kxMIYW6ykVBDN9R4MFPbi",
          "creditStatus": "unknown"
        },
        {
          "title": "TRAPPER'S LULLABY",
          "spotifyUrl": "https://open.spotify.com/track/17xC4jTj1kzw4PhaQyOhUd",
          "creditStatus": "unknown"
        },
        {
          "title": "KOORDINIEREN",
          "spotifyUrl": "https://open.spotify.com/track/7eDCvhuP21p1YXAKkChdrU",
          "creditStatus": "unknown"
        },
        {
          "title": "BORN SPINNER",
          "spotifyUrl": "https://open.spotify.com/track/3yAc2aiDRHPDusNQgJ1YQE",
          "creditStatus": "unknown"
        },
        {
          "title": "CAUGHT UP",
          "spotifyUrl": "https://open.spotify.com/track/4oa3TGxgPA8HNuKN89Umut",
          "creditStatus": "unknown"
        },
        {
          "title": "ALLEZ LES BLEUS",
          "spotifyUrl": "https://open.spotify.com/track/0erTCOiwn0YiXJjDr6Xw62",
          "creditStatus": "unknown"
        },
        {
          "title": "THOUGHTS",
          "spotifyUrl": "https://open.spotify.com/track/2hGnCDMArfeHeKCtJKnnL3",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Reezy-thoughts-lyrics",
          "creditRoles": [
            "producer"
          ]
        },
        {
          "title": "REWIND",
          "spotifyUrl": "https://open.spotify.com/track/1nmwQg2NjcDYc7zGuROpzN",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Reezy-and-bausa-rewind-lyrics",
          "creditRoles": [
            "producer"
          ]
        },
        {
          "title": "LIONEL/RICKYS",
          "spotifyUrl": "https://open.spotify.com/track/4iiDhwWGTVWPJhtE4Pbez8",
          "creditStatus": "unknown"
        },
        {
          "title": "888",
          "spotifyUrl": "https://open.spotify.com/track/5wof2kmlRiUWNs13FSro6O",
          "creditStatus": "unknown"
        },
        {
          "title": "SABÍA QUE NO",
          "spotifyUrl": "https://open.spotify.com/track/3q3rQNqzfZgWj7CARttj0F",
          "creditStatus": "unknown"
        }
      ]
    },
    {
      "projectId": "in-liebe",
      "sourceUrl": "https://open.spotify.com/album/3cB6tCOD8fqXuYwbpcrcdV",
      "tracks": [
        {
          "title": "Wind",
          "spotifyUrl": "https://open.spotify.com/track/4zkuahsFYgJyMBNGOszLiX",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ayliva-wind-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Traum",
          "spotifyUrl": "https://open.spotify.com/track/1gGinE4DNA7TVPvyIl8xPp",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ayliva-traum-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Lieb mich",
          "spotifyUrl": "https://open.spotify.com/track/7HTbrUVnzVyU7U8Jm4ZyZo",
          "creditStatus": "unknown"
        },
        {
          "title": "Zwei Wochen",
          "spotifyUrl": "https://open.spotify.com/track/1ZVp3jxaSfx1eket9duUkZ",
          "creditStatus": "unknown"
        },
        {
          "title": "Ben & Jerry's",
          "spotifyUrl": "https://open.spotify.com/track/0xs37GXlmEfi228NrGAHN7",
          "creditStatus": "unknown"
        },
        {
          "title": "Beifahrer",
          "spotifyUrl": "https://open.spotify.com/track/59hwJ5R44DZIGrP5LX8xPT",
          "creditStatus": "unknown"
        },
        {
          "title": "Nie deins",
          "spotifyUrl": "https://open.spotify.com/track/6cSfO7AiNbM9J1TNiYkWa3",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ayliva-nie-deins-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Nein!",
          "spotifyUrl": "https://open.spotify.com/track/4IRk0nB8LDQYosqv1qJYio",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ayliva-nein-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Hältst du mit?",
          "spotifyUrl": "https://open.spotify.com/track/7KCWmkELScYBSGqahvJqfu",
          "creditStatus": "unknown"
        },
        {
          "title": "Wunder",
          "spotifyUrl": "https://open.spotify.com/track/4b3W0IbHDwHCvjSs708Tr4",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ayliva-and-apache-207-wunder-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Lilien",
          "spotifyUrl": "https://open.spotify.com/track/3ovTEUMYEoiT8ikEMVXBmS",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ayliva-lilien-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Mein Freak",
          "spotifyUrl": "https://open.spotify.com/track/5Gz0b1UrrpG3CIruzRjXJZ",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ayliva-mein-freak-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Mörder",
          "spotifyUrl": "https://open.spotify.com/track/79SiggfnaQDt4He5RQ79S4",
          "creditStatus": "unknown"
        },
        {
          "title": "Ersticken",
          "spotifyUrl": "https://open.spotify.com/track/7otVNCJ0Ms7gbZrHaXSnKz",
          "creditStatus": "unknown"
        },
        {
          "title": "Immer fehlst du",
          "spotifyUrl": "https://open.spotify.com/track/6ncBvHYnqA6spN5fttZdM6",
          "creditStatus": "unknown"
        }
      ]
    },
    {
      "projectId": "wilmersdorfs-kind",
      "sourceUrl": "https://open.spotify.com/album/1qGEpCF1NA9ToIocKI4xVK",
      "tracks": [
        {
          "title": "WILMERSDORFS KIND",
          "spotifyUrl": "https://open.spotify.com/track/5Cpd4TWZrwBNDNbHaCsFIo",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ski-aggu-wilmersdorfs-kind-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "IMMER (MIT MAKKO)",
          "spotifyUrl": "https://open.spotify.com/track/12PCWfrw7dQWNH9o8Ffx83",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ski-aggu-and-makko-immer-mit-makko-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "AUF ERNST",
          "spotifyUrl": "https://open.spotify.com/track/0DECiuzVbz9t52gx3qNzO0",
          "creditStatus": "unknown"
        },
        {
          "title": "SACHEN",
          "spotifyUrl": "https://open.spotify.com/track/1LuHM23FkTxcMHwTQiGRsl",
          "creditStatus": "unknown"
        },
        {
          "title": "Z0RNIG [2O24]",
          "spotifyUrl": "https://open.spotify.com/track/0b5Xusu3c8zkn1Wd01rVSt",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ski-aggu-z0rnig-2o24-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "DEUTSCHLAND 🇩🇪 (MIT IKKIMEL)",
          "spotifyUrl": "https://open.spotify.com/track/6r8XzFmwv2u47KhDTDguv9",
          "creditStatus": "unknown"
        },
        {
          "title": "BALLA BALLA",
          "spotifyUrl": "https://open.spotify.com/track/6JHOT7WC4niZyQgQtoOtuE",
          "creditStatus": "unknown"
        },
        {
          "title": "berky hau mal in die tasten du wunderkind",
          "spotifyUrl": "https://open.spotify.com/track/6ZZ45ocJs5ValYYLNhtoET",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ski-aggu-berky-hau-mal-in-die-tasten-du-wunderkind-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "abgelenkt",
          "spotifyUrl": "https://open.spotify.com/track/11izwR7C1mmxvzl6ar0dLn",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Ski-aggu-abgelenkt-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "keine sorge",
          "spotifyUrl": "https://open.spotify.com/track/3a1k27Q1JGFataZ6sZzHZK",
          "creditStatus": "unknown"
        },
        {
          "title": "ganz schön",
          "spotifyUrl": "https://open.spotify.com/track/2sWpE1JlhmOGVsdrT0QruE",
          "creditStatus": "unknown"
        },
        {
          "title": "der schlechteste (mit ritter lean)",
          "spotifyUrl": "https://open.spotify.com/track/6zDi4m4LiFjegu7EhOWK7M",
          "creditStatus": "unknown"
        },
        {
          "title": "egoist",
          "spotifyUrl": "https://open.spotify.com/track/3herakzRlwEfy3eedKfH5g",
          "creditStatus": "unknown"
        },
        {
          "title": "intro für mein nächstes album",
          "spotifyUrl": "https://open.spotify.com/track/5tSQPP92Jd4gMS75xiuTlB",
          "creditStatus": "unknown"
        }
      ]
    },
    {
      "projectId": "der-letzte-macht-das-licht-aus",
      "sourceUrl": "https://open.spotify.com/album/19K7C9s0FuANXCrjOB5cPF",
      "tracks": [
        {
          "title": "Tut mir nicht leid",
          "spotifyUrl": "https://open.spotify.com/track/03Z5Vb3WgY4VjyzKeaAR4Y",
          "creditStatus": "unknown"
        },
        {
          "title": "Willkommen im Schnee",
          "spotifyUrl": "https://open.spotify.com/track/4T2aj1wPiO4nzQCiHjKO4f",
          "creditStatus": "unknown"
        },
        {
          "title": "Ehrenmann",
          "spotifyUrl": "https://open.spotify.com/track/1huqjUTNiwEn5cfLRGQzo5",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-and-bozza-ehrenmann-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Flashbacks",
          "spotifyUrl": "https://open.spotify.com/track/6DRI9QTq3K6IHnGXc0UVHe",
          "creditStatus": "unknown"
        },
        {
          "title": "Genauso",
          "spotifyUrl": "https://open.spotify.com/track/1caaaZzAKY3WwOEHmL3SpU",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-and-dhurata-dora-genauso-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Wunschkonzert",
          "spotifyUrl": "https://open.spotify.com/track/5BWP9Qy5vTt4DaTeCfcyWA",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-wunschkonzert-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Haifischbecken",
          "spotifyUrl": "https://open.spotify.com/track/7uEPLSZ16p5oNtnFMlZhfc",
          "creditStatus": "unknown"
        },
        {
          "title": "So wie du",
          "spotifyUrl": "https://open.spotify.com/track/02r17iBrxVL1GI0y41OgDt",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-so-wie-du-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "100 km/h",
          "spotifyUrl": "https://open.spotify.com/track/6GmwXRUTH1L8g9lwkZqlis",
          "creditStatus": "unknown"
        },
        {
          "title": "Bietigheimer Jungs",
          "spotifyUrl": "https://open.spotify.com/track/1k2s8Tilqey7N7SBucy3IJ",
          "creditStatus": "unknown"
        },
        {
          "title": "Wo ist mein Geld?",
          "spotifyUrl": "https://open.spotify.com/track/6Wht8QECX43IQgCoF9xxoi",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-wo-ist-mein-geld-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Hand aufs Herz",
          "spotifyUrl": "https://open.spotify.com/track/4ETA1VCVwhfzkX2WdMTMNr",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-and-cocon-hand-aufs-herz-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Ohne Happy-End",
          "spotifyUrl": "https://open.spotify.com/track/2b2K4rMKDT2LXBdEcmq97E",
          "creditStatus": "unknown"
        },
        {
          "title": "Viel passiert",
          "spotifyUrl": "https://open.spotify.com/track/5UJkAFhHe6mDYc3rXR31Gn",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-viel-passiert-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "OCB",
          "spotifyUrl": "https://open.spotify.com/track/6MqhQeWbfS5US5GIQXZ9Xa",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-ocb-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        }
      ]
    },
    {
      "projectId": "gartenstadt",
      "sourceUrl": "https://open.spotify.com/album/6Sd0rVatEiURCktc2Yr4EU",
      "tracks": [
        {
          "title": "Was weißt du schon",
          "spotifyUrl": "https://open.spotify.com/track/07MQt3L6LsFS5rAgUSSrMO",
          "creditStatus": "unknown"
        },
        {
          "title": "Breaking your heart",
          "spotifyUrl": "https://open.spotify.com/track/6fsbuVwtZHq8bCfUOfmkNL",
          "creditStatus": "unknown"
        },
        {
          "title": "Wenn das so bleibt",
          "spotifyUrl": "https://open.spotify.com/track/5atei5eVpWKUJj5olSI32L",
          "creditStatus": "unknown"
        },
        {
          "title": "Ein letztes Mal",
          "spotifyUrl": "https://open.spotify.com/track/77dJw4yOyJdwWKosfVdJaL",
          "creditStatus": "unknown"
        },
        {
          "title": "Kurz vor 4",
          "spotifyUrl": "https://open.spotify.com/track/2LZhUe6QBAtqaeJf12roOg",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Apache-207-kurz-vor-4-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Neunzig",
          "spotifyUrl": "https://open.spotify.com/track/3caxdAr1m31mOuKS5g7LwQ",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Apache-207-neunzig-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Coco Chanel",
          "spotifyUrl": "https://open.spotify.com/track/1okGsbOJ9Sjd837GvN6F9S",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Apache-207-coco-chanel-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Capri Sonne",
          "spotifyUrl": "https://open.spotify.com/track/5T2gpbg0FtAQL1eIoJNDnA",
          "creditStatus": "unknown"
        },
        {
          "title": "Ohne Gnade",
          "spotifyUrl": "https://open.spotify.com/track/6VqvjsOF1aRfCfJacsTLyw",
          "creditStatus": "unknown"
        },
        {
          "title": "Vorstadt",
          "spotifyUrl": "https://open.spotify.com/track/2VFnkvZhN9Bx2i58Tw8WAO",
          "creditStatus": "unknown"
        },
        {
          "title": "Gefunden",
          "spotifyUrl": "https://open.spotify.com/track/5JugT2GrfTdvKCAblOxAOv",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Apache-207-gefunden-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Schimmel in der Villa",
          "spotifyUrl": "https://open.spotify.com/track/5j8Mb7TaTedrJzCpUKdfm7",
          "creditStatus": "unknown"
        },
        {
          "title": "Geblitzt",
          "spotifyUrl": "https://open.spotify.com/track/4REyaz2hSuykTLTzk6dOTi",
          "creditStatus": "unknown"
        },
        {
          "title": "Raus hier",
          "spotifyUrl": "https://open.spotify.com/track/0Rnp3YXS9rROU7x6XW9hbF",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Apache-207-raus-hier-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Komet",
          "spotifyUrl": "https://open.spotify.com/track/7oQepKHmXDaPC3rgeLRvQu",
          "creditStatus": "unknown"
        }
      ]
    },
    {
      "projectId": "100-pro",
      "sourceUrl": "https://open.spotify.com/album/3KAtEV9jbwMKd1BPbN4XfV",
      "tracks": [
        {
          "title": "Paradox",
          "spotifyUrl": "https://open.spotify.com/track/3Im1MIYlycqg08Bw0JpaGi",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-paradox-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Centre Court",
          "spotifyUrl": "https://open.spotify.com/track/2I2oxOQnyGl7X2t4YSS0uK",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-ufo361-and-rin-centre-court-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Madonna",
          "spotifyUrl": "https://open.spotify.com/track/6a3kNt1UlUOapDKmEr3JzZ",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-and-apache-207-madonna-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "2012",
          "spotifyUrl": "https://open.spotify.com/track/21MvQ9CmXf9QlWMSnnsOev",
          "creditStatus": "unknown"
        },
        {
          "title": "King Kendrick",
          "spotifyUrl": "https://open.spotify.com/track/2miVnh2pmhxemXpbRo1Qiq",
          "creditStatus": "unknown"
        },
        {
          "title": "Selfmade Babylon",
          "spotifyUrl": "https://open.spotify.com/track/4Au3V4R81FTKPMnXIsjtZl",
          "creditStatus": "unknown"
        },
        {
          "title": "NY Whisky Sour",
          "spotifyUrl": "https://open.spotify.com/track/1KJYihoV9on7TQ2NWYHQh8",
          "creditStatus": "unknown"
        },
        {
          "title": "Silber Blau",
          "spotifyUrl": "https://open.spotify.com/track/75xrrO0h3tE4WR2qgrUCVv",
          "creditStatus": "unknown"
        },
        {
          "title": "Weisst wie es ist",
          "spotifyUrl": "https://open.spotify.com/track/2Roj3Kvhy5BCjkSSJ2Q3Nz",
          "creditStatus": "verified",
          "creditSourceUrl": "https://genius.com/Bausa-and-sido-weisst-wie-es-ist-lyrics",
          "creditRoles": [
            "producer",
            "writer"
          ]
        },
        {
          "title": "Marlboro Lights",
          "spotifyUrl": "https://open.spotify.com/track/4nbStg9OEevfIBBcThXM8O",
          "creditStatus": "unknown"
        },
        {
          "title": "I.N.S.",
          "spotifyUrl": "https://open.spotify.com/track/0OF0vIsA3khOiub7B6pkCq",
          "creditStatus": "unknown"
        },
        {
          "title": "Nutten schlafen nie",
          "spotifyUrl": "https://open.spotify.com/track/3dGfESrtC8li4s64XqYUhN",
          "creditStatus": "unknown"
        },
        {
          "title": "Toca",
          "spotifyUrl": "https://open.spotify.com/track/04vbxTO3ZSjhprnrdsIHIW",
          "creditStatus": "unknown"
        },
        {
          "title": "Papi",
          "spotifyUrl": "https://open.spotify.com/track/6Pwv6WGC8AUqU2aartMzMP",
          "creditStatus": "unknown"
        },
        {
          "title": "Tanzen",
          "spotifyUrl": "https://open.spotify.com/track/3nYKQCCbOwBJ7iLSZxmD7i",
          "creditStatus": "unknown"
        },
        {
          "title": "S-Bahn",
          "spotifyUrl": "https://open.spotify.com/track/6rG4xIji1ichYJ96TGISx0",
          "creditStatus": "unknown"
        }
      ]
    }
  ] as const

interface GeniusAlbum {
  id: number
  url: string
}

interface GeniusCreditSong {
  id: number
  title: string
  url: string
  roles: readonly CreditRole[]
  album: GeniusAlbum | null
}

const geniusSongs = (credits as { songs: readonly GeniusCreditSong[] }).songs
const completeAlbumTracklists = albumTracklists as Record<string, readonly string[]>

function normalizedTitle(title: string): string {
  return title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '')
}

function asGeniusTrack(song: GeniusCreditSong): ReleaseTrack {
  return {
    title: song.title,
    spotifyUrl: song.url,
    trackSourceLabel: 'Genius',
    creditStatus: 'verified',
    creditSourceUrl: song.url,
    creditRoles: song.roles,
  }
}

function completeGeniusAlbumTracks(albumId: number): readonly ReleaseTrack[] | undefined {
  const fullTracklist = completeAlbumTracklists[String(albumId)]
  if (!fullTracklist) return undefined

  const creditsByTitle = new Map(
    geniusSongs
      .filter((song) => song.album?.id === albumId)
      .map((song) => [normalizedTitle(song.title), song]),
  )

  return fullTracklist.map((title) => {
    const credit = creditsByTitle.get(normalizedTitle(title))
    return credit ? asGeniusTrack(credit) : { title, creditStatus: 'unknown' as const }
  })
}

/**
 * Complete album lists are read from Genius album pages. Where Genius has no
 * retrievable album tracklist, the site falls back to the verified songs from
 * the artist-credit API rather than inventing uncredited tracks.
 */
const archiveCreditTracklists: readonly ReleaseTracklist[] = [
  ...[...new Map(
    geniusSongs
      .filter((song): song is GeniusCreditSong & { album: GeniusAlbum } => Boolean(song.album))
      .map((song) => [song.album.id, song]),
  ).values()].map((representative) => {
    const completeTracks = completeGeniusAlbumTracks(representative.album.id)
    return {
      projectId: `genius-album-${representative.album.id}`,
      sourceUrl: representative.album.url,
      isComplete: Boolean(completeTracks),
      sourceLabel: 'Genius source ↗',
      tracks: completeTracks ?? geniusSongs
        .filter((song) => song.album?.id === representative.album.id)
        .map(asGeniusTrack),
    }
  }),
  ...geniusSongs
    .filter((song) => !song.album)
    .map((song) => ({
      projectId: `genius-song-${song.id}`,
      sourceUrl: song.url,
      isComplete: true,
      sourceLabel: 'Genius source ↗',
      tracks: [asGeniusTrack(song)],
    })),
]

export function getTracklist(projectId: string): ReleaseTracklist | undefined {
  return releaseTracklists.find((tracklist) => tracklist.projectId === projectId)
    ?? archiveCreditTracklists.find((tracklist) => tracklist.projectId === projectId)
}
