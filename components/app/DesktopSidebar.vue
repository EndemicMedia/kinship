<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const authStore = useAuthStore()
const uiStore = useUIStore()

const navItems = [
  { icon: 'i-heroicons-home', label: t('commandPalette.dashboard'), to: '/app', shortcut: 'D' },
  { icon: 'i-heroicons-magnifying-glass', label: t('commandPalette.theCompass'), to: '/app/compass', shortcut: 'C' },
  { icon: 'i-heroicons-users', label: t('commandPalette.myCrews'), to: '/app/crews', shortcut: 'M' },
  { icon: 'i-heroicons-folder', label: t('commandPalette.legal'), to: '/app/legal', shortcut: 'L' },
  { icon: 'i-heroicons-user', label: t('commandPalette.profile'), to: '/app/profile', shortcut: 'P' }
]

const isCollapsed = computed({
  get: () => uiStore.sidebarCollapsed,
  set: (value) => {
    uiStore.sidebarCollapsed = value
  }
})

function toggleCollapse() {
  uiStore.toggleSidebarCollapse()
}
</script>

<template>
  <aside 
    class="bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen transition-all duration-300"
    :class="isCollapsed ? 'w-16' : 'w-64'"
  >
    <!-- Logo -->
    <div 
      class="border-b border-slate-200 dark:border-slate-800 flex items-center"
      :class="isCollapsed ? 'justify-center h-16 px-2' : 'justify-between px-6 py-5'"
    >
      <NuxtLink to="/app" class="flex items-center gap-3 overflow-hidden">
        <img src="/logo.png" alt="Kinship" class="h-8 w-8 flex-shrink-0" />
        <span 
          v-if="!isCollapsed" 
          class="text-xl font-semibold text-slate-900 dark:text-white whitespace-nowrap transition-opacity duration-300"
        >
          Kinship
        </span>
      </NuxtLink>
      
      <UButton
        v-if="!isCollapsed"
        icon="i-heroicons-chevron-left"
        variant="ghost"
        color="neutral"
        size="xs"
        class="hidden lg:flex"
        @click="toggleCollapse"
      />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 py-4 space-y-1 overflow-y-auto">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center mx-2 rounded-lg text-sm font-medium transition-all duration-200 group relative"
        :class="[
          isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
          route.path === item.to 
            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' 
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
        ]"
      >
        <UIcon :name="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed" class="truncate">{{ item.label }}</span>
        
        <!-- Tooltip for collapsed state -->
        <div 
          v-if="isCollapsed"
          class="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-50"
        >
          {{ item.label }}
          <span class="text-slate-400 dark:text-slate-500 ml-1">{{ item.shortcut }}</span>
        </div>
      </NuxtLink>
    </nav>

    <!-- Collapse Button (when collapsed) -->
    <div 
      v-if="isCollapsed" 
      class="p-2 border-t border-slate-200 dark:border-slate-800"
    >
      <UButton
        icon="i-heroicons-chevron-right"
        variant="ghost"
        color="neutral"
        block
        @click="toggleCollapse"
      />
    </div>

    <!-- User Menu -->
    <div 
      class="border-t border-slate-200 dark:border-slate-800"
      :class="isCollapsed ? 'p-2' : 'p-4'"
    >
      <div 
        class="flex items-center gap-3"
        :class="isCollapsed ? 'justify-center' : ''"
      >
        <UAvatar
          :src="authStore.currentUser?.avatar"
          :alt="authStore.currentUser?.name"
          size="md"
          class="flex-shrink-0"
        />
        <div v-if="!isCollapsed" class="flex-1 min-w-0 overflow-hidden">
          <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
            {{ authStore.currentUser?.name }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 truncate">
            {{ authStore.currentUser?.email }}
          </p>
        </div>
        <UButton
          v-if="!isCollapsed"
          icon="i-heroicons-arrow-right-on-rectangle"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="authStore.logout()"
        />
      </div>
    </div>
  </aside>
</template>
