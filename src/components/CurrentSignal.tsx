import liveCrowd from '../assets/berky/live-crowd.jpeg'
import tempoCover from '../assets/berky/tempo-cover.webp'
import { currentSignal } from '../data/signal'

export function CurrentSignal() {
  return (
    <section className="current-signal" aria-labelledby="current-signal-title">
      <div className="current-signal__heading">
        <div>
          <p className="eyebrow">03 / Current signal</p>
          <h3 id="current-signal-title">Where the practice stands now.</h3>
        </div>
        <p className="current-signal__lead">
          Four releases under his own name, a catalogue of credits behind other people&apos;s, and a
          method he can name. Every figure below is a dated reading, not a live counter.
        </p>
      </div>

      <div className="current-signal__media">
        <figure>
          <img src={tempoCover} alt="Tempo artwork" />
          <figcaption>Tempo</figcaption>
        </figure>
        <figure>
          <img src={liveCrowd} alt="Berky performing to a crowd" />
          <figcaption>Live</figcaption>
        </figure>
      </div>

      <ol className="current-signal__blocks">
        {currentSignal.map((block, index) => (
          <li key={block.id} className={`signal-block signal-block--${block.id}`}>
            <p className="signal-block__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
            <p className="eyebrow">{block.eyebrow}</p>
            <h4>{block.heading}</h4>
            <p className="signal-block__body">{block.body}</p>
            {block.link && (
              <a href={block.link.href} rel="noreferrer" target="_blank">{block.link.label}</a>
            )}
            {block.footnote && <p className="signal-block__footnote">{block.footnote}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}
