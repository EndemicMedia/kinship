<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { t } = useI18n()
const localePath = useLocalePath()

const url = 'https://endemicmedia.github.io/kinship/app/crews'

useSeoMeta({
  title: () => t('seo.app.crews.title'),
  description: () => t('seo.app.crews.description'),
  ogTitle: () => t('seo.app.crews.title'),
  ogDescription: () => t('seo.app.crews.description'),
  ogType: 'website',
  ogUrl: url,
  twitterTitle: () => t('seo.app.crews.title'),
  twitterDescription: () => t('seo.app.crews.description'),
  twitterCard: 'summary',
})

useHead(() => ({
  link: [
    { rel: 'canonical', href: url }
  ]
}))

const authStore = useAuthStore()
const crewsStore = useCrewsStore()
const discovery = ref(false)
const joinedCrewId = ref('')
const availableCrews = computed(() => crewsStore.crews.filter(crew =>
  crew.status !== 'dissolved' && !crew.members.some(member => member.userId === authStore.currentUser?.id)
))
function joinCrew(crewId: string, request: boolean) {
  if (authStore.currentUser && crewsStore.joinCrew(crewId, authStore.currentUser, request)) joinedCrewId.value = crewId
}

const userCrews = computed(() => {
  if (!authStore.currentUser) return []
  return crewsStore.userCrews(authStore.currentUser.id)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('crewsPage.myCrews') }}</h1>
      <div class="flex flex-wrap gap-2">
        <UButton variant="soft" icon="i-heroicons-magnifying-glass" @click="discovery = !discovery">{{ t('crewsPage.findCrews') }}</UButton>
        <UButton :to="localePath('/app/crews/create')" icon="i-heroicons-plus">{{ t('showcase.crews.create') }}</UButton>
      </div>
    </div>

    <UCard v-if="discovery">
      <template #header><h2 class="font-semibold">{{ t('showcase.crews.discover') }}</h2></template>
      <p v-if="joinedCrewId" role="status" class="mb-4 text-teal-600">{{ t('showcase.crews.membershipUpdated') }}</p>
      <p v-if="!availableCrews.length" class="text-slate-500">{{ t('showcase.crews.noAvailable') }}</p>
      <div class="space-y-4">
        <div v-for="crew in availableCrews" :key="crew.id" class="rounded-lg border p-4 space-y-3">
          <NuxtLink :to="localePath(`/app/crews/detail?id=${encodeURIComponent(crew.id)}`)" class="font-semibold">{{ crew.name }}</NuxtLink>
          <p class="text-sm text-slate-500">{{ crew.description }}</p>
          <UButton @click="joinCrew(crew.id, crew.status === 'active')">
            {{ t(crew.status === 'active' ? 'showcase.crews.request' : 'showcase.crews.join') }}
          </UButton>
        </div>
      </div>
    </UCard>

    <div v-if="userCrews.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-users" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
      <h2 class="text-lg font-medium text-slate-900 dark:text-white mb-2">{{ t('crewsPage.noCrewsYet') }}</h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">{{ t('crewsPage.browseCompassSubtitle') }}</p>
      <UButton color="primary" @click="discovery = true">{{ t('crewsPage.findCrews') }}</UButton>
    </div>

    <div v-else class="grid gap-4">
      <UCard
        v-for="crew in userCrews"
        :key="crew.id"
        class="cursor-pointer hover:shadow-md transition-shadow"
      >
        <NuxtLink :to="localePath(`/app/crews/detail?id=${encodeURIComponent(crew.id)}`)" class="block">
          <div class="flex flex-wrap items-start justify-between gap-2">
            <div class="min-w-0 flex-1">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ crew.name }}</h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm mt-1">{{ crew.description }}</p>
              
              <div class="mt-3 flex flex-wrap items-center gap-2">
                <span class="text-sm text-slate-500">{{ crew.members.length }} {{ t('commandPalette.members') }}</span>
                <UBadge v-if="crew.members.find(member => member.userId === authStore.currentUser?.id)?.status === 'pending'" color="amber" variant="soft">{{ t('showcase.crews.requested') }}</UBadge>
              </div>
            </div>
            
            <UBadge 
              :color="crew.status === 'active' ? 'emerald' : 'amber'"
              variant="soft"
            >
              {{ t(`showcase.crews.status.${crew.status}`) }}
            </UBadge>
          </div>

          <div class="mt-4">
            <div class="flex justify-between text-sm mb-1">
              <span class="text-slate-600 dark:text-slate-400">{{ t('crewsPage.formationProgress') }}</span>
              <span class="font-medium">{{ crew.formationProgress }}%</span>
            </div>
            <UProgress :value="crew.formationProgress" color="primary" />
          </div>
        </NuxtLink>
      </UCard>
    </div>
  </div>
</template>
