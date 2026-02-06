<script setup lang="ts">
const route = useRoute()
const authStore = useAuthStore()
const uiStore = useUIStore()

const showNotifications = ref(false)

// Breadcrumb mapping
const breadcrumbs = computed(() => {
  const path = route.path
  const crumbs = []
  
  // Always start with Dashboard
  crumbs.push({ label: 'Dashboard', to: '/app' })
  
  if (path.includes('/crews')) {
    crumbs.push({ label: 'My Crews', to: '/app/crews' })
    if (path.includes('/detail')) {
      crumbs.push({ label: 'Crew Details', to: route.path })
    }
  } else if (path.includes('/compass')) {
    crumbs.push({ label: 'The Compass', to: '/app/compass' })
  } else if (path.includes('/legal')) {
    crumbs.push({ label: 'Legal', to: '/app/legal' })
  } else if (path.includes('/profile')) {
    crumbs.push({ label: 'Profile', to: '/app/profile' })
  }
  
  return crumbs
})

// Page title based on route
const pageTitle = computed(() => {
  const path = route.path
  if (path === '/app') return 'Dashboard'
  if (path.includes('/crews/detail')) return 'Crew Details'
  if (path.includes('/crews')) return 'My Crews'
  if (path.includes('/compass')) return 'The Compass'
  if (path.includes('/legal')) return 'Legal'
  if (path.includes('/profile')) return 'Profile'
  return 'Kinship'
})
</script>

<template>
  <header class="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 sticky top-0 z-40">
    <div class="flex items-center justify-between gap-4">
      <!-- Left: Breadcrumbs & Title -->
      <div class="flex flex-col min-w-0">
        <!-- Breadcrumbs (hidden on mobile) -->
        <nav class="hidden md:flex items-center gap-2 text-sm text-slate-500 mb-1">
          <template v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
            <NuxtLink 
              v-if="index < breadcrumbs.length - 1"
              :to="crumb.to"
              class="hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              {{ crumb.label }}
            </NuxtLink>
            <span v-else class="text-slate-900 dark:text-white font-medium">
              {{ crumb.label }}
            </span>
            <UIcon 
              v-if="index < breadcrumbs.length - 1" 
              name="i-heroicons-chevron-right" 
              class="w-4 h-4" 
            />
          </template>
        </nav>
        
        <!-- Page Title -->
        <h1 class="text-xl font-semibold text-slate-900 dark:text-white truncate">
          {{ pageTitle }}
        </h1>
      </div>

      <!-- Right Actions -->
      <div class="flex items-center gap-2">
        <!-- Search (hidden on mobile) -->
        <div class="hidden md:block w-64">
          <AppCommandPalette />
        </div>

        <!-- Mobile Search Trigger -->
        <UButton
          icon="i-heroicons-magnifying-glass"
          variant="ghost"
          color="neutral"
          class="md:hidden"
          @click="isSearchOpen = true"
        />

        <!-- Notifications -->
        <UDropdown
          v-model:open="showNotifications"
          :items="uiStore.notifications.map(n => [{
            label: n.title,
            icon: n.type === 'match' ? 'i-heroicons-heart' : 
                  n.type === 'message' ? 'i-heroicons-chat-bubble-left' :
                  n.type === 'document' ? 'i-heroicons-document' :
                  n.type === 'checkin' ? 'i-heroicons-calendar' : 'i-heroicons-exclamation-triangle',
            click: () => uiStore.markAsRead(n.id)
          }])"
        >
          <UButton
            icon="i-heroicons-bell"
            color="neutral"
            variant="ghost"
            :badge="uiStore.unreadCount > 0 ? uiStore.unreadCount.toString() : undefined"
            badge-color="error"
          />
        </UDropdown>

        <!-- Dark Mode Toggle -->
        <UButton
          icon="i-heroicons-moon"
          color="neutral"
          variant="ghost"
          class="hidden sm:flex"
          @click="toggleDarkMode"
        />

        <!-- User Avatar -->
        <UDropdown
          :items="[
            [{ label: 'Profile', icon: 'i-heroicons-user', to: '/app/profile' }],
            [{ label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '/app/settings' }],
            [{ label: 'Logout', icon: 'i-heroicons-arrow-right-on-rectangle', click: () => authStore.logout() }]
          ]"
        >
          <UAvatar
            :src="authStore.currentUser?.avatar"
            :alt="authStore.currentUser?.name"
            size="sm"
            class="cursor-pointer ring-2 ring-slate-200 dark:ring-slate-700"
          />
        </UDropdown>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
// Separate script for toggleDarkMode function
const colorMode = useColorMode()

function toggleDarkMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const isSearchOpen = ref(false)
</script>
