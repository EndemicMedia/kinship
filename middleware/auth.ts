import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  
  // On client, always ensure auth is loaded from storage
  // This is safe to call multiple times as it only sets state if localStorage has data
  if (process.client) {
    await authStore.loadFromStorage()
  }
  
  // If not authenticated and trying to access app routes
  if (!authStore.isAuthenticated && to.path.startsWith('/app') && to.path !== '/app/login') {
    return navigateTo('/app/login')
  }
  
  // If authenticated and on login page, redirect to dashboard
  if (authStore.isAuthenticated && to.path === '/app/login') {
    return navigateTo('/app')
  }
})
