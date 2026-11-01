import { defineStore } from 'pinia'
import type { AuthState, User } from '~/types/app'
import { mockUsers } from '~/data/mock-users'

interface StoredAuth {
  userId: string
  isAuthenticated: boolean
  personaIndex: number
}

export type AuthStorageError = 'clear' | 'write' | 'read' | 'profileRead'

interface AuthStoreState extends AuthState {
  profileOverrides: Record<string, Partial<User>>
  hasRestored: boolean
  storageError: AuthStorageError | null
  transitionId: number
}

const AUTH_STORAGE_KEY = 'kinship_auth'
const PROFILE_STORAGE_KEY = 'kinship_profile_overrides'

export const useAuthStore = defineStore('auth', {
  state: (): AuthStoreState => ({
    isAuthenticated: false,
    user: null,
    currentPersonaIndex: 0,
    loading: false,
    profileOverrides: {},
    hasRestored: false,
    storageError: null,
    transitionId: 0
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && state.user !== null,
    currentUser: (state) => state.user,
    currentPersona: (state) => state.currentPersonaIndex
  },

  actions: {
    applyUser(user: User, personaIndex: number): void {
      this.user = { ...user, ...this.profileOverrides[user.id] }
      this.isAuthenticated = true
      this.currentPersonaIndex = personaIndex
    },

    readProfileOverrides(): void {
      if (!process.client) return
      try {
        const rawOverrides = localStorage.getItem(PROFILE_STORAGE_KEY)
        if (rawOverrides) {
          const value: unknown = JSON.parse(rawOverrides)
          if (value && typeof value === 'object' && !Array.isArray(value)) {
            this.profileOverrides = value as Record<string, Partial<User>>
          }
        }
      } catch {
        this.profileOverrides = {}
        this.storageError = 'profileRead'
      }
    },

    async login(email: string, password: string): Promise<boolean> {
      const operation = ++this.transitionId
      this.loading = true
      this.storageError = null
      await new Promise(resolve => setTimeout(resolve, 300))
      if (operation !== this.transitionId) return false

      const user = mockUsers.find(candidate => candidate.email === email)
      if (!user || password !== 'password') {
        this.loading = false
        return false
      }

      this.readProfileOverrides()
      this.applyUser(user, mockUsers.findIndex(candidate => candidate.id === user.id))
      this.hasRestored = true
      this.saveToStorage()
      this.loading = false
      return true
    },

    async demoLogin(personaIndex = 0): Promise<void> {
      const operation = ++this.transitionId
      this.loading = true
      this.storageError = null
      await new Promise(resolve => setTimeout(resolve, 200))
      if (operation !== this.transitionId) return

      const user = mockUsers[personaIndex]
      if (user) {
        this.readProfileOverrides()
        this.applyUser(user, personaIndex)
        this.hasRestored = true
        this.saveToStorage()
      }
      this.loading = false
    },

    logout(): void {
      ++this.transitionId
      this.loading = false
      this.user = null
      this.isAuthenticated = false
      this.currentPersonaIndex = 0
      this.hasRestored = true
      this.storageError = null
      if (process.client) {
        try {
          localStorage.removeItem(AUTH_STORAGE_KEY)
        } catch {
          this.storageError = 'clear'
        }
      }
    },

    saveToStorage(): boolean {
      if (!process.client) return true
      try {
        if (this.user) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
            userId: this.user.id,
            isAuthenticated: true,
            personaIndex: this.currentPersonaIndex
          } satisfies StoredAuth))
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(this.profileOverrides))
        }
        this.storageError = null
        return true
      } catch {
        this.storageError = 'write'
        return false
      }
    },

    async loadFromStorage(): Promise<boolean> {
      if (!process.client) return false
      if (this.hasRestored) return this.isLoggedIn

      this.hasRestored = true
      this.storageError = null
      try {
        this.readProfileOverrides()
        const rawAuth = localStorage.getItem(AUTH_STORAGE_KEY)
        if (!rawAuth) return false

        const stored: unknown = JSON.parse(rawAuth)
        if (!stored || typeof stored !== 'object') return false
        const data = stored as Partial<StoredAuth>
        if (data.isAuthenticated !== true || typeof data.userId !== 'string') return false

        const user = mockUsers.find(candidate => candidate.id === data.userId)
        if (!user) return false
        this.applyUser(user, mockUsers.findIndex(candidate => candidate.id === user.id))
        return true
      } catch {
        this.storageError = 'read'
        this.user = null
        this.isAuthenticated = false
        return false
      }
    },

    async switchPersona(personaIndex: number): Promise<void> {
      const user = mockUsers[personaIndex]
      if (!user) return
      ++this.transitionId
      this.loading = false
      this.storageError = null
      this.applyUser(user, personaIndex)
      this.saveToStorage()
    },

    updateUser(updates: Partial<User>): void {
      if (!this.user) return
      this.profileOverrides[this.user.id] = {
        ...this.profileOverrides[this.user.id],
        ...updates
      }
      this.user = { ...this.user, ...updates }
      this.saveToStorage()
    },

    clearStorageError(): void {
      this.storageError = null
    }
  }
})
