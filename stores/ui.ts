import { defineStore } from 'pinia'

interface UIState {
  sidebarOpen: boolean
  activeModal: string | null
  notifications: Notification[]
  toasts: Toast[]
  activities: Activity[]
  sidebarCollapsed: boolean
}

interface Notification {
  id: string
  type: 'match' | 'message' | 'document' | 'checkin' | 'incident'
  title: string
  message: string
  read: boolean
  timestamp: Date
}

interface Toast {
  id: number
  title: string
  description?: string
  color: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  dismissed: boolean
}

interface Activity {
  id: string
  type: 'crew' | 'document' | 'member' | 'message' | 'milestone'
  title: string
  description: string
  timestamp: Date
  userId?: string
  crewId?: string
  metadata?: Record<string, any>
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    sidebarOpen: false,
    activeModal: null,
    notifications: [
      {
        id: 'notif-1',
        type: 'match',
        title: 'New Match Found',
        message: 'You have a 92% match with Sofia Rossi',
        read: false,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: 'notif-2',
        type: 'message',
        title: 'New Message',
        message: 'Marcus Chen sent you a message in Care Team',
        read: false,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
      },
      {
        id: 'notif-3',
        type: 'document',
        title: 'Document Signed',
        message: 'Co-Parenting Agreement has been signed by all parties',
        read: true,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      }
    ],
    toasts: [],
    activities: [
      {
        id: 'activity-1',
        type: 'crew',
        title: 'Joined Care Team',
        description: 'You became a member of the Care Team crew',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        id: 'activity-2',
        type: 'document',
        title: 'Created Document',
        description: 'Co-Parenting Agreement was created',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        id: 'activity-3',
        type: 'member',
        title: 'New Member Added',
        description: 'Marcus Chen joined your crew',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
      },
      {
        id: 'activity-4',
        type: 'milestone',
        title: 'Formation Complete',
        description: 'Care Team reached 100% formation progress',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
      }
    ],
    sidebarCollapsed: false
  }),

  getters: {
    unreadCount: (state) => state.notifications.filter(n => !n.read).length,
    unreadNotifications: (state) => state.notifications.filter(n => !n.read),
    recentActivities: (state) => state.activities.slice(0, 10)
  },

  actions: {
    toggleSidebar(): void {
      this.sidebarOpen = !this.sidebarOpen
    },

    openModal(modalId: string): void {
      this.activeModal = modalId
    },

    closeModal(): void {
      this.activeModal = null
    },

    addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): void {
      this.notifications.unshift({
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date()
      })
    },

    markAsRead(notificationId: string): void {
      const notification = this.notifications.find(n => n.id === notificationId)
      if (notification) {
        notification.read = true
      }
    },

    markAllAsRead(): void {
      this.notifications.forEach(n => n.read = true)
    },

    clearNotifications(): void {
      this.notifications = []
    },

    // Toast notifications
    showToast(toast: Omit<Toast, 'id' | 'dismissed'>): void {
      const id = Date.now()
      this.toasts.push({
        ...toast,
        id,
        dismissed: false
      })
    },

    dismissToast(toastId: number): void {
      const toast = this.toasts.find(t => t.id === toastId)
      if (toast) {
        toast.dismissed = true
      }
    },

    clearToasts(): void {
      this.toasts = []
    },

    // Activity tracking
    addActivity(activity: Omit<Activity, 'id' | 'timestamp'>): void {
      this.activities.unshift({
        ...activity,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date()
      })
    },

    toggleSidebarCollapse(): void {
      this.sidebarCollapsed = !this.sidebarCollapsed
    }
  }
})
