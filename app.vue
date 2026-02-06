<script setup lang="ts">
import { mockActivities } from '~/data/mock-activities'

const { locale } = useI18n()
const uiStore = useUIStore()

useHead({
  htmlAttrs: {
    lang: locale
  }
})

// Initialize activities on app start
onMounted(() => {
  // Load mock activities if store is empty
  if (uiStore.activities.length === 0) {
    mockActivities.forEach(activity => {
      uiStore.activities.push(activity)
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
