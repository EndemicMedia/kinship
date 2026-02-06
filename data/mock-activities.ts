import type { Activity } from '~/stores/ui'

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'crew',
    title: 'New crew formed',
    description: 'The Adventure Seekers crew was created',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    userId: 'user-1'
  },
  {
    id: '2',
    type: 'member',
    title: 'New member joined',
    description: 'Sarah Johnson joined Outdoor Explorers',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    userId: 'user-2',
    crewId: 'crew-1'
  },
  {
    id: '3',
    type: 'document',
    title: 'Document signed',
    description: 'Crew agreement was signed by 3 members',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    crewId: 'crew-1'
  },
  {
    id: '4',
    type: 'milestone',
    title: 'Formation milestone reached',
    description: 'Tech Enthusiasts reached 75% formation progress',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    crewId: 'crew-2'
  },
  {
    id: '5',
    type: 'message',
    title: 'New message',
    description: 'You have 3 unread messages in Outdoor Explorers',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26 hours ago
    crewId: 'crew-1'
  },
  {
    id: '6',
    type: 'crew',
    title: 'Crew status updated',
    description: 'Creative Minds is now fully formed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    crewId: 'crew-3'
  },
  {
    id: '7',
    type: 'member',
    title: 'Role assigned',
    description: 'You were assigned as Captain of Adventure Seekers',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72), // 3 days ago
    crewId: 'crew-4'
  },
  {
    id: '8',
    type: 'document',
    title: 'Agreement updated',
    description: 'Co-Parenting Agreement was revised by Alex Rivera',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 80), // 3.3 days ago
    userId: 'user-1',
    crewId: 'crew-1'
  },
  {
    id: '9',
    type: 'member',
    title: 'Background check complete',
    description: 'Marcus Williams completed background verification',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96), // 4 days ago
    userId: 'user-3',
    crewId: 'crew-1'
  },
  {
    id: '10',
    type: 'milestone',
    title: 'Values alignment completed',
    description: 'The Adventure Seekers completed values assessment',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 120), // 5 days ago
    crewId: 'crew-4'
  },
  {
    id: '11',
    type: 'message',
    title: 'New connection request',
    description: 'Taylor Reed sent you a connection request',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 144), // 6 days ago
    userId: 'user-6'
  },
  {
    id: '12',
    type: 'crew',
    title: 'Weekly check-in completed',
    description: 'The Village Collective completed their relationship health survey',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 168), // 7 days ago
    crewId: 'crew-1'
  },
  {
    id: '13',
    type: 'document',
    title: 'Document shared',
    description: 'Priya Sharma shared Values Alignment Statement',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 192), // 8 days ago
    userId: 'user-4',
    crewId: 'crew-1'
  },
  {
    id: '14',
    type: 'member',
    title: 'Match found',
    description: 'You have a 95% match with Diego & Roberto',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 216), // 9 days ago
    userId: 'user-5'
  },
  {
    id: '15',
    type: 'milestone',
    title: 'Legal consultation booked',
    description: 'Creative Minds scheduled meeting with family law attorney',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 240), // 10 days ago
    crewId: 'crew-3'
  },
  {
    id: '16',
    type: 'message',
    title: 'Profile view',
    description: 'Kenji Tanaka viewed your profile',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 264), // 11 days ago
    userId: 'user-8'
  },
  {
    id: '17',
    type: 'crew',
    title: 'Photo gallery updated',
    description: 'Tech Enthusiasts added 5 new photos',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 288), // 12 days ago
    crewId: 'crew-2'
  }
]
