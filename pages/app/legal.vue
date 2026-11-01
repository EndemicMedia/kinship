<script setup lang="ts">
import { mockDocuments } from '~/data/mock-documents'
import type { Document } from '~/types/app'

definePageMeta({ layout: 'app', middleware: ['auth'] })

const { t } = useI18n()
const localePath = useLocalePath()
const crewsStore = useCrewsStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()
const url = 'https://endemicmedia.github.io/kinship/app/legal'

useSeoMeta({
  title: () => t('seo.app.legal.title'),
  description: () => t('seo.app.legal.description'),
  ogTitle: () => t('seo.app.legal.title'),
  ogDescription: () => t('seo.app.legal.description'),
  ogType: 'website',
  ogUrl: url,
  twitterTitle: () => t('seo.app.legal.title'),
  twitterDescription: () => t('seo.app.legal.description'),
  twitterCard: 'summary'
})
useHead(() => ({ link: [{ rel: 'canonical', href: url }] }))

function queryString(value: typeof route.query[string]): string {
  return (Array.isArray(value) ? value[0] : value) || ''
}
const originatingCrewId = computed(() => queryString(route.query.crewId))
const userCrews = computed(() => authStore.currentUser ? crewsStore.userCrews(authStore.currentUser.id) : [])
const editableCrews = computed(() => userCrews.value.filter(crew => crew.members.some(member => member.userId === authStore.currentUser?.id && member.status === 'active')))
const allDocuments = computed(() => userCrews.value.flatMap(crew => crew.documents.map(document => ({ document, crewName: crew.name }))))
const originatingCrew = computed(() => crewsStore.getCrewById(originatingCrewId.value))
const activeTab = ref(0)
const tabs = computed(() => [
  { slot: 'my-documents', label: t('legal.tabs.myDocuments'), icon: 'i-heroicons-document-text' },
  { slot: 'templates', label: t('legal.tabs.templates'), icon: 'i-heroicons-document-duplicate' }
])
const selectedTemplateId = computed(() => queryString(route.query.templateId))
const selectedTemplate = computed(() => mockDocuments.find(template => template.id === selectedTemplateId.value))
const activeDialog = ref<'preview' | 'create' | 'document' | null>(null)
const dialogOpen = computed({
  get: () => activeDialog.value !== null,
  set: (open: boolean) => {
    if (!open) closeDialog()
  }
})
watch(selectedTemplateId, id => {
  if (id) activeDialog.value = 'preview'
  else if (activeDialog.value === 'preview') activeDialog.value = null
}, { immediate: true })

function openPreview(templateId: string) {
  router.push({ query: { ...route.query, templateId } })
}
function closePreview() {
  if (activeDialog.value === 'preview') activeDialog.value = null
  const { templateId, ...query } = route.query
  router.replace({ query })
}

const newDocTitle = ref('')
const newDocType = ref('agreement')
const newDocContent = ref('')
const newDocCrewId = ref('')
const creationError = ref('')
const selectedDocId = ref('')
const selectedDoc = computed(() => allDocuments.value.find(record => record.document.id === selectedDocId.value)?.document)
const documentFeedback = ref('')

function openNewDoc(template?: typeof mockDocuments[number]) {
  newDocTitle.value = template?.title || ''
  newDocType.value = template?.type || 'agreement'
  // Static templates contain markup; editable drafts are safe plain text.
  newDocContent.value = template ? template.content.replace(/<\/(?:p|h[1-6])>/gi, '\n\n').replace(/<[^>]*>/g, '').replace(/[ \t]+/g, ' ').replace(/\n[ \t]+/g, '\n').trim() : ''
  newDocCrewId.value = editableCrews.value.find(crew => crew.id === originatingCrewId.value)?.id || editableCrews.value[0]?.id || ''
  creationError.value = ''
  activeDialog.value = 'create'
  if (selectedTemplateId.value) closePreview()
}

function createDocument() {
  if (!editableCrews.value.some(crew => crew.id === newDocCrewId.value) || !newDocTitle.value.trim() || !newDocContent.value.trim()) {
    creationError.value = t('showcase.legal.validation')
    return
  }
  const document = crewsStore.createDocument(newDocCrewId.value, newDocTitle.value, newDocType.value, newDocContent.value)
  if (!document) return
  activeTab.value = 0
  documentFeedback.value = t('legal.toasts.documentCreatedDesc', { title: document.title })
  viewDocument(document)
}

function viewDocument(document: Document) {
  selectedDocId.value = document.id
  activeDialog.value = 'document'
  router.replace({ query: { ...route.query, documentId: document.id } })
}
function closeDocument() {
  activeDialog.value = null
  const { documentId, ...query } = route.query
  router.replace({ query })
}
function closeDialog() {
  if (activeDialog.value === 'preview') closePreview()
  else if (activeDialog.value === 'document') closeDocument()
  else activeDialog.value = null
}
watch(() => queryString(route.query.documentId), id => {
  if (allDocuments.value.some(record => record.document.id === id)) {
    selectedDocId.value = id
    activeDialog.value = 'document'
  } else if (activeDialog.value === 'document') {
    activeDialog.value = null
  }
}, { immediate: true })
</script>

<template>
  <div class="space-y-6">
    <UButton v-if="originatingCrew" :to="localePath({ path: '/app/crews/detail', query: { id: originatingCrew.id, tab: 'documents' } })" variant="ghost" icon="i-heroicons-arrow-left">
      {{ t('showcase.legal.backToCrew', { name: originatingCrew.name }) }}
    </UButton>
    <div class="flex items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('legal.title') }}</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-1">{{ t('legal.subtitle') }}</p>
      </div>
      <UButton icon="i-heroicons-plus" @click="openNewDoc()">{{ t('legal.newDocument') }}</UButton>
    </div>
    <p v-if="documentFeedback" role="status" class="text-teal-600">{{ documentFeedback }}</p>
    <UTabs v-model="activeTab" :items="tabs">
      <template #my-documents>
        <UCard class="mt-4">
          <div v-if="!allDocuments.length" class="text-center py-12">
            <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 class="text-lg font-medium mb-2">{{ t('legal.noDocuments.title') }}</h3>
            <p class="text-slate-600 mb-4">{{ t('legal.noDocuments.description') }}</p>
            <UButton icon="i-heroicons-plus" @click="openNewDoc()">{{ t('legal.noDocuments.button') }}</UButton>
          </div>
          <div v-else class="space-y-3">
            <div v-for="{ document, crewName } in allDocuments" :key="document.id" class="flex items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div>
                <p class="font-medium">{{ document.title }}</p>
                <p class="text-sm text-slate-500">{{ crewName }} · {{ document.type }}</p>
              </div>
              <div class="flex items-center gap-3">
                <UBadge variant="soft">{{ document.status === 'executed' ? t('showcase.legal.executed') : t(`legal.status.${document.status}`) }}</UBadge>
                <UButton variant="ghost" icon="i-heroicons-eye" :aria-label="t('showcase.legal.openDocument', { title: document.title })" @click="viewDocument(document)" />
              </div>
            </div>
          </div>
        </UCard>
      </template>
      <template #templates>
        <UCard class="mt-4">
          <div class="space-y-3">
            <div v-for="template in mockDocuments" :key="template.id" class="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p class="font-medium">{{ template.title }}</p>
              <div class="flex gap-2">
                <UButton variant="ghost" icon="i-heroicons-eye" @click="openPreview(template.id)">{{ t('legal.buttons.preview') }}</UButton>
                <UButton variant="soft" icon="i-heroicons-plus" @click="openNewDoc(template)">{{ t('legal.buttons.useTemplate') }}</UButton>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>

    <UModal v-model="dialogOpen" :ui="{ width: 'w-full sm:max-w-4xl' }">
      <UCard v-if="activeDialog === 'preview' && selectedTemplate">
        <template #header>
          <div class="flex items-center justify-between gap-3">
            <h3 class="text-lg font-semibold">{{ selectedTemplate.title }}</h3>
            <UButton icon="i-heroicons-x-mark" variant="ghost" :aria-label="t('legal.buttons.close')" @click="closePreview" />
          </div>
        </template>
        <div class="prose prose-slate dark:prose-invert max-w-none" v-html="selectedTemplate.content"></div>
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="closePreview">{{ t('legal.buttons.close') }}</UButton>
            <UButton icon="i-heroicons-plus" @click="openNewDoc(selectedTemplate)">{{ t('legal.modals.useThisTemplate') }}</UButton>
          </div>
        </template>
      </UCard>
      <UCard v-else-if="activeDialog === 'create'">
        <template #header><h3 class="font-semibold text-lg">{{ t('legal.modals.createTitle') }}</h3></template>
        <form id="create-crew-document" class="space-y-4" @submit.prevent="createDocument">
          <UFormGroup :label="t('showcase.legal.crew')">
            <USelect v-model="newDocCrewId" :options="editableCrews.map(crew => ({ label: crew.name, value: crew.id }))" :aria-label="t('showcase.legal.crew')" />
          </UFormGroup>
          <p v-if="!editableCrews.length" class="text-slate-500">
            {{ t('showcase.legal.needsCrew') }}
            <NuxtLink :to="localePath('/app/crews/create')" class="text-teal-600 underline" @click="closeDialog">{{ t('showcase.crews.create') }}</NuxtLink>
          </p>
          <UFormGroup :label="t('legal.modals.documentTitle')">
            <UInput v-model="newDocTitle" :aria-label="t('legal.modals.documentTitle')" autofocus />
          </UFormGroup>
          <UFormGroup :label="t('legal.modals.documentType')">
            <UInput v-model="newDocType" :aria-label="t('legal.modals.documentType')" />
          </UFormGroup>
          <UFormGroup :label="t('showcase.legal.content')">
            <UTextarea v-model="newDocContent" :rows="10" :aria-label="t('showcase.legal.content')" />
          </UFormGroup>
          <p v-if="creationError" role="alert" class="text-red-500">{{ creationError }}</p>
        </form>
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="closeDialog">{{ t('legal.buttons.cancel') }}</UButton>
            <UButton type="submit" form="create-crew-document">{{ t('legal.buttons.createDocument') }}</UButton>
          </div>
        </template>
      </UCard>
      <CrewDocumentViewer v-else-if="activeDialog === 'document' && selectedDoc" :key="selectedDoc.id" :document="selectedDoc" @close="closeDocument" />
    </UModal>
  </div>
</template>
