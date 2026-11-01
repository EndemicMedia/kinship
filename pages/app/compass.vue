<script setup lang="ts">
import { mockUsers } from '~/data/mock-users'
import type { CompassDecision, CompassAction } from '~/stores/compass'
import type { User } from '~/types/app'
import { calculateMatchScore } from '~/utils/matching'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { t } = useI18n()
const authStore = useAuthStore()
const compassStore = useCompassStore()
const uiStore = useUIStore()

const url = 'https://endemicmedia.github.io/kinship/app/compass'
useSeoMeta({
  title: () => t('seo.app.compass.title'),
  description: () => t('seo.app.compass.description'),
  ogTitle: () => t('seo.app.compass.title'),
  ogDescription: () => t('seo.app.compass.description'),
  ogType: 'website',
  ogUrl: url,
  twitterTitle: () => t('seo.app.compass.title'),
  twitterDescription: () => t('seo.app.compass.description'),
  twitterCard: 'summary_large_image'
})
useHead(() => ({ link: [{ rel: 'canonical', href: url }] }))

interface MatchCard extends User {
  matchScore: number
}

const selectedRole = ref('')
const selectedLocation = ref('')
const minMatchScore = ref(0)
const showFilters = ref(false)
const activeDialog = ref<'profile' | 'message' | 'connect' | null>(null)
const dialogOpen = computed({
  get: () => activeDialog.value !== null,
  set: (open: boolean) => {
    if (!open) activeDialog.value = null
  }
})
const selectedUser = ref<MatchCard | null>(null)
const messageContent = ref('')
const connectionMessage = ref('')
const sendingAction = ref<CompassAction | null>(null)

const personaId = computed(() => authStore.currentUser?.id ?? '')
watch(personaId, id => { compassStore.activePersonaId = id }, { immediate: true })
const conversation = computed(() => compassStore.sentMessages.filter(message =>
  message.senderId === personaId.value && message.userId === selectedUser.value?.id
).slice().reverse())
const decisions = computed(() => compassStore.decisions(personaId.value))
const potentialMatches = computed<MatchCard[]>(() => {
  const currentUser = authStore.currentUser
  if (!currentUser) return []
  return mockUsers
    .filter(user => user.id !== currentUser.id && user.status === 'available')
    .map(user => ({ ...user, matchScore: calculateMatchScore(currentUser, user).total }))
    .filter(user => !selectedRole.value || user.role === selectedRole.value)
    .filter(user => !selectedLocation.value || user.location.split(',')[1]?.trim() === selectedLocation.value)
    .filter(user => user.matchScore >= minMatchScore.value)
    .sort((left, right) => right.matchScore - left.matchScore)
})

const uniqueRoles = computed(() => [...new Set(mockUsers.filter(user => user.status === 'available').map(user => user.role))].sort())
const uniqueLocations = computed(() => [...new Set(
  mockUsers.filter(user => user.status === 'available')
    .map(user => user.location.split(',')[1]?.trim())
    .filter((location): location is string => Boolean(location))
)].sort())
const selectedMatchScore = computed(() => {
  if (!selectedUser.value || !authStore.currentUser) return null
  return calculateMatchScore(authStore.currentUser, selectedUser.value)
})
const likedCount = computed(() => Object.values(decisions.value).filter(status => status === 'liked').length)
const maybeCount = computed(() => Object.values(decisions.value).filter(status => status === 'maybe').length)
const passedCount = computed(() => Object.values(decisions.value).filter(status => status === 'passed').length)
const hasDecisions = computed(() => Object.keys(decisions.value).length > 0)

function resetFilters() {
  selectedRole.value = ''
  selectedLocation.value = ''
  minMatchScore.value = 0
}

async function decide(user: MatchCard, decision: CompassDecision) {
  const saved = await compassStore.decide(personaId.value, user.id, decision)
  if (!saved) return
  const label = t(`showcase.compass.${decision}`)
  uiStore.addActivity({
    type: 'member',
    title: t('showcase.compass.decisionActivity', { decision: label }),
    description: t('showcase.compass.decisionActivityDescription', { name: user.name })
  })
  uiStore.showToast({
    title: t('showcase.compass.decisionSaved', { decision: label }),
    description: t('showcase.compass.decisionSavedDescription', { name: user.name }),
    color: decision === 'passed' ? 'info' : 'success'
  })
}

function openProfile(user: MatchCard) {
  selectedUser.value = user
  activeDialog.value = 'profile'
}

function openMessage(user: MatchCard) {
  selectedUser.value = user
  messageContent.value = ''
  activeDialog.value = 'message'
}

function openConnect(user: MatchCard) {
  selectedUser.value = user
  connectionMessage.value = ''
  activeDialog.value = 'connect'
}

async function sendAction(action: CompassAction) {
  if (!selectedUser.value || sendingAction.value || compassStore.hasPending(action, selectedUser.value.id)) return
  const message = action === 'message' ? messageContent.value : connectionMessage.value
  if (action === 'message' && !message.trim()) return

  const user = selectedUser.value
  sendingAction.value = action
  const sent = await compassStore.sendAction(action, user.id, message)
  sendingAction.value = null
  if (!sent) return

  uiStore.addActivity({
    type: 'message',
    title: t(action === 'message' ? 'showcase.compass.messageActivity' : 'showcase.compass.connectActivity'),
    description: t('showcase.compass.actionActivityDescription', { name: user.name })
  })
  uiStore.showToast({
    title: t(action === 'message' ? 'showcase.compass.messageSavedTitle' : 'showcase.compass.requestSavedTitle'),
    description: t(action === 'message' ? 'showcase.compass.messageSavedDescription' : 'showcase.compass.requestSavedDescription', { name: user.name }),
    color: 'success'
  })
  activeDialog.value = null
}

function resetDecisions() {
  compassStore.resetDecisions(personaId.value)
  uiStore.showToast({
    title: t('showcase.compass.resetComplete'),
    description: t('showcase.compass.resetDescription'),
    color: 'info'
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('compass.title') }}</h1>
        <p class="mt-1 text-slate-600 dark:text-slate-400">{{ t('compass.subtitle') }}</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <UBadge color="primary" variant="soft" size="lg">{{ t('compass.matches', { count: potentialMatches.length }) }}</UBadge>
        <UButton
          variant="ghost"
          icon="i-heroicons-adjustments-horizontal"
          :aria-expanded="showFilters"
          @click="showFilters = !showFilters"
        >{{ t('compass.filters') }}</UButton>
      </div>
    </div>

    <UCard v-if="showFilters">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <label for="compass-role" class="mb-2 block text-sm font-medium">{{ t('compass.filterRole') }}</label>
          <select id="compass-role" v-model="selectedRole" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
            <option value="">{{ t('compass.allRoles') }}</option>
            <option v-for="role in uniqueRoles" :key="role" :value="role">{{ role.replace(/-/g, ' ') }}</option>
          </select>
        </div>
        <div>
          <label for="compass-location" class="mb-2 block text-sm font-medium">{{ t('compass.filterLocation') }}</label>
          <select id="compass-location" v-model="selectedLocation" class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
            <option value="">{{ t('compass.allLocations') }}</option>
            <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
          </select>
        </div>
        <div>
          <label for="compass-minimum" class="mb-2 block text-sm font-medium">{{ t('compass.filterMinMatch', { percent: minMatchScore }) }}</label>
          <input id="compass-minimum" v-model.number="minMatchScore" type="range" min="0" max="100" step="5" class="w-full accent-teal-500" />
        </div>
      </div>
      <div class="mt-4 flex justify-end">
        <UButton variant="ghost" icon="i-heroicons-arrow-path" @click="resetFilters">{{ t('showcase.compass.resetFilters') }}</UButton>
      </div>
    </UCard>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <UCard class="text-center"><div class="text-2xl font-bold text-slate-900 dark:text-white">{{ potentialMatches.length }}</div><div class="text-sm text-slate-500">{{ t('compass.stats.potential') }}</div></UCard>
      <UCard class="text-center"><div data-testid="liked-count" class="text-2xl font-bold text-teal-600">{{ likedCount }}</div><div class="text-sm text-slate-500">{{ t('compass.stats.liked') }}</div></UCard>
      <UCard class="text-center"><div data-testid="maybe-count" class="text-2xl font-bold text-amber-600">{{ maybeCount }}</div><div class="text-sm text-slate-500">{{ t('compass.stats.maybe') }}</div></UCard>
      <UCard class="text-center"><div data-testid="passed-count" class="text-2xl font-bold text-rose-600">{{ passedCount }}</div><div class="text-sm text-slate-500">{{ t('compass.stats.passed') }}</div></UCard>
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      <UCard v-for="match in potentialMatches" :key="match.id" data-testid="match-card" class="relative overflow-hidden">
        <div class="absolute right-2 top-2 z-10 flex max-w-[calc(100%-1rem)] flex-wrap justify-end gap-2">
          <UBadge v-if="decisions[match.id]" :color="decisions[match.id] === 'liked' ? 'teal' : decisions[match.id] === 'passed' ? 'rose' : 'amber'" variant="solid">
            {{ t(`compass.status.${decisions[match.id]}`) }}
          </UBadge>
          <UBadge v-if="compassStore.hasSentMessage(match.id)" color="blue" variant="solid">{{ t('showcase.compass.messageSent') }}</UBadge>
          <UBadge v-if="compassStore.hasConnectionRequest(match.id)" color="primary" variant="solid">{{ t('showcase.compass.requestSent') }}</UBadge>
          <UBadge :color="match.matchScore >= 80 ? 'emerald' : match.matchScore >= 60 ? 'teal' : match.matchScore >= 40 ? 'amber' : 'gray'" variant="solid" size="lg">
            {{ t('compass.matchPercent', { percent: match.matchScore }) }}
          </UBadge>
        </div>
        <div class="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-teal-100 to-slate-200 dark:from-teal-900 dark:to-slate-800 sm:aspect-square">
          <UAvatar :src="match.avatar" :alt="match.name" size="3xl" class="h-28 w-28 text-4xl sm:h-32 sm:w-32" />
        </div>
        <div class="space-y-4 p-4 sm:p-6">
          <div class="flex flex-wrap items-start justify-between gap-2">
            <div class="min-w-0">
              <h2 class="text-xl font-bold text-slate-900 dark:text-white">{{ match.name }}</h2>
              <p class="text-sm text-slate-500">{{ match.location }}</p>
            </div>
            <UBadge color="primary" variant="soft">{{ match.role.replace(/-/g, ' ') }}</UBadge>
          </div>
          <p class="line-clamp-3 text-slate-600 dark:text-slate-400">{{ match.bio }}</p>
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="role in match.seeking" :key="role" variant="soft" size="sm">{{ t('compass.seeking') }}: {{ role.replace(/-/g, ' ') }}</UBadge>
          </div>
          <div class="space-y-2 border-t pt-4 text-sm">
            <div class="flex items-center gap-2"><UIcon name="i-heroicons-language" class="h-4 w-4 text-slate-400" /><span>{{ match.languages.join(', ') }}</span></div>
            <div class="flex items-center gap-2"><UIcon name="i-heroicons-users" class="h-4 w-4 text-slate-400" /><span>{{ t('showcase.compass.children', { count: match.children }) }}</span></div>
            <div class="flex items-center gap-2"><UIcon name="i-heroicons-clock" class="h-4 w-4 text-slate-400" /><span>{{ match.availability }}</span></div>
          </div>
        </div>
        <div class="space-y-3 px-4 pb-5 sm:px-6 sm:pb-6">
          <div class="flex flex-wrap justify-center gap-1">
            <UButton variant="ghost" size="sm" icon="i-heroicons-user" @click="openProfile(match)">{{ t('compass.buttons.profile') }}</UButton>
            <UButton variant="ghost" size="sm" icon="i-heroicons-chat-bubble-left" @click="openMessage(match)">{{ t('compass.buttons.message') }}</UButton>
            <UButton color="primary" size="sm" icon="i-heroicons-user-plus" :disabled="compassStore.hasConnectionRequest(match.id)" @click="openConnect(match)">
              {{ compassStore.hasConnectionRequest(match.id) ? t('showcase.compass.requestSent') : t('compass.buttons.connect') }}
            </UButton>
          </div>
          <div class="flex justify-center gap-3">
            <UButton color="rose" variant="soft" size="lg" icon="i-heroicons-x-mark" class="h-12 w-12 rounded-full" :aria-label="t('showcase.compass.pass', { name: match.name })" :title="t('showcase.compass.pass', { name: match.name })" :disabled="compassStore.pendingActions.includes(`decision:${personaId}:${match.id}`) || decisions[match.id] === 'passed'" @click="decide(match, 'passed')" />
            <UButton color="amber" variant="soft" size="lg" icon="i-heroicons-question-mark-circle" class="h-12 w-12 rounded-full" :aria-label="t('showcase.compass.maybeAction', { name: match.name })" :title="t('showcase.compass.maybeAction', { name: match.name })" :disabled="compassStore.pendingActions.includes(`decision:${personaId}:${match.id}`) || decisions[match.id] === 'maybe'" @click="decide(match, 'maybe')" />
            <UButton color="teal" variant="soft" size="lg" icon="i-heroicons-heart" class="h-12 w-12 rounded-full" :aria-label="t('showcase.compass.like', { name: match.name })" :title="t('showcase.compass.like', { name: match.name })" :disabled="compassStore.pendingActions.includes(`decision:${personaId}:${match.id}`) || decisions[match.id] === 'liked'" @click="decide(match, 'liked')" />
          </div>
        </div>
      </UCard>
    </div>

    <UCard v-if="potentialMatches.length === 0" class="p-8 text-center sm:p-12">
      <UIcon name="i-heroicons-users" class="mx-auto mb-4 h-16 w-16 text-slate-400" />
      <h2 class="mb-2 text-xl font-bold">{{ t('compass.noMatches.title') }}</h2>
      <p class="text-slate-600">{{ t('compass.noMatches.description') }}</p>
    </UCard>

    <div v-if="hasDecisions" class="flex justify-center">
      <UButton variant="ghost" icon="i-heroicons-arrow-path" @click="resetDecisions">{{ t('compass.buttons.resetVotes') }}</UButton>
    </div>

    <UModal v-model="dialogOpen" :ui="{ width: activeDialog === 'profile' ? 'w-full sm:max-w-3xl' : 'w-full sm:max-w-lg' }">
      <UCard v-if="activeDialog === 'profile' && selectedUser">
        <template #header>
          <div class="flex flex-wrap items-center gap-4">
            <UAvatar :src="selectedUser.avatar" :alt="selectedUser.name" size="2xl" />
            <div class="min-w-0">
              <h2 class="text-2xl font-bold">{{ selectedUser.name }}</h2>
              <p class="text-slate-600 dark:text-slate-400">{{ selectedUser.location }}</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <UBadge color="primary" variant="soft">{{ selectedUser.role.replace(/-/g, ' ') }}</UBadge>
                <UBadge color="teal" variant="solid">{{ t('compass.matchPercent', { percent: selectedUser.matchScore }) }}</UBadge>
              </div>
            </div>
          </div>
        </template>
        <div class="space-y-6">
          <div><h3 class="mb-2 text-lg font-semibold">{{ t('compass.about') }}</h3><p class="text-slate-600 dark:text-slate-400">{{ selectedUser.bio }}</p></div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><h4 class="mb-1 text-sm font-medium text-slate-500">{{ t('profile.labels.pronouns') }}</h4><p>{{ selectedUser.pronouns || t('showcase.compass.notProvided') }}</p></div>
            <div><h4 class="mb-1 text-sm font-medium text-slate-500">{{ t('showcase.compass.availability') }}</h4><p>{{ selectedUser.availability || t('showcase.compass.notProvided') }}</p></div>
            <div><h4 class="mb-1 text-sm font-medium text-slate-500">{{ t('profile.labels.languages') }}</h4><p>{{ selectedUser.languages.join(', ') || t('showcase.compass.notProvided') }}</p></div>
            <div><h4 class="mb-1 text-sm font-medium text-slate-500">{{ t('profile.labels.children') }}</h4><p>{{ selectedUser.children }}</p></div>
          </div>
          <div v-if="selectedUser.seeking.length"><h3 class="mb-2 text-lg font-semibold">{{ t('compass.seeking') }}</h3><div class="flex flex-wrap gap-2"><UBadge v-for="role in selectedUser.seeking" :key="role" variant="soft">{{ role.replace(/-/g, ' ') }}</UBadge></div></div>
          <div v-if="selectedMatchScore">
            <h3 class="mb-3 text-lg font-semibold">{{ t('compass.compatibilityBreakdown') }}</h3>
            <p class="mb-3 text-sm text-slate-500">{{ t('showcase.compass.breakdownHint') }}</p>
            <div class="space-y-3">
              <div v-for="key in ['values', 'location', 'role', 'language'] as const" :key="key">
                <div class="mb-1 flex justify-between text-sm">
                  <span>{{ t(`compass.compatibility.${key === 'values' ? 'valuesAlignment' : key === 'location' ? 'locationProximity' : key === 'role' ? 'roleCompatibility' : 'languageOverlap'}`) }}</span>
                  <span class="font-medium">{{ selectedMatchScore.breakdown[key] === null ? t('showcase.compass.notAvailable') : `${Math.round(selectedMatchScore.breakdown[key]!)}%` }}</span>
                </div>
                <UProgress :value="selectedMatchScore.breakdown[key] ?? 0" color="teal" size="sm" />
              </div>
            </div>
          </div>
        </div>
        <template #footer>
          <div class="flex flex-wrap justify-end gap-3">
            <UButton variant="ghost" @click="activeDialog = null">{{ t('compass.buttons.close') }}</UButton>
            <UButton variant="ghost" icon="i-heroicons-chat-bubble-left" @click="openMessage(selectedUser)">{{ t('compass.buttons.message') }}</UButton>
            <UButton color="primary" icon="i-heroicons-user-plus" :disabled="compassStore.hasConnectionRequest(selectedUser.id)" @click="openConnect(selectedUser)">{{ t('compass.buttons.connect') }}</UButton>
          </div>
        </template>
      </UCard>
      <UCard v-else-if="activeDialog === 'message' && selectedUser">
        <template #header><div class="flex items-center gap-3"><UAvatar :src="selectedUser.avatar" :alt="selectedUser.name" size="md" /><h3 class="font-semibold">{{ t('compass.modals.sendMessageTitle', { name: selectedUser.name }) }}</h3></div></template>
        <div class="space-y-4">
          <ul v-if="conversation.length" :aria-label="t('showcase.compass.conversation')" class="max-h-48 space-y-2 overflow-y-auto">
            <li v-for="message in conversation" :key="message.createdAt" class="rounded-lg bg-teal-50 p-3 text-sm dark:bg-teal-900/20">{{ message.message }}</li>
          </ul>
          <UTextarea v-model="messageContent" :placeholder="t('compass.modals.messagePlaceholder')" :rows="5" autofocus />
          <p class="text-sm text-slate-500">{{ t('compass.modals.messageHint') }}</p>
        </div>
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" :disabled="sendingAction === 'message'" @click="activeDialog = null">{{ t('compass.buttons.cancel') }}</UButton>
            <UButton color="primary" icon="i-heroicons-paper-airplane" :loading="sendingAction === 'message'" :disabled="!messageContent.trim() || sendingAction !== null || compassStore.hasPending('message', selectedUser.id)" @click="sendAction('message')">{{ t('compass.buttons.sendMessage') }}</UButton>
          </div>
        </template>
      </UCard>
      <UCard v-else-if="activeDialog === 'connect' && selectedUser">
        <template #header><div class="flex items-center gap-3"><UAvatar :src="selectedUser.avatar" :alt="selectedUser.name" size="md" /><h3 class="font-semibold">{{ t('compass.modals.connectionTitle', { name: selectedUser.name }) }}</h3></div></template>
        <div class="space-y-4">
          <UAlert
            v-if="compassStore.hasConnectionRequest(selectedUser.id)"
            color="green"
            variant="soft"
            icon="i-heroicons-check-circle"
            :title="t('showcase.compass.requestSent')"
            :description="t('showcase.compass.requestAlreadySent', { name: selectedUser.name })"
          />
          <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('compass.modals.connectionHint', { name: selectedUser.name }) }}</p>
          <UTextarea v-model="connectionMessage" :placeholder="t('compass.modals.noteOptional')" :rows="4" />
        </div>
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" :disabled="sendingAction === 'connect'" @click="activeDialog = null">{{ t('compass.buttons.cancel') }}</UButton>
            <UButton color="primary" icon="i-heroicons-user-plus" :loading="sendingAction === 'connect'" :disabled="sendingAction !== null || compassStore.hasPending('connect', selectedUser.id) || compassStore.hasConnectionRequest(selectedUser.id)" @click="sendAction('connect')">{{ t('compass.buttons.sendRequest') }}</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
