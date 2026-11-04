import { AboutBerky } from './components/AboutBerky'
import { Archive } from './components/Archive'
import { ContactFooter } from './components/ContactFooter'
import { Hero } from './components/Hero'
import { ReleaseCalendar } from './components/ReleaseCalendar'
import { ProducerShowcase } from './components/ProducerShowcase'
import { StatsDashboard } from './components/StatsDashboard'
import './App.css'

function App() {
  const archivePage = window.location.pathname.replace(/\/$/, '') === '/archive'

  return (
    <>
      {archivePage ? (
        <>
          <nav className="site-navigation site-navigation--archive" aria-label="Site navigation">
            <a href="/">← Home</a>
            <span>Berky / Archive</span>
          </nav>
          <main>
            <ReleaseCalendar />
            <ContactFooter />
          </main>
        </>
      ) : (
        <>
          <Hero />
          <main>
            <StatsDashboard />
            <ProducerShowcase />
            <Archive />
            <AboutBerky />
            <ContactFooter />
          </main>
        </>
      )}
    </>
  )
}

export default App
