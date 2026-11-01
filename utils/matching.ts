import type { User } from '~/types/app'

export type MatchingProfile = Partial<Pick<User, 'location' | 'role' | 'seeking' | 'languages'>> & {
  values?: Partial<User['values']>
}

export interface MatchScore {
  total: number
  breakdown: {
    values: number | null
    location: number | null
    role: number | null
    language: number | null
  }
}

function normalizedText(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim().toLowerCase() : null
}

function overlapScore(left: string[], right: string[]): number | null {
  const normalize = (values: string[]) => new Set(values.map(normalizedText).filter((value): value is string => value !== null))
  const leftValues = normalize(left)
  const rightValues = normalize(right)
  if (!leftValues.size || !rightValues.size) return null
  const unionSize = new Set([...leftValues, ...rightValues]).size
  const overlap = [...leftValues].filter(value => rightValues.has(value)).length
  return unionSize === 0 ? null : overlap / unionSize * 100
}

function valuesScore(current: MatchingProfile['values'], target: MatchingProfile['values']): number | null {
  if (!current || !target) return null
  const scores: number[] = []
  const parentingStyle = overlapScore(current.parentingStyle ?? [], target.parentingStyle ?? [])
  if (parentingStyle !== null) scores.push(parentingStyle)

  for (const key of ['religiousViews', 'politicalViews', 'familyStructure', 'workLife', 'locationPreference'] as const) {
    const left = normalizedText(current[key])
    const right = normalizedText(target[key])
    if (left !== null && right !== null) scores.push(left === right ? 100 : 0)
  }

  return scores.length ? scores.reduce((sum, score) => sum + score, 0) / scores.length : null
}

function locationScore(current: string | undefined, target: string | undefined): number | null {
  const parse = (value: string | undefined) => {
    if (!value) return null
    const [city, region] = value.split(',').map(part => part.trim().toLowerCase())
    return city && region ? { city, region } : null
  }
  const left = parse(current)
  const right = parse(target)
  if (!left || !right) return null
  if (left.city === right.city && left.region === right.region) return 100
  return left.region === right.region ? 75 : 25
}

function roleScore(current: MatchingProfile, target: MatchingProfile): number | null {
  if (!current.role || !target.role || !Array.isArray(current.seeking) || !Array.isArray(target.seeking)) return null
  const currentAcceptsTarget = current.seeking.includes(target.role)
  const targetAcceptsCurrent = target.seeking.includes(current.role)
  return (Number(currentAcceptsTarget) + Number(targetAcceptsCurrent)) * 50
}

function languageScore(current: string[] | undefined, target: string[] | undefined): number | null {
  if (!Array.isArray(current) || !Array.isArray(target)) return null
  return overlapScore(current, target)
}

export function calculateMatchScore(currentUser: MatchingProfile | null | undefined, targetUser: MatchingProfile | null | undefined): MatchScore {
  if (!currentUser || !targetUser) {
    return { total: 0, breakdown: { values: null, location: null, role: null, language: null } }
  }

  const breakdown = {
    values: valuesScore(currentUser.values, targetUser.values),
    location: locationScore(currentUser.location, targetUser.location),
    role: roleScore(currentUser, targetUser),
    language: languageScore(currentUser.languages, targetUser.languages)
  }
  const weights = { values: 40, location: 20, role: 25, language: 15 } as const
  let availableWeight = 0
  let weightedScore = 0

  for (const key of Object.keys(weights) as (keyof typeof weights)[]) {
    const score = breakdown[key]
    if (score === null) continue
    availableWeight += weights[key]
    weightedScore += score * weights[key] / 100
  }

  return {
    total: availableWeight ? Math.round(weightedScore / availableWeight * 100) : 0,
    breakdown
  }
}
