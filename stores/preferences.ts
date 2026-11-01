import { defineStore } from 'pinia'

export interface ShowcasePreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  weeklyDigest: boolean
  discoverable: boolean
  shareMatchBreakdown: boolean
}

const STORAGE_KEY = 'kinship_showcase_preferences'

const defaults: ShowcasePreferences = {
  emailNotifications: true,
  pushNotifications: true,
  weeklyDigest: true,
  discoverable: true,
  shareMatchBreakdown: true
}

interface PreferencesState {
  preferencesByPersona: Record<string, ShowcasePreferences>
  activePersonaId: string | null
  storageError: 'read' | 'write' | null
}

export const usePreferencesStore = defineStore('preferences', {
  state: (): PreferencesState => ({
    preferencesByPersona: {},
    activePersonaId: null,
    storageError: null
  }),

  getters: {
    activePreferences: (state): ShowcasePreferences => {
      return state.preferencesByPersona[state.activePersonaId ?? ''] ?? defaults
    }
  },

  actions: {
    loadForPersona(personaId: string): void {
      if (this.activePersonaId === personaId && this.preferencesByPersona[personaId]) return
      this.activePersonaId = personaId
      this.storageError = null
      if (process.client) {
        try {
          const stored = localStorage.getItem(STORAGE_KEY)
          if (stored) {
            const parsed: unknown = JSON.parse(stored)
            if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
              this.preferencesByPersona = parsed as Record<string, ShowcasePreferences>
            }
          }
        } catch {
          this.storageError = 'read'
        }
      }
      this.preferencesByPersona[personaId] ??= { ...defaults }
    },

    save(): boolean {
      if (!process.client) return true
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.preferencesByPersona))
        this.storageError = null
        return true
      } catch {
        this.storageError = 'write'
        return false
      }
    }
  }
})
