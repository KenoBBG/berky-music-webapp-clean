import { AmbientVideo } from './AmbientVideo'
import { BrandBar } from './BrandBar'
import { ScrollCue } from './ScrollCue'

export function Hero() {
  return (
    <header className="archive-hero">
      <BrandBar />
      <AmbientVideo
        className="hero-reel"
        eager
        label="Berky visual reel"
        poster="/media/hero-reel-poster.webp"
        src="/media/hero-reel.mp4"
      />
      <div className="archive-hero__shade" aria-hidden="true" />
      <ScrollCue />
    </header>
  )
}
