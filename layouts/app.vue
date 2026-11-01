<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const uiStore = useUIStore()
const { t } = useI18n()

const isMobile = ref(false)

// Check if mobile on mount and on resize
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

// Compute sidebar width based on collapsed state
const sidebarWidth = computed(() => {
  if (isMobile.value) return '0px'
  return uiStore.sidebarCollapsed ? '64px' : '256px'
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950">
    <!-- Toast Notifications -->
    <AppToastContainer />

    <!-- Mobile Bottom Navigation -->
    <AppMobileNav v-if="isMobile" />
    
    <!-- Desktop Sidebar -->
    <div v-else class="flex">
      <AppDesktopSidebar 
        class="fixed h-screen z-30 transition-all duration-300"
        :style="{ width: sidebarWidth }"
      />
      
      <main 
        class="flex-1 min-h-screen transition-all duration-300"
        :style="{ marginLeft: sidebarWidth }"
      >
        <AppHeader />
        <div class="space-y-4 p-6">
          <UAlert
            v-if="authStore.storageError"
            color="amber"
            variant="soft"
            icon="i-heroicons-exclamation-triangle"
            :title="t('showcase.auth.storageErrorTitle')"
            :description="t(`showcase.auth.storageErrors.${authStore.storageError}`)"
            role="alert"
          >
            <template #actions>
              <UButton size="xs" color="gray" variant="ghost" @click="authStore.clearStorageError()">{{ t('showcase.auth.dismiss') }}</UButton>
            </template>
          </UAlert>
          <slot />
        </div>
      </main>
    </div>
    
    <!-- Main content area for mobile -->
    <main v-if="isMobile" class="relative z-0 px-4 pb-24 pt-4">
      <AppHeader class="mb-4" />
      <div class="space-y-4">
        <UAlert
          v-if="authStore.storageError"
          color="amber"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          :title="t('showcase.auth.storageErrorTitle')"
          :description="t(`showcase.auth.storageErrors.${authStore.storageError}`)"
          role="alert"
        >
          <template #actions>
            <UButton size="xs" color="gray" variant="ghost" @click="authStore.clearStorageError()">{{ t('showcase.auth.dismiss') }}</UButton>
          </template>
        </UAlert>
        <slot />
      </div>
    </main>
  </div>
</template>
