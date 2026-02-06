import { defineStore } from 'pinia'
import type { AuthState, User } from '~/types/app'

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
    currentPersonaIndex: 0,
    loading: false
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated && state.user !== null,
    currentUser: (state) => state.user,
    currentPersona: (state) => state.currentPersonaIndex
  },

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 800))

      const { mockUsers } = await import('~/data/mock-users')
      const user = mockUsers.find((u: User) => u.email === email)

      if (user && password === 'password') {
        this.user = user
        this.isAuthenticated = true
        this.currentPersonaIndex = mockUsers.findIndex((u: User) => u.id === user.id)
        this.saveToStorage()
        this.loading = false
        return true
      }

      this.loading = false
      return false
    },

    async demoLogin(personaIndex: number = 0): Promise<void> {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 500))

      const { mockUsers } = await import('~/data/mock-users')
      const user = mockUsers[personaIndex]

      if (user) {
        this.user = user
        this.isAuthenticated = true
        this.currentPersonaIndex = personaIndex
        this.saveToStorage()
      }

      this.loading = false
    },

    logout(): void {
      this.user = null
      this.isAuthenticated = false
      this.currentPersonaIndex = 0
      if (process.client) {
        localStorage.removeItem('kinship_auth')
      }
    },

    saveToStorage(): void {
      if (process.client && this.user) {
        localStorage.setItem('kinship_auth', JSON.stringify({
          userId: this.user.id,
          isAuthenticated: true,
          personaIndex: this.currentPersonaIndex
        }))
      }
    },

    async loadFromStorage(): Promise<boolean> {
      if (process.client) {
        try {
          const stored = localStorage.getItem('kinship_auth')
          if (stored) {
            const data = JSON.parse(stored)
            if (data.isAuthenticated && data.userId) {
              const { mockUsers } = await import('~/data/mock-users')
              const user = mockUsers.find((u: User) => u.id === data.userId)
              if (user) {
                this.user = user
                this.isAuthenticated = true
                this.currentPersonaIndex = data.personaIndex || 0
                return true
              }
            }
          }
        } catch (e) {
          console.error('Failed to restore auth session:', e)
        }
      }
      return false
    },

    async switchPersona(personaIndex: number): Promise<void> {
      const { mockUsers } = await import('~/data/mock-users')
      const user = mockUsers[personaIndex]

      if (user) {
        this.user = user
        this.isAuthenticated = true
        this.currentPersonaIndex = personaIndex
        this.saveToStorage()
      }
    },

    updateUser(updates: Partial<User>): void {
      if (this.user) {
        this.user = { ...this.user, ...updates }
        this.saveToStorage()
      }
    }
  }
})
