import assert from 'node:assert/strict'
import { test } from 'node:test'

import { calculateMatchScore } from '../../utils/matching.ts'
import type { User } from '../../types/app'
type MatchUser = User

const template: MatchUser = {
  id: 'match-test',
  email: 'match@example.test',
  name: 'Match Test',
  avatar: '',
  location: 'Portland, OR',
  bio: '',
  pronouns: 'they/them',
  role: 'primary-parent',
  status: 'available',
  values: {
    parentingStyle: ['gentle-parenting'],
    religiousViews: 'secular',
    politicalViews: 'progressive',
    familyStructure: 'co-parenting',
    workLife: 'flexible',
    locationPreference: 'urban'
  },
  seeking: ['primary-parent'],
  availability: 'full-time',
  children: 0,
  languages: ['English', 'Spanish'],
  documentsComplete: true,
  createdAt: new Date('2025-01-01')
}

function createUser(overrides: Partial<MatchUser> = {}): MatchUser {
  return {
    ...template,
    ...overrides
  }
}

test('identical complete profiles score consistently across every dimension', () => {
  const score = calculateMatchScore(createUser(), createUser())

  assert.equal(score.total, 100)
  assert.deepEqual(score.breakdown, {
    values: 100,
    location: 100,
    role: 100,
    language: 100
  })
})

test('missing matching data does not earn compatibility points', () => {
  const score = calculateMatchScore({}, {})

  assert.equal(score.total, 0)
  assert.deepEqual(score.breakdown, {
    values: null,
    location: null,
    role: null,
    language: null
  })
})

test('available categories are compared without adding points for missing categories', () => {
  const currentUser = createUser({
    values: undefined,
    location: '',
    role: 'primary-parent',
    seeking: ['co-parent'],
    languages: []
  })

  const targetUser = createUser({
    values: undefined,
    location: '',
    role: 'co-parent',
    seeking: ['primary-parent'],
    languages: []
  })

  const score = calculateMatchScore(currentUser, targetUser)

  assert.equal(score.total, 100)
  assert.equal(score.breakdown.values, null)
  assert.equal(score.breakdown.location, null)
  assert.equal(score.breakdown.role, 100)
  assert.equal(score.breakdown.language, null)
})

test('blank and duplicate array entries do not inflate alignment', () => {
  const blank = calculateMatchScore({ languages: [' ', ''] }, { languages: [''] })
  assert.equal(blank.total, 0)
  const normalized = calculateMatchScore({ languages: [' English ', 'english'] }, { languages: ['ENGLISH'] })
  assert.equal(normalized.breakdown.language, 100)
  assert.equal(calculateMatchScore(null, undefined).total, 0)
})
