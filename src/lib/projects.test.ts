import { describe, expect, it } from 'vitest'

import { filterProjects } from './projects'

const archive = [
  {
    id: 'night-cafe',
    title: 'Nachtcafé',
    artist: 'Berky',
    roles: ['Artist'] as const,
  },
  {
    id: 'freier-fall',
    title: 'Freier Fall',
    artist: 'Berky x LEA',
    roles: ['Producer', 'Composer'] as const,
  },
  {
    id: 'move-like-water',
    title: 'Move Like Water',
    artist: 'Berky x Donel',
    roles: ['Producer'] as const,
  },
]

describe('filterProjects', () => {
  it('finds projects by title or artist without regard to case', () => {
    expect(filterProjects(archive, 'NACHT', 'All')).toEqual([archive[0]])
    expect(filterProjects(archive, 'lea', 'All')).toEqual([archive[1]])
  })

  it('matches an ASCII I query for in liebe under a Turkish default locale', () => {
    const projects = [
      { id: 'in-liebe', title: 'in liebe', artist: 'Berky', roles: [] as const },
    ]
    const originalToLocaleLowerCase = String.prototype.toLocaleLowerCase

    String.prototype.toLocaleLowerCase = function (): string {
      return originalToLocaleLowerCase.call(this, 'tr')
    }

    try {
      expect(filterProjects(projects, 'IN', 'All')).toEqual(projects)
    } finally {
      String.prototype.toLocaleLowerCase = originalToLocaleLowerCase
    }
  })

  it('returns only projects matching the selected generic profile role', () => {
    expect(filterProjects(archive, '', 'Composer')).toEqual([archive[1]])
  })
})
