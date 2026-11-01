<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const uiStore = useUIStore()
const colorMode = useColorMode()
const showNotifications = ref(false)
const isSearchOpen = ref(false)

const breadcrumbs = computed(() => {
  const path = route.path
  const crumbs = [{ label: t('commandPalette.dashboard'), to: '/app' }]

  if (path.includes('/crews')) {
    crumbs.push({ label: t('commandPalette.myCrews'), to: '/app/crews' })
    if (path.includes('/detail')) crumbs.push({ label: t('crewsPage.crewDetails'), to: route.path })
  } else if (path.includes('/compass')) {
    crumbs.push({ label: t('commandPalette.theCompass'), to: '/app/compass' })
  } else if (path.includes('/legal')) {
    crumbs.push({ label: t('commandPalette.legal'), to: '/app/legal' })
  } else if (path.includes('/profile')) {
    crumbs.push({ label: t('commandPalette.profile'), to: '/app/profile' })
  } else if (path.includes('/settings')) {
    crumbs.push({ label: t('settings.title'), to: '/app/settings' })
  } else if (path.includes('/activity')) {
    crumbs.push({ label: t('activity.recentActivity'), to: '/app/activity' })
  }
  return crumbs
})

const pageTitle = computed(() => {
  const path = route.path
  if (path === localePath('/app')) return t('commandPalette.dashboard')
  if (path.includes('/crews/detail')) return t('crewsPage.crewDetails')
  if (path.includes('/crews')) return t('commandPalette.myCrews')
  if (path.includes('/compass')) return t('commandPalette.theCompass')
  if (path.includes('/legal')) return t('commandPalette.legal')
  if (path.includes('/profile')) return t('commandPalette.profile')
  if (path.includes('/settings')) return t('settings.title')
  if (path.includes('/activity')) return t('activity.recentActivity')
  return 'Kinship'
})

const notificationItems = computed(() => {
  if (uiStore.notifications.length === 0) {
    return [[{ label: t('showcase.notifications.empty'), disabled: true }]]
  }
  return uiStore.notifications.map(notification => [{
    label: `${notification.read ? '' : '• '}${notification.title}`,
    description: notification.message,
    icon: notification.type === 'match' ? 'i-heroicons-heart'
      : notification.type === 'message' ? 'i-heroicons-chat-bubble-left'
        : notification.type === 'document' ? 'i-heroicons-document'
          : notification.type === 'checkin' ? 'i-heroicons-calendar'
            : 'i-heroicons-exclamation-triangle',
    click: () => openNotification(notification)
  }])
})

function openNotification(notification: (typeof uiStore.notifications)[number]) {
  uiStore.markAsRead(notification.id)
  const fallbackRoutes = {
    match: '/app/compass',
    message: '/app/crews',
    document: '/app/legal',
    checkin: '/app/crews',
    incident: '/app/crews'
  } as const
  showNotifications.value = false
  navigateTo(localePath(notification.actionUrl || fallbackRoutes[notification.type]))
}

function toggleDarkMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

async function logout() {
  authStore.logout()
  await router.push(localePath('/app/login'))
}
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-6 sm:py-4">
    <div class="flex items-center justify-between gap-2 sm:gap-4">
      <div class="flex min-w-0 flex-col">
        <nav class="mb-1 hidden items-center gap-2 text-sm text-slate-500 md:flex">
          <template v-for="(crumb, index) in breadcrumbs" :key="crumb.to">
            <NuxtLink v-if="index < breadcrumbs.length - 1" :to="localePath(crumb.to)" class="transition-colors hover:text-slate-700 dark:hover:text-slate-300">{{ crumb.label }}</NuxtLink>
            <span v-else class="font-medium text-slate-900 dark:text-white">{{ crumb.label }}</span>
            <UIcon v-if="index < breadcrumbs.length - 1" name="i-heroicons-chevron-right" class="h-4 w-4" />
          </template>
        </nav>
        <p class="truncate text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">{{ pageTitle }}</p>
      </div>

      <div class="flex shrink-0 items-center gap-1 sm:gap-2">
        <AppCommandPalette v-model:open="isSearchOpen" />
        <UButton
          :aria-label="t('showcase.header.search')"
          icon="i-heroicons-magnifying-glass"
          variant="ghost"
          color="gray"
          class="md:hidden"
          @click="isSearchOpen = true"
        />
        <UDropdown v-model:open="showNotifications" :items="notificationItems">
          <span class="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <UIcon name="i-heroicons-bell" class="h-5 w-5" aria-hidden="true" />
            <span v-if="uiStore.unreadCount > 0" class="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white" aria-hidden="true">{{ uiStore.unreadCount }}</span>
            <span class="sr-only">{{ t('showcase.header.notifications', { count: uiStore.unreadCount }) }}</span>
          </span>
        </UDropdown>
        <UButton
          :aria-label="t('showcase.header.toggleTheme')"
          :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          color="gray"
          variant="ghost"
          @click="toggleDarkMode"
        />
        <UDropdown
          :items="[
            [{ label: t('commandPalette.profile'), icon: 'i-heroicons-user', to: localePath('/app/profile') }],
            [{ label: t('settings.title'), icon: 'i-heroicons-cog-6-tooth', to: localePath('/app/settings') }],
            [{ label: t('showcase.header.logout'), icon: 'i-heroicons-arrow-right-on-rectangle', click: logout }]
          ]"
        >
          <span class="inline-flex items-center rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800">
            <UAvatar :src="authStore.currentUser?.avatar" :alt="authStore.currentUser?.name" size="sm" aria-hidden="true" />
            <span class="sr-only">{{ t('showcase.header.account', { name: authStore.currentUser?.name ?? '' }) }}</span>
          </span>
        </UDropdown>
      </div>
    </div>
  </header>
</template>
