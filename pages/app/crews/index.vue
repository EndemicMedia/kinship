<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const authStore = useAuthStore()
const crewsStore = useCrewsStore()

const userCrews = computed(() => {
  if (!authStore.currentUser) return []
  return crewsStore.userCrews(authStore.currentUser.id)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">My Crews</h1>
      <UButton to="/app/compass" color="primary" icon="i-heroicons-plus">
        Find Crews
      </UButton>
    </div>

    <div v-if="userCrews.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-users" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
      <h2 class="text-lg font-medium text-slate-900 dark:text-white mb-2">No crews yet</h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">Browse The Compass to find your perfect parenting crew</p>
      <UButton to="/app/compass" color="primary">Browse The Compass</UButton>
    </div>

    <div v-else class="grid gap-4">
      <UCard
        v-for="crew in userCrews"
        :key="crew.id"
        class="cursor-pointer hover:shadow-md transition-shadow"
      >
        <NuxtLink :to="`/app/crews/detail?id=${crew.id}`" class="block">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ crew.name }}</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">{{ crew.description }}</p>
              
              <div class="flex items-center gap-2 mt-3">
                <span class="text-sm text-slate-500">{{ crew.members.length }} members</span>
              </div>
            </div>
            
            <UBadge 
              :color="crew.status === 'active' ? 'success' : 'warning'"
              variant="soft"
            >
              {{ crew.status }}
            </UBadge>
          </div>

          <div class="mt-4">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-slate-600 dark:text-slate-400">Formation Progress</span>
              <span class="font-medium">{{ crew.formationProgress }}%</span>
            </div>
            <UProgress :value="crew.formationProgress" color="primary" />
          </div>
        </NuxtLink>
      </UCard>
    </div>
  </div>
</template>
