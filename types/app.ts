// Kinship App Type Definitions
// Provider-based terminology replacing "donor"

export type ProviderRole = 
  | 'genetic-provider'
  | 'resource-provider' 
  | 'care-provider'
  | 'co-parent'
  | 'primary-parent'
  | 'support-provider'

export type UserStatus = 'available' | 'in-crew' | 'matched' | 'offline'
export type CrewStatus = 'forming' | 'active' | 'paused' | 'dissolved'
export type DocumentStatus = 'draft' | 'pending' | 'signed' | 'executed'
export type IncidentSeverity = 1 | 2 | 3 | 4 | 5
export type IncidentStatus = 'open' | 'addressed' | 'resolved'

export interface User {
  id: string
  email: string
  name: string
  avatar: string
  location: string
  bio: string
  pronouns: string
  role: ProviderRole
  status: UserStatus
  values: UserValues
  seeking: ProviderRole[]
  availability: string
  children: number
  languages: string[]
  documentsComplete: boolean
  createdAt: Date
}

export interface UserValues {
  parentingStyle: string[]
  religiousViews: string
  politicalViews: string
  familyStructure: string
  workLife: string
  locationPreference: string
}

export interface Crew {
  id: string
  name: string
  description: string
  status: CrewStatus
  members: CrewMember[]
  formationProgress: number
  documents: Document[]
  chatMessages: ChatMessage[]
  checkIns: CheckIn[]
  accountabilityLogs: AccountabilityLog[]
  nextCheckIn: Date
  createdAt: Date
}

export interface CrewMember {
  userId: string
  role: ProviderRole
  responsibility: number
  status: 'pending' | 'active' | 'stepping-back'
  joinedAt: Date
}

export interface ChatMessage {
  id: string
  crewId: string
  senderId: string
  content: string
  type: 'text' | 'file' | 'system'
  attachments?: Attachment[]
  timestamp: Date
  readBy: string[]
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export interface Document {
  id: string
  crewId: string
  title: string
  type: string
  status: DocumentStatus
  content: string
  signers: Signer[]
  createdAt: Date
  signedAt?: Date
}

export interface Signer {
  userId: string
  name: string
  signed: boolean
  signedAt?: Date
}

export interface CheckIn {
  id: string
  crewId: string
  date: Date
  responses: CheckInResponse[]
  summary: string
  concerns: string[]
  celebrations: string[]
  completedBy: string[]
}

export interface CheckInResponse {
  category: string
  rating: number
  notes: string
}

export interface AccountabilityLog {
  id: string
  crewId: string
  reportedBy: string
  severity: IncidentSeverity
  description: string
  date: Date
  status: IncidentStatus
  actions: string[]
  involvedParties: string[]
}

export interface CompassMatch {
  userId: string
  compatibilityScore: number
  valuesMatch: Record<string, number>
  status: 'new' | 'liked' | 'maybe' | 'passed' | 'matched'
  likedAt?: Date
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  currentPersonaIndex: number
  loading: boolean
}

export interface Notification {
  id: string
  type: 'match' | 'message' | 'document' | 'checkin' | 'incident'
  title: string
  message: string
  read: boolean
  timestamp: Date
  actionUrl?: string
}
