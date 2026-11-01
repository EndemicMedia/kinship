import { defineStore } from 'pinia'

export type CompassDecision = 'liked' | 'maybe' | 'passed'
export type CompassAction = 'message' | 'connect'

interface CompassStoreState {
  activePersonaId: string
  decisionsByPersona: Record<string, Record<string, CompassDecision>>
  decisionEpochs: Record<string, number>
  pendingActions: string[]
  sentMessages: Array<{ senderId: string; userId: string; message: string; createdAt: number }>
  connectionRequests: Array<{ senderId: string; userId: string; message: string; createdAt: number }>
}

export const useCompassStore = defineStore('compass', {
  state: (): CompassStoreState => ({
    activePersonaId: '',
    decisionsByPersona: {},
    decisionEpochs: {},
    pendingActions: [],
    sentMessages: [],
    connectionRequests: []
  }),

  actions: {
    decisions(personaId: string): Record<string, CompassDecision> {
      return this.decisionsByPersona[personaId] ?? {}
    },

    async decide(personaId: string, userId: string, decision: CompassDecision): Promise<boolean> {
      const key = `decision:${personaId}:${userId}`
      if (this.pendingActions.includes(key)) return false
      if (this.decisions(personaId)[userId] === decision) return false
      const epoch = this.decisionEpochs[personaId] ?? 0
      this.pendingActions.push(key)
      await new Promise(resolve => setTimeout(resolve, 180))
      const isCurrent = epoch === (this.decisionEpochs[personaId] ?? 0)
      if (isCurrent) {
        this.decisionsByPersona[personaId] ??= {}
        this.decisionsByPersona[personaId][userId] = decision
      }
      this.pendingActions = this.pendingActions.filter(action => action !== key)
      return isCurrent
    },

    resetDecisions(personaId: string): void {
      this.decisionEpochs[personaId] = (this.decisionEpochs[personaId] ?? 0) + 1
      this.decisionsByPersona[personaId] = {}
    },

    async sendAction(action: CompassAction, userId: string, message: string): Promise<boolean> {
      const senderId = this.activePersonaId
      const key = `${senderId}:${action}:${userId}`
      if (this.pendingActions.includes(key)) return false
      if (action === 'connect' && this.hasConnectionRequest(userId)) return false
      this.pendingActions.push(key)
      await new Promise(resolve => setTimeout(resolve, 220))
      const result = { senderId, userId, message: message.trim(), createdAt: Date.now() }
      if (action === 'message') this.sentMessages.unshift(result)
      else this.connectionRequests.unshift(result)
      this.pendingActions = this.pendingActions.filter(pending => pending !== key)
      return true
    },

    hasPending(action: CompassAction, userId: string): boolean {
      return this.pendingActions.includes(`${this.activePersonaId}:${action}:${userId}`)
    },

    hasSentMessage(userId: string): boolean {
      return this.sentMessages.some(item => item.senderId === this.activePersonaId && item.userId === userId)
    },

    hasConnectionRequest(userId: string): boolean {
      return this.connectionRequests.some(item => item.senderId === this.activePersonaId && item.userId === userId)
    }
  }
})
