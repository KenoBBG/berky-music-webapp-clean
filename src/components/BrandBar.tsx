import logoWhite from '../assets/berky/logo-white.png'

/**
 * Narrow bar above the hero reel. It carries the only page-level heading, which
 * keeps the document addressable for search and screen readers while leaving
 * the footage itself completely free of overlaid text.
 */
export function BrandBar() {
  return (
    <div className="brand-bar">
      <h1 className="brand-bar__wordmark">
        <img className="brand-wordmark" src={logoWhite} alt="Berky Musik" />
      </h1>
    </div>
  )
}
