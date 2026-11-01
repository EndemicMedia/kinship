<script setup lang="ts">
import { mockUsers } from '~/data/mock-users'
import type { Attachment, Document, IncidentStatus } from '~/types/app'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { t, locale } = useI18n()
const localePath = useLocalePath()

const route = useRoute()
const crewsStore = useCrewsStore()
const authStore = useAuthStore()

const crewId = computed(() => {
  const id = route.query.id
  return (Array.isArray(id) ? id[0] : id) || ''
})

const crew = computed(() => {
  if (!crewId.value) return null
  const found = crewsStore.getCrewById(crewId.value)
  return found || null
})
const toast = useToast()

const crewName = computed(() => crew.value?.name || 'Crew Details')
const crewMembers = computed(() => crew.value?.members || [])
const crewDocuments = computed(() => crew.value?.documents || [])

useSeoMeta({
  title: () => t('seo.app.crewDetail.title', { name: crewName.value }),
  description: () => t('seo.app.crewDetail.description', { name: crewName.value }),
  ogTitle: () => t('seo.app.crewDetail.title', { name: crewName.value }),
  ogDescription: () => t('seo.app.crewDetail.description', { name: crewName.value }),
  ogType: 'website',
  twitterTitle: () => t('seo.app.crewDetail.title', { name: crewName.value }),
  twitterDescription: () => t('seo.app.crewDetail.description', { name: crewName.value }),
  twitterCard: 'summary'
})

const activeTab = ref(0)
const tabs = computed(() => [
  { slot: 'overview', label: t('crewDetail.tabs.overview'), icon: 'i-heroicons-home' },
  { slot: 'chat', label: t('crewDetail.tabs.chat'), icon: 'i-heroicons-chat-bubble-left-right' },
  { slot: 'documents', label: t('crewDetail.tabs.documents'), icon: 'i-heroicons-document-text' },
  { slot: 'values', label: t('crewDetail.tabs.values'), icon: 'i-heroicons-heart' },
  { slot: 'accountability', label: t('crewDetail.tabs.accountability'), icon: 'i-heroicons-scale' }
])

const getMemberInfo = (userId: string) => {
  if (authStore.currentUser?.id === userId) return authStore.currentUser
  return mockUsers.find(u => u.id === userId)
}

// Chat functionality
const messages = computed(() => crew.value?.chatMessages || [])
const newMessage = ref('')
const pendingAttachments = ref<Attachment[]>([])

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit' })
}

const sendMessage = () => {
  if (!authStore.currentUser) return
  if (!crewsStore.sendMessage(crewId.value, authStore.currentUser.id, newMessage.value, pendingAttachments.value)) return
  newMessage.value = ''
  pendingAttachments.value = []
  if (fileInput.value) fileInput.value.value = ''
}

// Accountability functionality
const incidents = computed(() => crew.value?.accountabilityLogs || [])
const incidentResponses = ref<Record<string, string>>({})
const showIncidentForm = ref(false)
const newIncident = ref({
  severity: 2,
  description: ''
})

const submitIncident = () => {
  if (!authStore.currentUser) return
  if (!crewsStore.addIncident(crewId.value, authStore.currentUser.id, Number(newIncident.value.severity), newIncident.value.description)) return
  newIncident.value.description = ''
  newIncident.value.severity = 2
  showIncidentForm.value = false
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString(locale.value, { month: 'short', day: 'numeric', year: 'numeric' })
}

// File upload
const fileInput = ref<HTMLInputElement | null>(null)
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement)) return
  pendingAttachments.value = Array.from(event.target.files || []).map(file => ({
    id: crypto.randomUUID(), name: file.name, type: file.type, size: file.size, url: ''
  }))
}

// Document viewing
const showDocViewModal = ref(false)
const selectedDocId = ref('')
const selectedDoc = computed(() => crew.value?.documents.find(doc => doc.id === selectedDocId.value))
const viewDocument = (doc: Document) => {
  selectedDocId.value = doc.id
  showDocViewModal.value = true
}
const legalLink = computed(() => localePath({ path: '/app/legal', query: { crewId: crewId.value } }))

// Values modal
const showAddValuesModal = ref(false)
const newValueTitle = ref('')
const newValueCategory = ref('parenting')

const addValue = () => {
  if (!crewsStore.addValue(crewId.value, newValueTitle.value, newValueCategory.value)) return
  
  toast.add({
    title: t('crewDetail.toasts.valueAdded'),
    description: t('crewDetail.toasts.valueAddedDesc', { name: newValueTitle.value }),
    color: 'teal',
    icon: 'i-heroicons-heart'
  })
  
  showAddValuesModal.value = false
  newValueTitle.value = ''
}

function respondToIncident(id: string, status: IncidentStatus) {
  if (crewsStore.respondToIncident(crewId.value, id, status, incidentResponses.value[id] || t(`showcase.crews.incidentActions.${status}`))) {
    incidentResponses.value[id] = ''
  }
}

const checkInDate = ref('')
const checkInRating = ref(3)
const checkInNotes = ref('')
const checkInFeedback = ref('')
function scheduleCheckIn() {
  if (crewsStore.scheduleCheckIn(crewId.value, new Date(checkInDate.value))) checkInFeedback.value = t('showcase.crews.checkInScheduled')
}
function completeCheckIn() {
  if (authStore.currentUser && crewsStore.completeCheckIn(crewId.value, authStore.currentUser.id, Number(checkInRating.value), checkInNotes.value)) {
    checkInNotes.value = ''
    checkInFeedback.value = t('showcase.crews.checkInSaved')
  }
}
watch(crewId, () => {
  pendingAttachments.value = []
  newMessage.value = ''
})
watch(() => route.query.tab, tab => {
  const index = tabs.value.findIndex(item => item.slot === tab)
  activeTab.value = index >= 0 ? index : 0
}, { immediate: true })
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <UButton :to="localePath('/app/crews')" variant="ghost" icon="i-heroicons-arrow-left">
        {{ t('crewDetail.back') }}
      </UButton>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
        {{ crewName }}
      </h1>
    </div>

    <!-- Loading State -->
    <div v-if="!crewId" class="text-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 mx-auto text-slate-400 animate-spin mb-4" />
      <p class="text-slate-600">{{ t('crewDetail.loading') }}</p>
    </div>

    <!-- Crew Not Found -->
    <UCard v-else-if="!crew" class="text-center py-12">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 mx-auto text-amber-500 mb-4" />
      <h2 class="text-xl font-bold mb-2">{{ t('crewDetail.notFound.title') }}</h2>
      <p class="text-slate-600 mb-2">{{ t('crewDetail.notFound.crewId', { id: crewId }) }}</p>
      <p class="text-slate-600 mb-6">{{ t('crewDetail.notFound.description') }}</p>
      <UButton :to="localePath('/app/crews')" color="primary">{{ t('crewDetail.notFound.backToCrews') }}</UButton>
    </UCard>

    <UTabs v-else v-model="activeTab" :items="tabs" :key="crew.id">
        <template #overview>
          <UCard class="mt-4">
            <div class="space-y-6">
              <div v-if="crew?.description">
                <h3 class="text-lg font-semibold mb-2">{{ t('crewDetail.overview.about') }}</h3>
                <p class="text-slate-600 dark:text-slate-400">{{ crew.description }}</p>
              </div>

              <div v-if="crew?.formationProgress !== undefined">
                <h3 class="text-lg font-semibold mb-3">{{ t('crewDetail.overview.formationProgress') }}</h3>
                <UProgress :value="crew.formationProgress" color="primary" size="lg" />
                <p class="text-sm text-slate-600 mt-2">{{ t('crewDetail.overview.percentComplete', { percent: crew.formationProgress }) }}</p>
              </div>

              <div>
                <h3 class="text-lg font-semibold mb-3">{{ t('crewDetail.overview.membersCount', { count: crewMembers.length }) }}</h3>
                <div class="space-y-3">
                  <div v-for="member in crewMembers" :key="member.userId"
                       class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div class="flex items-center gap-3">
                      <UAvatar 
                        :src="getMemberInfo(member.userId)?.avatar" 
                        :alt="getMemberInfo(member.userId)?.name"
                        size="md" 
                      />
                      <div>
                        <p class="font-medium">{{ getMemberInfo(member.userId)?.name || 'Unknown' }}</p>
                        <p class="text-sm text-slate-500">{{ member.role.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</p>
                      </div>
                    </div>
                    <UBadge :color="member.status === 'active' ? 'emerald' : 'amber'" variant="soft">
                      {{ member.status }}
                    </UBadge>
                  </div>
                </div>
              </div>
                    <div class="space-y-3 border-t pt-4">
                      <h3 class="text-lg font-semibold">{{ t('showcase.crews.checkIn') }}</h3>
                      <p v-if="crew.nextCheckIn">{{ t('showcase.crews.nextCheckIn') }}: {{ formatDate(crew.nextCheckIn) }}</p>
                      <div class="flex flex-wrap gap-2">
                        <UInput v-model="checkInDate" type="datetime-local" :aria-label="t('showcase.crews.checkInDate')" />
                        <UButton :disabled="!checkInDate || !Number.isFinite(new Date(checkInDate).getTime()) || new Date(checkInDate).getTime() <= Date.now()" @click="scheduleCheckIn">{{ t('showcase.crews.schedule') }}</UButton>
                      </div>
                      <UFormGroup :label="t('showcase.crews.rating')">
                        <USelect v-model="checkInRating" :options="[1, 2, 3, 4, 5]" :aria-label="t('showcase.crews.rating')" />
                      </UFormGroup>
                      <UTextarea v-model="checkInNotes" :placeholder="t('showcase.crews.checkInNotes')" :aria-label="t('showcase.crews.checkInNotes')" />
                      <UButton :disabled="!checkInNotes.trim()" @click="completeCheckIn">{{ t('showcase.crews.completeCheckIn') }}</UButton>
                      <p v-if="checkInFeedback" role="status" class="text-teal-600">{{ checkInFeedback }}</p>
                      <div v-for="checkIn in crew.checkIns" :key="checkIn.id" class="rounded-lg bg-slate-50 dark:bg-slate-800 p-3">
                        <p class="text-sm text-slate-500">{{ formatDate(checkIn.date) }} · {{ checkIn.responses[0]?.rating }}/5</p>
                        <p>{{ checkIn.summary }}</p>
                      </div>
                    </div>
            </div>
          </UCard>
        </template>

        <template #chat>
          <UCard class="mt-4">
            <div class="h-[400px] flex flex-col">
              <div class="flex-1 overflow-y-auto space-y-4 p-4">
                <div v-if="messages.length === 0" class="text-center text-slate-500 py-8">
                  <UIcon name="i-heroicons-chat-bubble-left-right" class="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>{{ t('crewDetail.chat.noMessages') }}</p>
                </div>
                
                <div v-for="message in messages" :key="message.id" 
                     :class="['flex gap-3', message.senderId === authStore.currentUser?.id ? 'flex-row-reverse' : '']">
                  <UAvatar v-if="message.senderId !== 'system'" 
                          :src="getMemberInfo(message.senderId)?.avatar" 
                          :alt="getMemberInfo(message.senderId)?.name" 
                          size="sm" />
                  
                  <div :class="['max-w-[70%]', message.senderId === 'system' ? 'w-full text-center' : '']">
                    <div v-if="message.senderId !== 'system'" class="flex items-center gap-2 mb-1 text-xs text-slate-500">
                      <span>{{ getMemberInfo(message.senderId)?.name }}</span>
                      <span>{{ formatTime(message.timestamp) }}</span>
                    </div>
                    
                    <div :class="['p-3 rounded-lg', 
                                 message.senderId === 'system' ? 'bg-slate-100 dark:bg-slate-800 text-sm text-slate-600' :
                                 message.senderId === authStore.currentUser?.id ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800']">
                      <p>{{ message.content }}</p>
                      <div v-if="message.attachments?.length" class="mt-2">
                        <div v-for="att in message.attachments" :key="att.id" 
                             class="flex items-center gap-2 p-2 bg-white/20 rounded text-sm">
                          <UIcon name="i-heroicons-paper-clip" class="w-4 h-4" />
                          <span>{{ att.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="pendingAttachments.length" class="flex flex-wrap gap-2 py-2">
                <UBadge v-for="attachment in pendingAttachments" :key="attachment.id" variant="soft">{{ attachment.name }} ({{ Math.ceil(attachment.size / 1024) }} KB)</UBadge>
                <UButton variant="ghost" size="xs" @click="pendingAttachments = []; fileInput && (fileInput.value = '')">{{ t('showcase.crews.removeAttachments') }}</UButton>
              </div>
              <form class="border-t pt-4 flex gap-2" @submit.prevent="sendMessage">
                <UButton icon="i-heroicons-paper-clip" variant="ghost" color="gray" @click="triggerFileUpload" :title="t('crewDetail.chat.attachFile')" />
                <input ref="fileInput" type="file" multiple class="hidden" @change="handleFileSelect" />
                <UInput v-model="newMessage" :placeholder="t('crewDetail.chat.typeMessage')" :aria-label="t('crewDetail.chat.typeMessage')" class="flex-1" />
                <UButton type="submit" icon="i-heroicons-paper-airplane" color="primary" :aria-label="t('showcase.crews.send')" :disabled="!newMessage.trim() && !pendingAttachments.length" />
              </form>
            </div>
          </UCard>
        </template>

        <template #documents>
          <UCard class="mt-4">
            <template #header><UButton :to="legalLink" icon="i-heroicons-plus">{{ t('crewDetail.documents.createDocument') }}</UButton></template>
            <div v-if="crewDocuments.length === 0" class="text-center py-12">
              <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 class="text-lg font-medium mb-2">{{ t('crewDetail.documents.noDocuments') }}</h3>
              <p class="text-slate-600 mb-4">{{ t('crewDetail.documents.createFirst') }}</p>
              <UButton color="primary" icon="i-heroicons-plus" :to="legalLink">{{ t('showcase.legal.openLegal') }}</UButton>
            </div>
            
            <div v-else class="space-y-3">
              <div v-for="doc in crewDocuments" :key="doc.id" 
                   class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div class="flex items-center gap-3">
                  <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-slate-400" />
                  <div>
                    <p class="font-medium">{{ doc.title }}</p>
                    <p class="text-sm text-slate-500">{{ doc.type }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <UBadge :color="doc.status === 'signed' ? 'emerald' : doc.status === 'pending' ? 'amber' : 'gray'" variant="soft">
                    {{ doc.status === 'executed' ? t('showcase.legal.executed') : t(`legal.status.${doc.status}`) }}
                  </UBadge>
                  <UButton variant="ghost" icon="i-heroicons-eye" :aria-label="t('showcase.legal.openDocument', { title: doc.title })" @click="viewDocument(doc)" />
                </div>
              </div>
            </div>
          </UCard>
        </template>

        <template #values>
          <UCard class="mt-4">
            <div v-if="!crew.values || crew.values.length === 0" class="text-center py-12">
              <UIcon name="i-heroicons-heart" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 class="text-lg font-medium mb-2">{{ t('crewDetail.values.noValues') }}</h3>
              <p class="text-slate-600 mb-4">{{ t('crewDetail.values.defineValues') }}</p>
              <UButton color="primary" icon="i-heroicons-plus" @click="showAddValuesModal = true">{{ t('crewDetail.values.addValues') }}</UButton>
            </div>
            
            <div v-else class="space-y-6">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-lg">{{ t('crewDetail.values.crewValues') }}</h3>
                <UButton icon="i-heroicons-plus" @click="showAddValuesModal = true">{{ t('crewDetail.values.addValues') }}</UButton>
              </div>
              
              <div class="grid gap-4 md:grid-cols-2">
                <div v-for="value in crew.values" :key="value.id" class="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700">
                  <div class="flex items-start justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <div class="p-2 rounded-full" 
                           :class="value.category === 'communication' ? 'bg-blue-100 text-blue-600' : 
                                   value.category === 'financial' ? 'bg-green-100 text-green-600' :
                                   value.category === 'parenting' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'">
                        <UIcon :name="value.category === 'communication' ? 'i-heroicons-chat-bubble-bottom-center-text' : 
                                     value.category === 'financial' ? 'i-heroicons-currency-dollar' :
                                     value.category === 'parenting' ? 'i-heroicons-user-group' : 'i-heroicons-sparkles'" 
                               class="w-5 h-5" />
                      </div>
                      <span class="font-medium">{{ value.title }}</span>
                    </div>
                    <span class="text-sm font-semibold" :class="value.matchPercentage >= 90 ? 'text-emerald-600' : 'text-slate-600'">
                      {{ value.matchPercentage }}%
                    </span>
                  </div>
                  <p class="text-sm text-slate-600 mb-3">{{ value.description }}</p>
                  <UProgress :value="value.matchPercentage" :color="value.matchPercentage >= 90 ? 'emerald' : 'primary'" size="sm" />
                </div>
              </div>
            </div>
          </UCard>
        </template>

        <template #accountability>
          <UCard class="mt-4">
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">{{ t('crewDetail.accountability.title') }}</h3>
                <UButton size="sm" icon="i-heroicons-plus" @click="showIncidentForm = true">
                  {{ t('crewDetail.accountability.logIncident') }}
                </UButton>
              </div>
            </template>
            
            <!-- Incident Form -->
            <div v-if="showIncidentForm" class="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <h4 class="font-medium mb-3">{{ t('crewDetail.accountability.logNew') }}</h4>
              <div class="space-y-3">
                <UFormGroup :label="t('crewDetail.accountability.severity')">
                  <USelect v-model="newIncident.severity" :options="[
                    { label: t('crewDetail.accountability.severityLevels.minor'), value: 1 },
                    { label: t('crewDetail.accountability.severityLevels.pattern'), value: 2 },
                    { label: t('crewDetail.accountability.severityLevels.serious'), value: 3 },
                    { label: t('crewDetail.accountability.severityLevels.critical'), value: 4 },
                    { label: t('crewDetail.accountability.severityLevels.legal'), value: 5 }
                  ]" />
                </UFormGroup>
                <UFormGroup :label="t('crewDetail.accountability.description')">
                  <UTextarea v-model="newIncident.description" :placeholder="t('crewDetail.accountability.describeIncident')" />
                </UFormGroup>
                <div class="flex gap-2">
                  <UButton color="primary" :disabled="!newIncident.description.trim()" @click="submitIncident">{{ t('crewDetail.accountability.submit') }}</UButton>
                  <UButton variant="ghost" @click="showIncidentForm = false">{{ t('crewDetail.accountability.cancel') }}</UButton>
                </div>
              </div>
            </div>
            
            <!-- Incidents List -->
            <div v-if="incidents.length === 0" class="text-center py-12">
              <UIcon name="i-heroicons-scale" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <h3 class="text-lg font-medium mb-2">{{ t('crewDetail.accountability.noIncidents') }}</h3>
              <p class="text-slate-600 mb-4">{{ t('crewDetail.accountability.healthy') }}</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="incident in incidents" :key="incident.id" 
                   class="p-4 border rounded-lg"
                   :class="incident.status === 'resolved' ? 'border-emerald-200 bg-emerald-50/50' : 
                           incident.status === 'addressed' ? 'border-teal-200 bg-teal-50/50' : 'border-amber-200 bg-amber-50/50'">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-2">
                    <UBadge :color="incident.severity <= 2 ? 'emerald' : incident.severity === 3 ? 'amber' : 'rose'" variant="soft">
                      {{ t('showcase.crews.level', { level: incident.severity }) }}
                    </UBadge>
                    <span class="text-sm text-slate-500">{{ formatDate(incident.date) }}</span>
                  </div>
                  <UBadge :color="incident.status === 'resolved' ? 'emerald' : incident.status === 'addressed' ? 'teal' : 'amber'" variant="soft">
                    {{ t(`showcase.crews.incidentStatus.${incident.status}`) }}
                  </UBadge>
                </div>
                
                <p class="text-slate-700 mb-3">{{ incident.description }}</p>
                
                <div class="flex items-center gap-2 text-sm text-slate-500">
                  <UIcon name="i-heroicons-user" class="w-4 h-4" />
                  <span>{{ t('crewDetail.accountability.reportedBy') }} {{ getMemberInfo(incident.reportedBy)?.name }}</span>
                </div>
                
                <div v-if="incident.actions.length > 0" class="mt-3 pt-3 border-t">
                  <p class="text-sm font-medium text-slate-600 mb-2">{{ t('crewDetail.accountability.actionsTaken') }}</p>
                  <ul class="text-sm text-slate-600 space-y-1">
                    <li v-for="(action, idx) in incident.actions" :key="idx" class="flex items-start gap-2">
                      <UIcon name="i-heroicons-check" class="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>{{ action }}</span>
                    </li>
                  </ul>
                </div>
                <div class="mt-3 space-y-2">
                  <UInput v-model="incidentResponses[incident.id]" :placeholder="t('showcase.crews.response')" :aria-label="t('showcase.crews.response')" />
                  <div class="flex flex-wrap gap-2">
                    <UButton v-if="incident.status === 'open'" size="sm" variant="soft" @click="respondToIncident(incident.id, 'addressed')">{{ t('showcase.crews.address') }}</UButton>
                    <UButton v-if="incident.status !== 'resolved'" size="sm" @click="respondToIncident(incident.id, 'resolved')">{{ t('showcase.crews.resolve') }}</UButton>
                    <UButton v-else size="sm" variant="soft" @click="respondToIncident(incident.id, 'open')">{{ t('showcase.crews.reopen') }}</UButton>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </template>
    </UTabs>

    <!-- Document View Modal -->
    <UModal v-model="showDocViewModal" :ui="{ width: 'w-full sm:max-w-4xl' }">
      <CrewDocumentViewer v-if="selectedDoc && showDocViewModal" :document="selectedDoc" @close="showDocViewModal = false" />
    </UModal>

    <!-- Add Values Modal -->
    <UModal v-model="showAddValuesModal" :ui="{ width: 'w-full sm:max-w-lg' }">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-lg">{{ t('crewDetail.modals.addValue') }}</h3>
        </template>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">{{ t('crewDetail.modals.valueTitle') }}</label>
            <UInput v-model="newValueTitle" :placeholder="t('crewDetail.modals.valuePlaceholder')" autofocus />
          </div>
            <div>
            <label class="block text-sm font-medium mb-2">{{ t('crewDetail.modals.category') }}</label>
            <select v-model="newValueCategory" class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800">
              <option value="parenting">{{ t('showcase.crews.categories.parenting') }}</option>
              <option value="communication">{{ t('showcase.crews.categories.communication') }}</option>
              <option value="financial">{{ t('showcase.crews.categories.financial') }}</option>
              <option value="lifestyle">{{ t('showcase.crews.categories.lifestyle') }}</option>
            </select>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="showAddValuesModal = false">{{ t('crewDetail.accountability.cancel') }}</UButton>
            <UButton 
              color="primary" 
              icon="i-heroicons-heart"
              :disabled="!newValueTitle.trim()"
              @click="addValue"
            >
              {{ t('crewDetail.values.addValues') }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
