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
    notifications: [],
    toasts: [],
    activities: [],
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
