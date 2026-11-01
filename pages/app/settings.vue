<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUIStore()
const preferencesStore = usePreferencesStore()
const preferences = computed(() => preferencesStore.activePreferences)
const activeWorkflow = ref<'password' | 'privacy' | 'delete' | null>(null)
const isWorkflowOpen = computed({
  get: () => activeWorkflow.value !== null,
  set: (isOpen: boolean) => {
    if (!isOpen) closeWorkflow()
  }
})
const currentPassword = ref('')
const newPassword = ref('')
const deleteConfirmation = ref('')
const workflowComplete = ref(false)
const privacyDraft = reactive({ discoverable: true, shareMatchBreakdown: true })
const privacyOriginal = reactive({ discoverable: true, shareMatchBreakdown: true })

const url = 'https://endemicmedia.github.io/kinship/app/settings'
useSeoMeta({
  title: () => t('seo.app.settings.title'),
  description: () => t('seo.app.settings.description'),
  ogTitle: () => t('seo.app.settings.title'),
  ogDescription: () => t('seo.app.settings.description'),
  ogType: 'website',
  ogUrl: url,
  twitterTitle: () => t('seo.app.settings.title'),
  twitterDescription: () => t('seo.app.settings.description'),
  twitterCard: 'summary_large_image'
})
useHead(() => ({ link: [{ rel: 'canonical', href: url }] }))

watch(() => authStore.currentUser?.id, (id) => {
  if (id) preferencesStore.loadForPersona(id)
}, { immediate: true })

function openWorkflow(workflow: 'password' | 'privacy' | 'delete') {
  activeWorkflow.value = workflow
  workflowComplete.value = false
  currentPassword.value = ''
  newPassword.value = ''
  deleteConfirmation.value = ''
  if (workflow === 'privacy') {
    privacyDraft.discoverable = preferences.value.discoverable
    privacyDraft.shareMatchBreakdown = preferences.value.shareMatchBreakdown
    privacyOriginal.discoverable = preferences.value.discoverable
    privacyOriginal.shareMatchBreakdown = preferences.value.shareMatchBreakdown
  }
}

function closeWorkflow() {
  if (activeWorkflow.value === 'privacy' && !workflowComplete.value) {
    preferences.value.discoverable = privacyOriginal.discoverable
    preferences.value.shareMatchBreakdown = privacyOriginal.shareMatchBreakdown
  }
  activeWorkflow.value = null
  workflowComplete.value = false
}

function saveSettings() {
  const saved = preferencesStore.save()
  uiStore.showToast({
    title: t(saved ? 'settings.toasts.settingsSaved' : 'showcase.settings.storageFailed'),
    description: t(saved ? 'settings.toasts.settingsSavedDesc' : 'showcase.settings.storageFailedDescription'),
    color: saved ? 'success' : 'error'
  })
}

function completeWorkflow() {
  if (activeWorkflow.value === 'password' && (!currentPassword.value || newPassword.value.length < 8)) return
  if (activeWorkflow.value === 'privacy') {
    preferences.value.discoverable = privacyDraft.discoverable
    preferences.value.shareMatchBreakdown = privacyDraft.shareMatchBreakdown
    if (!preferencesStore.save()) {
      uiStore.showToast({
        title: t('showcase.settings.storageFailed'),
        description: t('showcase.settings.storageFailedDescription'),
        color: 'error'
      })
      return
    }
  }
  if (activeWorkflow.value === 'delete' && deleteConfirmation.value !== 'DELETE') return
  workflowComplete.value = true
  if (activeWorkflow.value === 'password') {
    uiStore.showToast({
      title: t('showcase.settings.passwordCompleteTitle'),
      description: t('showcase.settings.passwordCompleteDescription'),
      color: 'success'
    })
  } else if (activeWorkflow.value === 'privacy') {
    uiStore.showToast({
      title: t('showcase.settings.privacyCompleteTitle'),
      description: t('showcase.settings.privacyCompleteDescription'),
      color: 'success'
    })
  } else {
    uiStore.showToast({
      title: t('showcase.settings.deleteCompleteTitle'),
      description: t('showcase.settings.deleteCompleteDescription'),
      color: 'warning'
    })
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center gap-4">
      <UButton variant="ghost" icon="i-heroicons-arrow-left" @click="router.push(localePath('/app/profile'))">{{ t('settings.backToProfile') }}</UButton>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('settings.title') }}</h1>
    </div>

    <UAlert
      v-if="preferencesStore.storageError"
      color="red"
      variant="soft"
      icon="i-heroicons-exclamation-triangle"
      :title="t('showcase.settings.storageErrorTitle')"
      :description="t(`showcase.settings.storageErrors.${preferencesStore.storageError}`)"
      role="alert"
    />

    <UCard>
      <template #header>
        <h3 class="font-semibold">{{ t('settings.notifications') }}</h3>
        <p class="mt-1 text-sm text-slate-500">{{ t('showcase.settings.personaHint', { name: authStore.currentUser?.name ?? '' }) }}</p>
      </template>
      <div class="space-y-5">
        <div class="flex items-center justify-between gap-4">
          <div><p class="font-medium">{{ t('settings.emailNotifications.label') }}</p><p class="text-sm text-slate-500">{{ t('settings.emailNotifications.description') }}</p></div>
          <UToggle v-model="preferences.emailNotifications" :aria-label="t('settings.emailNotifications.label')" />
        </div>
        <div class="flex items-center justify-between gap-4">
          <div><p class="font-medium">{{ t('settings.pushNotifications.label') }}</p><p class="text-sm text-slate-500">{{ t('settings.pushNotifications.description') }}</p></div>
          <UToggle v-model="preferences.pushNotifications" :aria-label="t('settings.pushNotifications.label')" />
        </div>
        <div class="flex items-center justify-between gap-4">
          <div><p class="font-medium">{{ t('settings.weeklyDigest.label') }}</p><p class="text-sm text-slate-500">{{ t('settings.weeklyDigest.description') }}</p></div>
          <UToggle v-model="preferences.weeklyDigest" :aria-label="t('settings.weeklyDigest.label')" />
        </div>
      </div>
      <template #footer><div class="flex justify-end"><UButton color="primary" @click="saveSettings">{{ t('settings.saveSettings') }}</UButton></div></template>
    </UCard>

    <UCard>
      <template #header><h3 class="font-semibold">{{ t('settings.account') }}</h3></template>
      <div class="space-y-3">
        <UButton block variant="soft" icon="i-heroicons-lock-closed" @click="openWorkflow('password')">{{ t('settings.changePassword') }}</UButton>
        <UButton block variant="soft" icon="i-heroicons-shield-check" @click="openWorkflow('privacy')">{{ t('settings.privacySettings') }}</UButton>
        <UButton block color="rose" variant="soft" icon="i-heroicons-trash" @click="openWorkflow('delete')">{{ t('settings.deleteAccount') }}</UButton>
      </div>
    </UCard>

    <UModal v-model="isWorkflowOpen" :ui="{ width: 'w-full sm:max-w-lg' }">
      <UCard>
        <template #header>
          <h2 class="text-lg font-semibold">
            {{ activeWorkflow === 'password' ? t('settings.changePassword') : activeWorkflow === 'privacy' ? t('settings.privacySettings') : t('settings.deleteAccount') }}
          </h2>
        </template>

        <UAlert
          v-if="workflowComplete"
          :color="activeWorkflow === 'delete' ? 'amber' : 'green'"
          variant="soft"
          icon="i-heroicons-information-circle"
          :title="t('showcase.settings.workflowCompleteTitle')"
          :description="t('showcase.settings.workflowCompleteDescription')"
          role="status"
        />
        <UAlert
          v-else-if="preferencesStore.storageError && activeWorkflow === 'privacy'"
          color="red"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          :title="t('showcase.settings.storageErrorTitle')"
          :description="t(`showcase.settings.storageErrors.${preferencesStore.storageError}`)"
          role="alert"
        />
        <div v-else-if="activeWorkflow === 'password'" class="space-y-4">
          <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('showcase.settings.passwordHint') }}</p>
          <UFormGroup :label="t('showcase.settings.currentPassword')"><UInput v-model="currentPassword" type="password" autocomplete="current-password" /></UFormGroup>
          <UFormGroup :label="t('showcase.settings.newPassword')"><UInput v-model="newPassword" type="password" autocomplete="new-password" /></UFormGroup>
          <p class="text-xs text-slate-500">{{ t('showcase.settings.passwordMinimum') }}</p>
        </div>
        <div v-else-if="activeWorkflow === 'privacy'" class="space-y-5">
          <p class="text-sm text-slate-600 dark:text-slate-400">{{ t('showcase.settings.privacyHint') }}</p>
          <div class="flex items-center justify-between gap-4">
            <label for="privacy-discoverable" class="font-medium">{{ t('showcase.settings.discoverable') }}</label>
            <UToggle id="privacy-discoverable" v-model="privacyDraft.discoverable" />
          </div>
          <div class="flex items-center justify-between gap-4">
            <label for="privacy-match-breakdown" class="font-medium">{{ t('showcase.settings.shareMatchBreakdown') }}</label>
            <UToggle id="privacy-match-breakdown" v-model="privacyDraft.shareMatchBreakdown" />
          </div>
        </div>
        <div v-else-if="activeWorkflow === 'delete'" class="space-y-4">
          <UAlert color="amber" variant="soft" icon="i-heroicons-exclamation-triangle" :title="t('showcase.settings.deleteWarning')" :description="t('showcase.settings.simulatedOnly')" />
          <UFormGroup :label="t('showcase.settings.deleteConfirmationLabel')">
            <UInput v-model="deleteConfirmation" autocomplete="off" />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex flex-wrap justify-end gap-3">
            <UButton variant="ghost" @click="closeWorkflow">{{ workflowComplete ? t('showcase.settings.done') : t('showcase.settings.cancel') }}</UButton>
            <UButton
              v-if="!workflowComplete"
              :color="activeWorkflow === 'delete' ? 'rose' : 'primary'"
              :disabled="activeWorkflow === 'password' ? !currentPassword || newPassword.length < 8 : activeWorkflow === 'delete' ? deleteConfirmation !== 'DELETE' : false"
              @click="completeWorkflow"
            >
              {{ activeWorkflow === 'password' ? t('showcase.settings.submitPassword') : activeWorkflow === 'privacy' ? t('showcase.settings.savePrivacy') : t('showcase.settings.confirmDelete') }}
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
