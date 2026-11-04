import credits from '../data/genius-credits.json'

const selectedSongIds = [10304510, 6499669, 11487266, 8946040, 10701218, 10563666, 8293513, 10785100, 9563548, 10701204] as const
const songs = selectedSongIds.map((id) => {
  const song = credits.songs.find((entry) => entry.id === id)
  if (!song || !song.producers.some((producer) => producer.name === 'Berky')) {
    throw new Error(`Missing verified Berky producer credit for Genius song ${id}`)
  }
  return song
})

export function ProducerShowcase() {
  return (
    <section className="producer-showcase" aria-labelledby="producer-showcase-title">
      <div className="producer-showcase__intro">
        <p className="eyebrow">Selected producer credits / Genius catalogue</p>
        <h2 id="producer-showcase-title">The work behind the sound.</h2>
        <p>From chart-shaping singles to deep cuts. Ten tracks featuring Berky in the production credits.</p>
      </div>
      <ol className="producer-showcase__list">
        {songs.map((song, index) => (
          <li className={index === 0 ? 'producer-showcase__item producer-showcase__item--lead' : 'producer-showcase__item'} key={song.id}>
            <a href={song.url} target="_blank" rel="noreferrer" aria-label={`${song.title} by ${song.primary_artist}, Berky producer credit on Genius`}>
              <img src={`/media/song-covers/${song.id}.jpg`} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
              <span className="producer-showcase__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="producer-showcase__copy">
                <span className="producer-showcase__artist">{song.full_title.split(' by\u00a0')[1]?.replaceAll('\u00a0', ' ') ?? song.primary_artist}</span>
                <strong>{song.title}</strong>
                <span className="producer-showcase__credit">Producer credit · Genius</span>
              </span>
              <span className="producer-showcase__arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
      <a className="producer-showcase__archive-link" href="/archive">Explore the full release archive <span aria-hidden="true">↗</span></a>
    </section>
  )
}
