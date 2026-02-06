// Matching algorithm for The Compass

export interface MatchScore {
    total: number
    breakdown: {
        values: number
        location: number
        role: number
        language: number
    }
}

export function calculateMatchScore(currentUser: any, targetUser: any): MatchScore {
    if (!currentUser || !targetUser) {
        return { total: 50, breakdown: { values: 0, location: 0, role: 0, language: 0 } }
    }

    const weights = {
        values: 40,
        location: 20,
        role: 25,
        language: 15
    }

    let valuesScore = 0
    let locationScore = 0
    let roleScore = 0
    let languageScore = 0

    // Values alignment (40 points max)
    const currentValues = currentUser.values || {}
    const targetValues = targetUser.values || {}

    // Parenting style overlap (10 points)
    if (currentValues.parentingStyle && targetValues.parentingStyle) {
        const overlap = currentValues.parentingStyle.filter((s: string) =>
            targetValues.parentingStyle.includes(s)
        ).length
        if (overlap > 0) valuesScore += 10
    }

    // Religious alignment (10 points)
    if (currentValues.religiousViews === targetValues.religiousViews) {
        valuesScore += 10
    } else if (
        (currentValues.religiousViews?.includes('secular') && targetValues.religiousViews?.includes('secular')) ||
        (currentValues.religiousViews?.includes('spiritual') && targetValues.religiousViews?.includes('spiritual'))
    ) {
        valuesScore += 5
    }

    // Political alignment (10 points)
    if (currentValues.politicalViews === targetValues.politicalViews) {
        valuesScore += 10
    } else if (
        (currentValues.politicalViews?.includes('progressive') && targetValues.politicalViews?.includes('progressive')) ||
        (currentValues.politicalViews?.includes('moderate') && targetValues.politicalViews?.includes('moderate'))
    ) {
        valuesScore += 5
    }

    // Location preference (10 points)
    if (currentValues.locationPreference === targetValues.locationPreference) {
        valuesScore += 10
    } else if (
        currentValues.locationPreference?.includes('urban') && targetValues.locationPreference?.includes('urban')
    ) {
        valuesScore += 5
    }

    // Location proximity (20 points)
    const currentState = currentUser.location?.split(',')[1]?.trim()
    const targetState = targetUser.location?.split(',')[1]?.trim()
    if (currentState === targetState) {
        locationScore = weights.location // Same state
    } else {
        locationScore = weights.location * 0.3 // Different state
    }

    // Role compatibility (25 points)
    const currentSeeking = currentUser.seeking || []
    const targetRole = targetUser.role
    const targetSeeking = targetUser.seeking || []

    if (currentSeeking.includes(targetRole)) {
        roleScore += weights.role * 0.6
    }
    if (targetSeeking.includes(currentUser.role)) {
        roleScore += weights.role * 0.4
    }

    // Language overlap (15 points)
    const currentLanguages = currentUser.languages || []
    const targetLanguages = targetUser.languages || []
    const languageOverlap = currentLanguages.filter((l: string) => targetLanguages.includes(l)).length

    if (languageOverlap > 0) {
        languageScore = weights.language * (languageOverlap / Math.max(currentLanguages.length, 1))
    }

    const total = Math.min(Math.round(valuesScore + locationScore + roleScore + languageScore), 100)

    return {
        total,
        breakdown: {
            values: Math.round(valuesScore),
            location: Math.round(locationScore),
            role: Math.round(roleScore),
            language: Math.round(languageScore)
        }
    }
}
