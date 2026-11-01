import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const localePath = useLocalePath()
  const isShowcaseRoute = /^\/(?:(?:de|pt-BR)\/)?app(?:\/|$)/.test(to.path)
  const loginPath = localePath('/app/login')

  if (!isShowcaseRoute) return

  // The mock session exists only in this browser; never gate the server render on it.
  if (process.client && !authStore.hasRestored) {
    await authStore.loadFromStorage()
  }

  if (process.client && !authStore.isLoggedIn && to.path !== loginPath) {
    return navigateTo(loginPath)
  }

  if (process.client && authStore.isLoggedIn && to.path === loginPath) {
    return navigateTo(localePath('/app'))
  }
})
