<script setup lang="ts">
const route = useRoute()

const navItems = [
  { icon: 'i-heroicons-home', label: 'Home', to: '/app' },
  { icon: 'i-heroicons-magnifying-glass', label: 'Compass', to: '/app/compass' },
  { icon: 'i-heroicons-users', label: 'Crews', to: '/app/crews' },
  { icon: 'i-heroicons-folder', label: 'Legal', to: '/app/legal' },
  { icon: 'i-heroicons-user', label: 'Profile', to: '/app/profile' }
]
</script>

<template>
  <nav class="mobile-nav">
    <div class="flex justify-around items-center h-16 px-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center justify-center flex-1 py-2 text-xs font-medium transition-all duration-200 rounded-lg mx-1"
        :class="route.path === item.to 
          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'"
        active-class=""
      >
        <div class="relative">
          <UIcon :name="item.icon" class="w-6 h-6 mb-1" />
          <!-- Active indicator dot -->
          <div 
            v-if="route.path === item.to"
            class="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500"
          />
        </div>
        <span class="text-[10px] font-medium">{{ item.label }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
.mobile-nav {
  @apply fixed bottom-0 left-0 right-0 z-50;
  @apply bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg;
  @apply border-t border-slate-200 dark:border-slate-800;
  padding-bottom: env(safe-area-inset-bottom);
}

/* iOS Safe Area Support */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .mobile-nav {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
