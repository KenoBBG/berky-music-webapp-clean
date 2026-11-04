const roles = ['Producer', 'Writer', 'Pianist', 'Artist']

export function ContactFooter() {
  return (
    <>
      <section className="sound-architecture" aria-labelledby="sound-architecture-title">
        <div>
          <p className="eyebrow">Sound architecture</p>
          <h2 id="sound-architecture-title">Built from tension, silence, and the detail between.</h2>
        </div>
        <p>
          Songs take shape at the piano, then open into precise, physical arrangements made to leave a mark.
        </p>
        <div className="sound-architecture__grid" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span />
        </div>
      </section>

      <footer className="contact-footer">
        <div>
          <p className="eyebrow">Contact / listening room</p>
          <p className="contact-footer__statement">For records, rooms, and ideas that need a distinct point of view.</p>
        </div>
        <nav className="contact-footer__routes" aria-label="Contact routes">
          <a href="https://open.spotify.com/intl-de/artist/2pMOrhY7Oit4TTRe6zEvJ2?si=-Q08X5qRStmu0YT0sz6SLg" target="_blank" rel="noreferrer">Spotify artist profile</a>
          <span>Booking [placeholder]</span>
        </nav>
        <ul className="signal-strip" aria-label="Artist roles">
          {roles.map((role, index) => <li key={role}><span>{String(index + 1).padStart(2, '0')}</span>{role}</li>)}
        </ul>
      </footer>
    </>
  )
}
