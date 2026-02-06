<script setup lang="ts">
import { mockDocuments } from '~/data/mock-documents'
import { useCrewsStore } from '~/stores/crews'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const crewsStore = useCrewsStore()
const authStore = useAuthStore()

const userCrews = computed(() => {
  if (!authStore.currentUser) return []
  return crewsStore.userCrews(authStore.currentUser.id)
})

const allDocuments = computed(() => {
  const docs: any[] = []
  userCrews.value.forEach(crew => {
    crew.documents.forEach(doc => {
      docs.push({ ...doc, crewName: crew.name })
    })
  })
  return docs
})

const activeTab = ref(0)
const tabs = [
  { slot: 'my-documents', label: 'My Documents', icon: 'i-heroicons-document-text' },
  { slot: 'templates', label: 'Templates', icon: 'i-heroicons-document-duplicate' }
]

const route = useRoute()
const router = useRouter()

const selectedTemplateId = computed(() => route.query.templateId as string | undefined)
const selectedTemplate = computed(() => {
  if (!selectedTemplateId.value) return null
  return mockDocuments.find(t => t.id === selectedTemplateId.value)
})

const showPreview = ref(false)

watch(selectedTemplateId, (newId) => {
  showPreview.value = !!newId
})

const openPreview = (templateId: string) => {
  router.push({ query: { ...route.query, templateId } })
}

const closePreview = () => {
  const { templateId, ...queryWithoutTemplate } = route.query
  router.push({ query: queryWithoutTemplate })
}

// Document creation and viewing
const toast = useToast()
const showNewDocModal = ref(false)
const showDocViewModal = ref(false)
const selectedDoc = ref<any>(null)
const newDocTitle = ref('')
const newDocType = ref('agreement')

const openNewDoc = () => {
  newDocTitle.value = ''
  newDocType.value = 'agreement'
  showNewDocModal.value = true
}

const createDocument = () => {
  if (!newDocTitle.value.trim()) return
  
  toast.add({
    title: 'Document Created',
    description: `${newDocTitle.value} has been created. You can now edit and share it with your crew.`,
    color: 'success',
    icon: 'i-heroicons-document-text'
  })
  
  showNewDocModal.value = false
}

const useTemplate = (template: any) => {
  toast.add({
    title: 'Template Added',
    description: `${template.title} has been added to your documents.`,
    color: 'success',
    icon: 'i-heroicons-document-duplicate'
  })
  closePreview()
  activeTab.value = 0 // Switch to My Documents tab
}

const viewDocument = (doc: any) => {
  selectedDoc.value = doc
  showDocViewModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Legal</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Manage your legal agreements and documents</p>
      </div>
      <UButton color="primary" icon="i-heroicons-plus" @click="openNewDoc">
        New Document
      </UButton>
    </div>

    <UTabs v-model="activeTab" :items="tabs">
      <template #my-documents>
        <UCard class="mt-4">
          <div v-if="allDocuments.length === 0" class="text-center py-12">
            <UIcon name="i-heroicons-document-text" class="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 class="text-lg font-medium mb-2">No documents yet</h3>
            <p class="text-slate-600 mb-4">Create your first legal agreement with your crew</p>
            <UButton color="primary" icon="i-heroicons-plus" @click="openNewDoc">Create Document</UButton>
          </div>
          
          <div v-else class="space-y-3">
            <div v-for="doc in allDocuments" :key="doc.id" 
                 class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-slate-400" />
                <div>
                  <p class="font-medium">{{ doc.title }}</p>
                  <p class="text-sm text-slate-500">{{ doc.crewName }} • {{ doc.type }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <UBadge :color="doc.status === 'signed' ? 'success' : doc.status === 'pending' ? 'warning' : 'gray'" variant="soft">
                  {{ doc.status }}
                </UBadge>
                <UButton variant="ghost" icon="i-heroicons-eye" @click="viewDocument(doc)" />
              </div>
            </div>
          </div>
        </UCard>
      </template>

      <template #templates>
        <UCard class="mt-4">
          <div class="space-y-3">
            <div v-for="template in mockDocuments" :key="template.id" 
                 class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div class="flex items-center gap-3">
                <UIcon name="i-heroicons-document-duplicate" class="w-8 h-8 text-slate-400" />
                <div>
                  <p class="font-medium">{{ template.title }}</p>
                  <p class="text-sm text-slate-500">{{ template.description }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <UButton variant="ghost" icon="i-heroicons-eye" @click="openPreview(template.id)">
                  Preview
                </UButton>
                <UButton variant="soft" icon="i-heroicons-plus" @click="openNewDoc">
                  Use Template
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>

    <!-- Template Preview Modal -->
    <UModal v-model="showPreview" :ui="{ width: 'w-full sm:max-w-4xl' }">
      <UCard v-if="selectedTemplate">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">{{ selectedTemplate.title }}</h3>
            <UButton icon="i-heroicons-x-mark" variant="ghost" color="gray" @click="closePreview" />
          </div>
        </template>
        
        <div class="prose prose-slate dark:prose-invert max-w-none" v-html="selectedTemplate.content"></div>
        
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="closePreview">Close</UButton>
            <UButton color="primary" icon="i-heroicons-plus" @click="useTemplate(selectedTemplate)">
              Use This Template
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- New Document Modal -->
    <UModal v-model="showNewDocModal" :ui="{ width: 'w-full sm:max-w-lg' }">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-lg">Create New Document</h3>
        </template>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Document Title</label>
            <UInput v-model="newDocTitle" placeholder="e.g., Co-Parenting Agreement" autofocus />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Document Type</label>
            <select v-model="newDocType" class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800">
              <option value="agreement">Agreement</option>
              <option value="contract">Contract</option>
              <option value="policy">Policy</option>
              <option value="statement">Statement</option>
            </select>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="showNewDocModal = false">Cancel</UButton>
            <UButton 
              color="primary" 
              icon="i-heroicons-document-text"
              :disabled="!newDocTitle.trim()"
              @click="createDocument"
            >
              Create Document
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Document View Modal -->
    <UModal v-model="showDocViewModal" :ui="{ width: 'w-full sm:max-w-4xl' }">
      <UCard v-if="selectedDoc">
        <template #header>
          <div>
            <h2 class="text-xl font-bold">{{ selectedDoc.title }}</h2>
            <p class="text-sm text-slate-500 mt-1">{{ selectedDoc.type }} • {{ selectedDoc.crewName }}</p>
          </div>
        </template>

        <div class="prose prose-slate dark:prose-invert max-w-none" v-html="selectedDoc.content || 'No content available'"></div>

        <template #footer>
          <div class="flex justify-between items-center">
            <UBadge :color="selectedDoc.status === 'signed' ? 'success' : selectedDoc.status === 'pending' ? 'warning' : 'gray'" variant="soft">
              {{ selectedDoc.status }}
            </UBadge>
            <div class="flex gap-3">
              <UButton variant="ghost" @click="showDocViewModal = false">Close</UButton>
              <UButton v-if="selectedDoc.status !== 'signed'" color="primary" icon="i-heroicons-pencil-square">
                Edit
              </UButton>
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
