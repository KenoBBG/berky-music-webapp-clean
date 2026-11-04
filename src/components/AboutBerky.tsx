import aboutFog from '../assets/berky/about-fog.jpeg'
import aboutPrimary from '../assets/berky/about-primary.jpeg'
import aboutStudio from '../assets/berky/about-studio.jpeg'
import { AmbientVideo } from './AmbientVideo'
import { CurrentSignal } from './CurrentSignal'

export function AboutBerky() {
  return (
    <section className="about-berky" aria-labelledby="about-berky-title">
      <div className="about-berky__intro">
        <div>
          <p className="eyebrow">01 / About</p>
          <h2 id="about-berky-title">About Berky</h2>
        </div>
        <p className="about-berky__lead">
          Berky is a producer, composer, pianist and artist working at the intersection of melody,
          texture and instinct. His catalogue moves between intimate songwriting and high-impact records.
        </p>
      </div>

      <div className="about-berky__editorial">
        <figure className="about-berky__primary-photo">
          <img src={aboutPrimary} alt="Berky in a maze-like set" />
          <figcaption>Berlin / studio practice / live energy</figcaption>
        </figure>
        <div className="about-berky__statement">
          <p className="eyebrow">Piano-led, detail-obsessed</p>
          <p>
            Not a genre exercise. Each project starts with the emotional centre, then gets built out in
            rhythm, negative space and the details that keep replaying after the track ends.
          </p>
          <ul aria-label="Berky disciplines">
            <li><span>01</span>Production</li>
            <li><span>02</span>Composition</li>
            <li><span>03</span>Piano</li>
            <li><span>04</span>Artist projects</li>
          </ul>
        </div>
        <figure className="about-berky__secondary-photo about-berky__secondary-photo--fog">
          <img src={aboutFog} alt="Berky in a foggy portrait" />
        </figure>
        <figure className="about-berky__secondary-photo about-berky__secondary-photo--studio">
          <img src={aboutStudio} alt="Berky in a studio portrait" />
        </figure>
      </div>

      <section className="piano-film" aria-label="Piano process film">
        <div className="piano-film__copy">
          <p className="eyebrow">02 / Process</p>
          <h3>It starts at the keys.</h3>
          <p>Before the arrangement, the first decision is always emotional: where the melody needs to land.</p>
        </div>
        <AmbientVideo
          label="Berky playing piano"
          poster="/media/piano-film-poster.webp"
          src="/media/piano-film.mp4"
        />
      </section>

      <CurrentSignal />
    </section>
  )
}
