import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BarChart3, Disc3, Music, Radio, Users } from 'lucide-react'
import type { ComponentType } from 'react'
import { useEffect, useState } from 'react'

import {
  collaborators,
  dashboardStats,
  type DashboardStat,
  latestReleaseStat,
  pendingMetrics,
} from '../data/signal'
import { CreditTicker } from './CreditTicker'

const STAT_ICONS: Record<string, ComponentType<{ size?: number, strokeWidth?: number }>> = {
  songs: Music,
  artists: Users,
  streams: BarChart3,
  releases: Disc3,
}

function formatStat(current: number, display: string): string {
  if (display.endsWith('M')) return `${(current / 1_000_000).toFixed(1)}M`
  return Math.round(current).toLocaleString('en-US')
}

/**
 * Counts a figure up on mount as an enhancement. The accessible figure is the
 * settled display string, so the count-up is never what assistive tech or the
 * tests read. Reduced-motion users get the settled value with no animation.
 */
function useCountUp(target: number): number {
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(reduced ? target : 0)

  useEffect(() => {
    // Reduced-motion users already start at the target via initial state.
    if (reduced) return
    let frame = 0
    const duration = 1100
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      // Ease-out cubic so the figure decelerates into its final value.
      setCurrent(target * (1 - (1 - progress) ** 3))
      if (progress < 1) frame = requestAnimationFrame(tick)
      else setCurrent(target)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, reduced])

  return current
}

const cardVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

function StatCard({ stat }: { stat: DashboardStat }) {
  const current = useCountUp(stat.value)
  const Icon = STAT_ICONS[stat.id] ?? Music

  return (
    <motion.li className="stat-card" variants={cardVariants} aria-label={`${stat.display} ${stat.label}`}>
      <span className="stat-card__gloss" aria-hidden="true" />
      <span className="stat-card__icon" aria-hidden="true"><Icon size={18} strokeWidth={1.6} /></span>
      <span className="stat-card__value" aria-hidden="true">{formatStat(current, stat.display)}</span>
      <span className="stat-card__label">{stat.label}</span>
      <span className="stat-card__detail">{stat.detail}</span>
      <a
        className="stat-card__source"
        href={stat.source.href}
        rel="noreferrer"
        target="_blank"
      >
        {stat.source.label}
        <ArrowUpRight size={12} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </motion.li>
  )
}

export function StatsDashboard() {
  return (
    <section className="stats-dashboard" aria-label="Berky at a glance" id="page-content">
      <div className="stats-dashboard__head">
        <p className="eyebrow">Producer / writer / pianist</p>
        <h2 className="stats-dashboard__title">Berky, by the numbers.</h2>
        <p className="stats-dashboard__lead">
          A dated reading of the catalogue, not a live counter. Every figure carries the source and
          date it was read. Live platform metrics are being wired in.
        </p>
      </div>

      <motion.ul
        className="stats-dashboard__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.07 }}
      >
        {dashboardStats.map(stat => (
          <StatCard key={stat.id} stat={stat} />
        ))}

        <motion.li
          className="stat-card stat-card--feature"
          variants={cardVariants}
          aria-label={`Latest release: ${latestReleaseStat.title} ${latestReleaseStat.feature}`}
        >
          <span className="stat-card__gloss" aria-hidden="true" />
          <p className="stat-card__kicker">Latest release</p>
          <p className="stat-card__feature-title">
            {latestReleaseStat.title}
            <span>{latestReleaseStat.feature}</span>
          </p>
          <p className="stat-card__feature-streams">
            {latestReleaseStat.streamsDisplay}
            <span>streams · {latestReleaseStat.capturedAt}</span>
          </p>
          <a
            className="stat-card__source stat-card__source--cta"
            href={latestReleaseStat.href}
            rel="noreferrer"
            target="_blank"
          >
            {latestReleaseStat.title} on Spotify
            <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </motion.li>

        <motion.li className="stat-card stat-card--pending" variants={cardVariants}>
          <span className="stat-card__gloss" aria-hidden="true" />
          <span className="stat-card__icon" aria-hidden="true"><Radio size={18} strokeWidth={1.6} /></span>
          <p className="stat-card__kicker">Live metrics — in evaluation</p>
          <ul className="stat-card__pending-list">
            {pendingMetrics.map(metric => (
              <li key={metric.id}>
                <span>{metric.label}</span>
                <em>{metric.note}</em>
              </li>
            ))}
          </ul>
        </motion.li>
      </motion.ul>

      <CreditTicker items={collaborators} />
    </section>
  )
}
