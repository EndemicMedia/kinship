// Mock crew data for Kinship app
// Using provider-based terminology

export const mockCrews = [
  {
    id: 'crew-1',
    name: 'The Village Collective',
    description: 'A diverse crew building intentional family together',
    status: 'active',
    members: [
      {
        userId: 'user-1',
        role: 'primary-parent',
        responsibility: 40,
        status: 'active',
        joinedAt: new Date('2024-01-15')
      },
      {
        userId: 'user-3',
        role: 'genetic-provider',
        responsibility: 20,
        status: 'active',
        joinedAt: new Date('2024-01-20')
      },
      {
        userId: 'user-4',
        role: 'care-provider',
        responsibility: 25,
        status: 'active',
        joinedAt: new Date('2024-02-01')
      }
    ],
    values: [
      { id: 'v1', title: 'Open Communication', description: 'Transparency in all decisions', category: 'communication', matchPercentage: 95 },
      { id: 'v2', title: 'Shared Finances', description: 'Joint contribution to child expenses', category: 'financial', matchPercentage: 88 },
      { id: 'v3', title: 'Gentle Parenting', description: 'Approach to discipline and guidance', category: 'parenting', matchPercentage: 92 },
      { id: 'v4', title: 'Cultural Heritage', description: 'Maintaining strong cultural roots', category: 'culture', matchPercentage: 85 }
    ],
    formationProgress: 85,
    documents: [
      {
        id: 'doc-1',
        crewId: 'crew-1',
        title: 'Co-Parenting Agreement',
        type: 'co-parenting',
        status: 'signed',
        content: 'Legal agreement outlining responsibilities...',
        signers: [
          { userId: 'user-1', name: 'Alex Rivera', signed: true, signedAt: new Date('2024-02-15') },
          { userId: 'user-3', name: 'Marcus Williams', signed: true, signedAt: new Date('2024-02-16') },
          { userId: 'user-4', name: 'Priya Sharma', signed: true, signedAt: new Date('2024-02-17') }
        ],
        createdAt: new Date('2024-02-01')
      },
      {
        id: 'doc-2',
        crewId: 'crew-1',
        title: 'Financial Responsibility Plan',
        type: 'financial',
        status: 'pending',
        content: 'Resource provider commitments and schedules...',
        signers: [
          { userId: 'user-1', name: 'Alex Rivera', signed: true, signedAt: new Date('2024-02-20') },
          { userId: 'user-3', name: 'Marcus Williams', signed: false },
          { userId: 'user-4', name: 'Priya Sharma', signed: true, signedAt: new Date('2024-02-21') }
        ],
        createdAt: new Date('2024-02-10')
      }
    ],
    chatMessages: [],
    checkIns: [],
    accountabilityLogs: [],
    nextCheckIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'crew-2',
    name: 'Brooklyn Formation',
    description: 'Couple seeking genetic provider partnership',
    status: 'forming',
    members: [
      {
        userId: 'user-2',
        role: 'co-parent',
        responsibility: 40,
        status: 'active',
        joinedAt: new Date('2023-11-20')
      },
      {
        userId: 'user-3',
        role: 'genetic-provider',
        responsibility: 20,
        status: 'active',
        joinedAt: new Date('2024-01-10')
      }
    ],
    formationProgress: 60,
    documents: [
      {
        id: 'doc-3',
        crewId: 'crew-2',
        title: 'Genetic Provider Agreement',
        type: 'genetic-provider',
        status: 'draft',
        content: 'Terms for genetic provision and involvement...',
        signers: [
          { userId: 'user-2', name: 'Jordan & Sam Chen', signed: false },
          { userId: 'user-3', name: 'Marcus Williams', signed: false }
        ],
        createdAt: new Date('2024-01-15')
      }
    ],
    chatMessages: [],
    checkIns: [],
    accountabilityLogs: [],
    nextCheckIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    createdAt: new Date('2023-11-20')
  },
  {
    id: 'crew-3',
    name: 'Miami Crew',
    description: 'Building our family with cultural heritage focus',
    status: 'forming',
    members: [
      {
        userId: 'user-5',
        role: 'co-parent',
        responsibility: 50,
        status: 'active',
        joinedAt: new Date('2024-02-01')
      }
    ],
    formationProgress: 30,
    documents: [],
    chatMessages: [],
    checkIns: [],
    accountabilityLogs: [],
    nextCheckIn: null,
    createdAt: new Date('2024-02-01')
  }
]

export const getCrewById = (id: string) => mockCrews.find(c => c.id === id)
export const getUserCrews = (userId: string) => mockCrews.filter(c =>
  c.members.some(m => m.userId === userId)
)
