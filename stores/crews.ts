import { defineStore } from 'pinia'
import type { AccountabilityLog, Attachment, ChatMessage, Crew, CrewValue, Document, IncidentStatus, User } from '~/types/app'
import { mockCrews } from '~/data/mock-crews'
import { mockMessages } from '~/data/mock-messages'
import { mockIncidents } from '~/data/mock-incidents'
import { mockUsers } from '~/data/mock-users'

// Clone recursively rather than JSON-serializing so all seeded dates stay Dates.
function cloneRecord<T>(value: T): T {
  if (value instanceof Date) return new Date(value.getTime()) as T
  if (Array.isArray(value)) return value.map(item => cloneRecord(item)) as T
  if (value !== null && typeof value === 'object') {
    const copy = { ...value }
    for (const key in copy) copy[key] = cloneRecord(copy[key])
    return copy
  }
  return value
}

function seedCrews(): Crew[] {
  return mockCrews.map(crew => cloneRecord({
    ...crew,
    chatMessages: mockMessages[crew.id] || crew.chatMessages,
    accountabilityLogs: mockIncidents[crew.id] || crew.accountabilityLogs
  }))
}

function localId(prefix: string): string {
  return `${prefix}-${globalThis.crypto.randomUUID()}`
}

interface CrewsState {
  crews: Crew[]
  activeCrewId: string | null
  loading: boolean
}

export const useCrewsStore = defineStore('crews', {
  state: (): CrewsState => ({
    crews: seedCrews(),
    activeCrewId: null,
    loading: false
  }),

  getters: {
    userCrews: (state) => (userId: string) => {
      return state.crews.filter(crew => 
        crew.members.some(member => member.userId === userId)
      )
    },

    getCrewById: (state) => (id: string) => {
      return state.crews.find(crew => crew.id === id)
    }
  },

  actions: {
    setActiveCrew(crewId: string): void {
      this.activeCrewId = crewId
    },

    createCrew(name: string, description: string, creator: User): Crew | null {
      if (name.trim().length < 3 || name.trim().length > 80 || !description.trim() || description.trim().length > 1000) return null
      const now = new Date()
      const crew: Crew = {
        id: localId('crew'), name: name.trim(), description: description.trim(),
        status: 'forming', formationProgress: 10,
        members: [{ userId: creator.id, role: creator.role, responsibility: 100, status: 'active', joinedAt: now }],
        documents: [], chatMessages: [], checkIns: [], accountabilityLogs: [], values: [],
        nextCheckIn: null, createdAt: now
      }
      this.crews.push(crew)
      this.activeCrewId = crew.id
      return crew
    },

    joinCrew(crewId: string, user: User, request = false): boolean {
      const crew = this.getCrewById(crewId)
      if (!crew || crew.status === 'dissolved' || crew.members.some(member => member.userId === user.id)) return false
      crew.members.push({ userId: user.id, role: user.role, responsibility: 0, status: request ? 'pending' : 'active', joinedAt: new Date() })
      return true
    },

    sendMessage(crewId: string, senderId: string, content: string, attachments: Attachment[] = []): ChatMessage | null {
      const crew = this.getCrewById(crewId)
      if (!crew || (!content.trim() && !attachments.length)) return null
      const message: ChatMessage = {
        id: localId('msg'), crewId, senderId, content: content.trim(),
        type: attachments.length ? 'file' : 'text', attachments: cloneRecord(attachments),
        timestamp: new Date(), readBy: [senderId]
      }
      crew.chatMessages.push(message)
      return message
    },

    addIncident(crewId: string, reportedBy: string, severity: number, description: string): AccountabilityLog | null {
      const crew = this.getCrewById(crewId)
      if (!crew || !description.trim()) return null
      if (severity !== 1 && severity !== 2 && severity !== 3 && severity !== 4 && severity !== 5) return null
      const incident: AccountabilityLog = {
        id: localId('inc'), crewId, reportedBy, severity, description: description.trim(),
        date: new Date(), status: 'open', actions: [], involvedParties: [reportedBy]
      }
      crew.accountabilityLogs.push(incident)
      return incident
    },

    respondToIncident(crewId: string, incidentId: string, status: IncidentStatus, action: string): boolean {
      const incident = this.getCrewById(crewId)?.accountabilityLogs.find(record => record.id === incidentId)
      if (!incident || !action.trim()) return false
      incident.status = status
      incident.actions.push(action.trim())
      return true
    },

    addValue(crewId: string, title: string, category: string, description = ''): CrewValue | null {
      const crew = this.getCrewById(crewId)
      if (!crew || !title.trim()) return null
      const value: CrewValue = { id: localId('value'), title: title.trim(), category, description: description.trim(), matchPercentage: 100 }
      crew.values.push(value)
      return value
    },

    scheduleCheckIn(crewId: string, date: Date): boolean {
      const crew = this.getCrewById(crewId)
      if (!crew || !Number.isFinite(date.getTime()) || date.getTime() <= Date.now()) return false
      crew.nextCheckIn = new Date(date)
      return true
    },

    completeCheckIn(crewId: string, userId: string, rating: number, notes: string): boolean {
      const crew = this.getCrewById(crewId)
      if (!crew || rating < 1 || rating > 5 || !Number.isInteger(rating) || !notes.trim()) return false
      crew.checkIns.push({
        id: localId('checkin'), crewId, date: new Date(),
        responses: [{ category: 'relationship', rating, notes: notes.trim() }],
        summary: notes.trim(), concerns: [], celebrations: [], completedBy: [userId]
      })
      return true
    },

    createDocument(crewId: string, title: string, type: string, content: string): Document | null {
      const crew = this.getCrewById(crewId)
      if (!crew || !title.trim() || !content.trim()) return null
      const document: Document = {
        id: localId('doc'), crewId, title: title.trim(), type, content: content.trim(),
        status: 'draft', createdAt: new Date(),
        signers: crew.members.filter(member => member.status === 'active').map(member => ({
          userId: member.userId, name: mockUsers.find(user => user.id === member.userId)?.name || member.userId, signed: false
        }))
      }
      crew.documents.push(document)
      return document
    },

    updateDocument(crewId: string, documentId: string, title: string, type: string, content: string): boolean {
      const document = this.getCrewById(crewId)?.documents.find(record => record.id === documentId)
      if (!document || !title.trim() || !content.trim() || document.status === 'signed' || document.status === 'executed') return false
      Object.assign(document, { title: title.trim(), type, content: content.trim(), status: 'draft' })
      // A changed agreement needs fresh signatures.
      document.signers.forEach(signer => { signer.signed = false; delete signer.signedAt })
      delete document.signedAt
      return true
    },

    signDocument(crewId: string, documentId: string, userId: string): boolean {
      const document = this.getCrewById(crewId)?.documents.find(record => record.id === documentId)
      const signer = document?.signers.find(record => record.userId === userId)
      if (!document || !signer || signer.signed) return false
      signer.signed = true
      signer.signedAt = new Date()
      document.status = document.signers.every(record => record.signed) ? 'signed' : 'pending'
      if (document.status === 'signed') document.signedAt = new Date()
      return true
    }
  }
})
