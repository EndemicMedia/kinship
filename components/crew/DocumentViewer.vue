<script setup lang="ts">
import type { Document } from '~/types/app'

const props = defineProps<{ document: Document; initialEdit?: boolean }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const crewsStore = useCrewsStore()
const authStore = useAuthStore()
const editing = ref(props.initialEdit || false)
const title = ref(props.document.title)
const type = ref(props.document.type)
const content = ref(props.document.content)
const saved = ref(false)
const canEdit = computed(() => !['signed', 'executed'].includes(props.document.status))
const canSign = computed(() => props.document.signers.some(signer => signer.userId === authStore.currentUser?.id && !signer.signed))

function editDocument() {
  title.value = props.document.title
  type.value = props.document.type
  content.value = props.document.content
  saved.value = false
  editing.value = true
}

function saveDocument() {
  if (crewsStore.updateDocument(props.document.crewId, props.document.id, title.value, type.value, content.value)) {
    editing.value = false
    saved.value = true
  }
}

function signDocument() {
  if (authStore.currentUser) crewsStore.signDocument(props.document.crewId, props.document.id, authStore.currentUser.id)
}

function downloadDocument() {
  const doc = props.document
  const signatures = doc.signers.map(signer => `${signer.name}: ${signer.signed ? t('showcase.legal.signed') : t('showcase.legal.awaitingSignature')}`).join('\n')
  const url = URL.createObjectURL(new Blob([`${doc.title}\n\n${doc.content}\n\n${signatures}`], { type: 'text/plain;charset=utf-8' }))
  const link = window.document.createElement('a')
  link.href = url
  link.download = `${doc.title.replace(/[^\p{L}\p{N} _-]/gu, '').trim() || 'document'}.txt`
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between items-center gap-3">
        <h2 class="text-xl font-bold">{{ document.title }}</h2>
        <UButton icon="i-heroicons-x-mark" variant="ghost" :aria-label="t('legal.buttons.close')" @click="emit('close')" />
      </div>
    </template>
    <form v-if="editing && canEdit" class="space-y-4" @submit.prevent="saveDocument">
      <UFormGroup :label="t('legal.modals.documentTitle')">
        <UInput v-model="title" :aria-label="t('legal.modals.documentTitle')" />
      </UFormGroup>
      <UFormGroup :label="t('legal.modals.documentType')">
        <UInput v-model="type" :aria-label="t('legal.modals.documentType')" />
      </UFormGroup>
      <UFormGroup :label="t('showcase.legal.content')">
        <UTextarea v-model="content" :rows="12" :aria-label="t('showcase.legal.content')" />
      </UFormGroup>
      <div class="flex gap-3">
        <UButton type="submit" :disabled="!title.trim() || !content.trim()">{{ t('showcase.legal.save') }}</UButton>
        <UButton variant="ghost" @click="editing = false">{{ t('legal.buttons.cancel') }}</UButton>
      </div>
    </form>
    <div v-else class="space-y-4">
      <p v-if="saved" role="status" class="text-teal-600">{{ t('showcase.legal.saved') }}</p>
      <p class="whitespace-pre-wrap break-words">{{ document.content }}</p>
      <div v-for="signer in document.signers" :key="signer.userId" class="flex justify-between text-sm">
        <span>{{ signer.name }}</span>
        <span>{{ t(signer.signed ? 'showcase.legal.signed' : 'showcase.legal.awaitingSignature') }}</span>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-wrap justify-between items-center gap-3">
        <UBadge variant="soft">{{ document.status === 'executed' ? t('showcase.legal.executed') : t(`legal.status.${document.status}`) }}</UBadge>
        <div class="flex gap-2">
          <UButton v-if="canEdit && !editing" variant="soft" @click="editDocument">{{ t('legal.buttons.edit') }}</UButton>
          <UButton v-if="canSign && !editing" @click="signDocument">{{ t('showcase.legal.sign') }}</UButton>
          <UButton v-if="!editing" variant="ghost" icon="i-heroicons-arrow-down-tray" @click="downloadDocument">{{ t('showcase.legal.download') }}</UButton>
          <UButton variant="ghost" @click="emit('close')">{{ t('legal.buttons.close') }}</UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>
