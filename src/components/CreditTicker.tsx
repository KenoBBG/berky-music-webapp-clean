import type { Collaborator } from '../data/signal'

interface CreditTickerProps {
  items: readonly Collaborator[]
}

function prefersReducedMotion(): boolean {
  return typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function Run({ duplicate, items }: { duplicate?: boolean, items: readonly Collaborator[] }) {
  return (
    <ul
      className="credit-ticker__run"
      // The second run exists only so the marquee can wrap without a visible seam.
      {...(duplicate ? { 'aria-hidden': 'true' } : { 'aria-label': 'Credited collaborators' })}
    >
      {items.map(({ name, songs }) => (
        <li key={name}>
          {name}
          <span>{songs}</span>
        </li>
      ))}
    </ul>
  )
}

export function CreditTicker({ items }: CreditTickerProps) {
  const isStatic = prefersReducedMotion()

  return (
    <div className="credit-ticker" data-static={isStatic ? 'true' : undefined}>
      <Run items={items} />
      {!isStatic && <Run duplicate items={items} />}
    </div>
  )
}
