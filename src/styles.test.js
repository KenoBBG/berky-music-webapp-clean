import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const appCss = readFileSync(resolve(process.cwd(), 'src/App.css'), 'utf8')
const indexCss = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8')

describe('responsive archive styles', () => {
  it('keeps every selected project at one two-column-grid track below 768px', () => {
    const compactBreakpoint = appCss.match(/@media \(max-width: 767px\) \{([\s\S]*?)\n\}/)

    expect(compactBreakpoint?.[1]).toMatch(/\.project-grid--selected \.project-card \{[^}]*grid-column: span 1;/)
    expect(compactBreakpoint?.[1]).not.toMatch(/\.project-grid--selected \.project-card:[\w-]+\([^)]*\)/)
    expect(compactBreakpoint?.[1]).not.toMatch(/\.project-grid--selected[^}]*grid-column: span (?!1;)/)
  })

  it('makes every selected project occupy the single grid column below 440px', () => {
    const narrowBreakpoint = appCss.match(/@media \(max-width: 440px\) \{([\s\S]*?)\n\}/)

    expect(narrowBreakpoint?.[1]).toContain('.project-grid--selected .project-card { grid-column: span 1; }')
    expect(narrowBreakpoint?.[1]).toContain('.project-grid--selected .project-card:first-child { grid-column: span 1; }')
  })

  it('removes nonessential motion in reduced-motion mode', () => {
    expect(appCss).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.project-card:hover img \{ transform: none; \}/)
    expect(appCss).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.project-card button:hover::after, \.project-dialog a:hover::after \{ transform: none; \}/)
    expect(indexCss).toMatch(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition: none !important;/)
  })
})
