<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const uiStore = useUIStore()

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
    <ToastContainer />

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
        <div class="p-6">
          <slot />
        </div>
      </main>
    </div>
    
    <!-- Main content area for mobile -->
    <main v-if="isMobile" class="pb-24 pt-4 px-4">
      <slot />
    </main>
  </div>
</template>
