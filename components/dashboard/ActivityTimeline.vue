<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import type { Activity } from '~/stores/ui'
const { t } = useI18n()
const localePath = useLocalePath()
const uiStore = useUIStore()

const activityTypeConfig: Record<Activity['type'], { icon: string; color: string; label: string }> = {
  crew: {
    icon: 'i-heroicons-user-group',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    label: t('activity.type.crew')
  },
  document: {
    icon: 'i-heroicons-document-text',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    label: t('activity.type.document')
  },
  member: {
    icon: 'i-heroicons-user-plus',
    color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    label: t('activity.type.member')
  },
  message: {
    icon: 'i-heroicons-chat-bubble-left',
    color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    label: t('activity.type.message')
  },
  milestone: {
    icon: 'i-heroicons-trophy',
    color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
    label: t('activity.type.milestone')
  }
}

function formatTime(date: Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

function activityUrl(activity: Activity): string {
  if (activity.crewId) return `/app/crews/detail?id=${encodeURIComponent(activity.crewId)}`
  if (activity.type === 'document') return '/app/legal'
  if (activity.type === 'crew' || activity.type === 'member' || activity.type === 'message') return '/app/crews'
  return '/app/activity'
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-lg">{{ t('activity.recentActivity') }}</h3>
        <UButton 
          :to="localePath('/app/activity')"
          variant="link" 
          color="primary"
          size="sm"
          trailing-icon="i-heroicons-arrow-right"
        >
          {{ t('activity.viewAll') }}
        </UButton>
      </div>
    </template>

    <div class="space-y-4">
      <NuxtLink
        v-for="activity in uiStore.recentActivities" 
        :key="activity.id"
        :to="localePath(activityUrl(activity))"
        class="group -mx-4 flex gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 dark:hover:bg-slate-800/50"
        :aria-label="`${activity.title}: ${activity.description}`"
      >
        <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          :class="activityTypeConfig[activity.type].color">
          <UIcon :name="activityTypeConfig[activity.type].icon" class="w-5 h-5" />
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="font-medium text-slate-900 dark:text-white text-sm">
                {{ activity.title }}
              </p>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {{ activity.description }}
              </p>
            </div>
            <span class="text-xs text-slate-400 whitespace-nowrap">
              {{ formatTime(activity.timestamp) }}
            </span>
          </div>
        </div>
      </NuxtLink>

      <!-- Empty State -->
      <div v-if="uiStore.recentActivities.length === 0" class="text-center py-8">
        <UIcon name="i-heroicons-clock" class="w-12 h-12 mx-auto text-slate-300 mb-3" />
        <p class="text-slate-500 text-sm">{{ t('activity.noRecentActivity') }}</p>
      </div>
    </div>
  </UCard>
</template>
