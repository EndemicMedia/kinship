<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const authStore = useAuthStore()
const crewsStore = useCrewsStore()
const uiStore = useUIStore()

// Loading state
const isLoading = ref(true)

// Import helper function
import { getUserById } from '~/data/mock-users'

// Get user's crews
const userCrews = computed(() => {
  if (!authStore.currentUser) return []
  return crewsStore.userCrews(authStore.currentUser.id)
})

// Stats data
const stats = computed(() => [
  {
    label: 'Active Crews',
    value: userCrews.value.length,
    icon: 'i-heroicons-user-group',
    trend: 25,
    iconColor: 'text-blue-600 dark:text-blue-400',
    iconBgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    label: 'Total Members',
    value: userCrews.value.reduce((acc, crew) => acc + crew.members.length, 0),
    icon: 'i-heroicons-users',
    trend: 12,
    iconColor: 'text-green-600 dark:text-green-400',
    iconBgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    label: 'Documents',
    value: 8,
    icon: 'i-heroicons-document-text',
    trend: -5,
    iconColor: 'text-purple-600 dark:text-purple-400',
    iconBgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    label: 'Formation Progress',
    value: `${Math.round(userCrews.value.reduce((acc, crew) => acc + crew.formationProgress, 0) / (userCrews.value.length || 1))}%`,
    icon: 'i-heroicons-chart-bar',
    trend: 8,
    iconColor: 'text-orange-600 dark:text-orange-400',
    iconBgColor: 'bg-orange-50 dark:bg-orange-900/20'
  }
])

// Quick actions with enhanced design
const quickActions = [
  { 
    icon: 'i-heroicons-magnifying-glass', 
    label: 'Browse Compass', 
    to: '/app/compass', 
    color: 'primary',
    description: 'Find new crews'
  },
  { 
    icon: 'i-heroicons-users', 
    label: 'View Crews', 
    to: '/app/crews', 
    color: 'neutral',
    description: 'Manage your crews'
  },
  { 
    icon: 'i-heroicons-chat-bubble-left', 
    label: 'Messages', 
    to: '/app/crews', 
    color: 'neutral',
    description: 'Check messages'
  },
  { 
    icon: 'i-heroicons-document-text', 
    label: 'Documents', 
    to: '/app/legal', 
    color: 'neutral',
    description: 'View legal docs'
  }
]

// Simulate loading
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
    
    // Show welcome toast
    uiStore.showToast({
      title: `Welcome back, ${authStore.currentUser?.name.split(' ')[0]}!`,
      description: 'You have no new notifications',
      color: 'info'
    })
  }, 1000)
})

// Show empty state when no crews
const showEmptyState = computed(() => !isLoading.value && userCrews.value.length === 0)
</script>

<template>
  <div class="space-y-8">
    <!-- Loading State -->
    <DashboardSkeleton v-if="isLoading" />

    <template v-else>
      <!-- Welcome Section -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, {{ authStore.currentUser?.name.split(' ')[0] }}! 👋
          </h1>
          <p class="text-slate-600 dark:text-slate-400 mt-2">
            Here's what's happening with your crews today.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <UButton
            to="/app/crews"
            color="primary"
            icon="i-heroicons-plus"
          >
            Create Crew
          </UButton>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardStatCard
          v-for="stat in stats"
          :key="stat.label"
          :label="stat.label"
          :value="stat.value"
          :icon="stat.icon"
          :trend="stat.trend"
          :icon-color="stat.iconColor"
          :icon-bg-color="stat.iconBgColor"
        />
      </div>

      <!-- Quick Actions -->
      <section>
        <h2 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <NuxtLink
            v-for="action in quickActions"
            :key="action.to"
            :to="action.to"
            class="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all duration-300 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700"
          >
            <!-- Hover background effect -->
            <div 
              class="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            
            <div class="relative">
              <div 
                class="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                :class="action.color === 'primary' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 group-hover:text-primary-600 dark:group-hover:text-primary-400'"
              >
                <UIcon :name="action.icon" class="w-6 h-6" />
              </div>
              <h3 class="font-semibold text-slate-900 dark:text-white mb-1">{{ action.label }}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ action.description }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Active Crews (2/3 width) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-slate-900 dark:text-white">Your Crews</h2>
            <UButton 
              to="/app/crews" 
              variant="link" 
              color="primary"
              trailing-icon="i-heroicons-arrow-right"
            >
              View All
            </UButton>
          </div>

          <!-- Empty State -->
          <AppEmptyState
            v-if="showEmptyState"
            icon="i-heroicons-users"
            title="No crews yet"
            description="You haven't joined any crews yet. Browse The Compass to find families that match your values."
            :action="{ label: 'Browse The Compass', to: '/app/compass', icon: 'i-heroicons-magnifying-glass' }"
          />

          <!-- Crew Cards -->
          <div v-else class="space-y-4">
            <UCard
              v-for="crew in userCrews.slice(0, 3)"
              :key="crew.id"
              class="group cursor-pointer hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-700"
              @click="$router.push(`/app/crews/detail?id=${crew.id}`)"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {{ crew.name }}
                    </h3>
                    <UBadge 
                      :color="crew.status === 'active' ? 'success' : 'warning'" 
                      variant="soft"
                      size="sm"
                    >
                      {{ crew.status }}
                    </UBadge>
                  </div>
                  
                  <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {{ crew.description }}
                  </p>
                  
                  <div class="flex items-center gap-4">
                    <UAvatarGroup :max="3" size="sm">
                      <UAvatar
                        v-for="member in crew.members.slice(0, 4)"
                        :key="member.userId"
                        :src="getUserById(member.userId)?.avatar"
                        :alt="getUserById(member.userId)?.name"
                        size="sm"
                      />
                    </UAvatarGroup>
                    <span class="text-sm text-slate-500">
                      {{ crew.members.length }} members
                    </span>
                  </div>
                </div>

                <UButton
                  icon="i-heroicons-chevron-right"
                  variant="ghost"
                  color="neutral"
                  class="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              <!-- Progress Bar -->
              <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div class="flex items-center justify-between text-sm mb-2">
                  <span class="text-slate-600 dark:text-slate-400">Formation Progress</span>
                  <span class="font-medium text-slate-900 dark:text-white">{{ crew.formationProgress }}%</span>
                </div>
                <UProgress 
                  :value="crew.formationProgress" 
                  color="primary"
                  size="sm"
                />
              </div>
            </UCard>
          </div>
        </div>

        <!-- Activity Timeline (1/3 width) -->
        <div>
          <DashboardActivityTimeline />
        </div>
      </div>
    </template>
  </div>
</template>