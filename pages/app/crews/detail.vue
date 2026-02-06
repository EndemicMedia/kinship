<script setup lang="ts">
import { mockUsers } from '~/data/mock-users'
import { getMessagesForCrew } from '~/data/mock-messages'
import { getIncidentsForCrew, severityLabels } from '~/data/mock-incidents'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const route = useRoute()
const crewsStore = useCrewsStore()
const authStore = useAuthStore()

const crewId = computed(() => {
  const id = route.query.id
  return Array.isArray(id) ? id[0] : id
})

const crew = computed(() => {
  if (!crewId.value) return null
  const found = crewsStore.getCrewById(crewId.value as string)
  return found || null
})

const crewName = computed(() => crew.value?.name || 'Crew Details')
const crewMembers = computed(() => crew.value?.members || [])
const crewDocuments = computed(() => crew.value?.documents || [])

const activeTab = ref(0)
const tabs = [
  { slot: 'overview', label: 'Overview', icon: 'i-heroicons-home' },
  { slot: 'chat', label: 'Chat', icon: 'i-heroicons-chat-bubble-left-right' },
  { slot: 'documents', label: 'Documents', icon: 'i-heroicons-document-text' },
  { slot: 'values', label: 'Values', icon: 'i-heroicons-heart' },
  { slot: 'accountability', label: 'Accountability', icon: 'i-heroicons-scale' }
]

const getMemberInfo = (userId: string) => {
  return mockUsers.find(u => u.id === userId)
}

// Chat functionality
const messages = computed(() => getMessagesForCrew(crewId.value))
const newMessage = ref('')

const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  console.log('Sending message:', newMessage.value)
  newMessage.value = ''
}

// Accountability functionality
const incidents = computed(() => getIncidentsForCrew(crewId.value))
const showIncidentForm = ref(false)
const newIncident = ref({
  severity: 2,
  description: ''
})

const submitIncident = () => {
  if (!newIncident.value.description.trim()) return
  console.log('Logging incident:', newIncident.value)
  newIncident.value.description = ''
  newIncident.value.severity = 2
  showIncidentForm.value = false
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <UButton to="/app/crews" variant="ghost" icon="i-heroicons-arrow-left">
        Back
      </UButton>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">
        {{ crewName }}
      </h1>
    </div>

    <!-- Loading State -->
    <div v-if="!crewId" class="text-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 mx-auto text-slate-400 animate-spin mb-4" />
      <p class="text-slate-600">Loading crew...</p>
    </div>

    <!-- Crew Not Found -->
    <UCard v-else-if="!crew" class="text-center py-12">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-16 h-16 mx-auto text-amber-500 mb-4" />
      <h2 class="text-xl font-bold mb-2">Crew Not Found</h2>
      <p class="text-slate-600 mb-2">Crew ID: {{ crewId }}</p>
      <p class="text-slate-600 mb-6">The crew you're looking for doesn't exist or you don't have access to it.</p>
      <UButton to="/app/crews" color="primary">Back to My Crews</UButton>
    </UCard>

    <UTabs v-else v-model="activeTab" :items="tabs" :key="crew.id">
      <template #overview>
        <UCard class="mt-4">
          <div class="space-y-6">
            <div v-if="crew?.description">
              <h3 class="text-lg font-semibold mb-2">About</h3>
              <p class="text-slate-600 dark:text-slate-400">{{ crew.description }}</p>
            </div>

            <div v-if="crew?.formationProgress !== undefined">
              <h3 class="text-lg font-semibold mb-3">Formation Progress</h3>
              <UProgress :value="crew.formationProgress" color="primary" size="lg" />
              <p class="text-sm text-slate-600 mt-2">{{ crew.formationProgress }}% complete</p>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-3">Members ({{ crewMembers.length }})</h3>
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
                      <p class="text-sm text-slate-500">{{ member.role.replace('-', ' ') }}</p>
                    </div>
                  </div>
                  <UBadge :color="member.status === 'active' ? 'success' : 'warning'" variant="soft">
                    {{ member.status }}
                  </UBadge>
                </div>
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
                <p>No messages yet. Start the conversation!</p>
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
            <div class="border-t pt-4 flex gap-2">
              <UButton icon="i-heroicons-paper-clip" variant="ghost" color="gray" disabled title="Attach file (coming soon)" />
              <UInput v-model="newMessage" placeholder="Type a message..." class="flex-1" @keyup.enter="sendMessage" />
              <UButton icon="i-heroicons-paper-airplane" color="primary" :disabled="!newMessage.trim()" @click="sendMessage" />
            </div>
          </div>
        </UCard>
      </template>

      <template #documents>
        <UCard class="mt-4">
          <div v-if="crewDocuments.length === 0" class="text-center py-12">
            <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 class="text-lg font-medium mb-2">No documents yet</h3>
            <p class="text-slate-600 mb-4">Create your first legal agreement</p>
            <UButton color="primary" icon="i-heroicons-plus" disabled title="Create document (coming soon)">Create Document</UButton>
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
                <UBadge :color="doc.status === 'signed' ? 'success' : doc.status === 'pending' ? 'warning' : 'gray'" variant="soft">
                  {{ doc.status }}
                </UBadge>
                <UButton variant="ghost" icon="i-heroicons-eye" disabled title="View document (coming soon)" />
              </div>
            </div>
          </div>
        </UCard>
      </template>

      <template #values>
        <UCard class="mt-4">
          <div class="text-center py-12">
            <UIcon name="i-heroicons-heart" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 class="text-lg font-medium mb-2">Values</h3>
            <p class="text-slate-600 mb-4">Values alignment</p>
          </div>
        </UCard>
      </template>

      <template #accountability>
        <UCard class="mt-4">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Accountability Logs</h3>
              <UButton size="sm" icon="i-heroicons-plus" @click="showIncidentForm = true">
                Log Incident
              </UButton>
            </div>
          </template>
          
          <!-- Incident Form -->
          <div v-if="showIncidentForm" class="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <h4 class="font-medium mb-3">Log New Incident</h4>
            <div class="space-y-3">
              <UFormGroup label="Severity Level">
                <USelect v-model="newIncident.severity" :options="[
                  { label: '1 - Minor (Primary Parent)', value: 1 },
                  { label: '2 - Pattern (Full Crew)', value: 2 },
                  { label: '3 - Serious (+ Professional)', value: 3 },
                  { label: '4 - Critical (Immediate)', value: 4 },
                  { label: '5 - Legal (Court)', value: 5 }
                ]" />
              </UFormGroup>
              <UFormGroup label="Description">
                <UTextarea v-model="newIncident.description" placeholder="Describe the incident..." />
              </UFormGroup>
              <div class="flex gap-2">
                <UButton color="primary" @click="submitIncident">Submit</UButton>
                <UButton variant="ghost" @click="showIncidentForm = false">Cancel</UButton>
              </div>
            </div>
          </div>
          
          <!-- Incidents List -->
          <div v-if="incidents.length === 0" class="text-center py-12">
            <UIcon name="i-heroicons-scale" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 class="text-lg font-medium mb-2">No incidents logged</h3>
            <p class="text-slate-600 mb-4">This crew is maintaining healthy accountability</p>
          </div>
          
          <div v-else class="space-y-4">
            <div v-for="incident in incidents" :key="incident.id" 
                 class="p-4 border rounded-lg"
                 :class="incident.status === 'resolved' ? 'border-emerald-200 bg-emerald-50/50' : 
                         incident.status === 'addressed' ? 'border-teal-200 bg-teal-50/50' : 'border-amber-200 bg-amber-50/50'">
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center gap-2">
                  <UBadge :color="incident.severity <= 2 ? 'emerald' : incident.severity === 3 ? 'amber' : 'rose'" variant="soft">
                    Level {{ incident.severity }}
                  </UBadge>
                  <span class="text-sm text-slate-500">{{ formatDate(incident.date) }}</span>
                </div>
                <UBadge :color="incident.status === 'resolved' ? 'emerald' : incident.status === 'addressed' ? 'teal' : 'amber'" variant="soft">
                  {{ incident.status }}
                </UBadge>
              </div>
              
              <p class="text-slate-700 mb-3">{{ incident.description }}</p>
              
              <div class="flex items-center gap-2 text-sm text-slate-500">
                <UIcon name="i-heroicons-user" class="w-4 h-4" />
                <span>Reported by {{ getMemberInfo(incident.reportedBy)?.name }}</span>
              </div>
              
              <div v-if="incident.actions.length > 0" class="mt-3 pt-3 border-t">
                <p class="text-sm font-medium text-slate-600 mb-2">Actions Taken:</p>
                <ul class="text-sm text-slate-600 space-y-1">
                  <li v-for="(action, idx) in incident.actions" :key="idx" class="flex items-start gap-2">
                    <UIcon name="i-heroicons-check" class="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>{{ action }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>