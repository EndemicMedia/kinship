<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import type { Activity } from '~/stores/ui'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { t } = useI18n()
const localePath = useLocalePath()
const uiStore = useUIStore()

const activityLinks: Record<Activity['type'], string> = {
  crew: '/app/crews',
  document: '/app/legal',
  member: '/app/crews',
  message: '/app/crews',
  milestone: '/app/crews'
}

function activityUrl(activity: Activity): string {
  return activity.crewId
    ? `/app/crews/detail?id=${encodeURIComponent(activity.crewId)}`
    : activityLinks[activity.type]
}
</script>

<template>
  <section class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('activity.recentActivity') }}</h1>
      <p class="mt-1 text-slate-600 dark:text-slate-400">{{ t('showcase.activity.subtitle') }}</p>
    </div>

    <UCard>
      <ul v-if="uiStore.activities.length" class="divide-y divide-slate-100 dark:divide-slate-800">
        <li v-for="activity in uiStore.activities" :key="activity.id">
          <NuxtLink
            :to="localePath(activityUrl(activity))"
            class="flex items-start gap-4 rounded-lg py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500"
          >
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
              <UIcon :name="activity.type === 'document' ? 'i-heroicons-document-text' : activity.type === 'message' ? 'i-heroicons-chat-bubble-left' : activity.type === 'milestone' ? 'i-heroicons-trophy' : 'i-heroicons-user-group'" class="h-5 w-5" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="block font-medium text-slate-900 dark:text-white">{{ activity.title }}</span>
              <span class="mt-1 block text-sm text-slate-600 dark:text-slate-400">{{ activity.description }}</span>
            </span>
            <time class="shrink-0 text-xs text-slate-400" :datetime="new Date(activity.timestamp).toISOString()">
              {{ formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }) }}
            </time>
          </NuxtLink>
        </li>
      </ul>
      <div v-else class="py-10 text-center text-slate-500">{{ t('activity.noRecentActivity') }}</div>
    </UCard>
  </section>
</template>
