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
  }
]
