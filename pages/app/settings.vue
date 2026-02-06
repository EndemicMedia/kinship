<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { t } = useI18n()

const url = 'https://endemicmedia.github.io/kinship/app/settings'

useSeoMeta(() => ({
  title: t('seo.app.settings.title'),
  description: t('seo.app.settings.description'),
  ogTitle: t('seo.app.settings.title'),
  ogDescription: t('seo.app.settings.description'),
  ogType: 'website',
  ogUrl: url,
  twitterTitle: t('seo.app.settings.title'),
  twitterDescription: t('seo.app.settings.description'),
  twitterCard: 'summary',
}))

useHead(() => ({
  link: [
    { rel: 'canonical', href: url }
  ]
}))

const toast = useToast()
const router = useRouter()

// Notifications settings
const emailNotifications = ref(true)
const pushNotifications = ref(true)
const weeklyDigest = ref(true)

const saveSettings = () => {
  toast.add({
    title: t('settings.toasts.settingsSaved'),
    description: t('settings.toasts.settingsSavedDesc'),
    color: 'success',
    icon: 'i-heroicons-cog-6-tooth'
  })
}

const changePassword = () => {
  toast.add({
    title: t('settings.toasts.passwordReset'),
    description: t('settings.toasts.passwordResetDesc'),
    color: 'success',
    icon: 'i-heroicons-lock-closed'
  })
}

const openPrivacySettings = () => {
  toast.add({
    title: t('settings.toasts.privacy'),
    description: t('settings.toasts.privacyDesc'),
    color: 'info',
    icon: 'i-heroicons-shield-check'
  })
}

const deleteAccount = () => {
  toast.add({
    title: t('settings.toasts.accountDeletion'),
    description: t('settings.toasts.accountDeletionDesc'),
    color: 'warning',
    icon: 'i-heroicons-exclamation-triangle'
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <UButton variant="ghost" icon="i-heroicons-arrow-left" @click="router.push('/app/profile')">
        {{ t('settings.backToProfile') }}
      </UButton>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('settings.title') }}</h1>
    </div>

    <!-- Notifications -->
    <UCard>
      <template #header>
        <h3 class="font-semibold">{{ t('settings.notifications') }}</h3>
      </template>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">{{ t('settings.emailNotifications.label') }}</p>
            <p class="text-sm text-slate-500">{{ t('settings.emailNotifications.description') }}</p>
          </div>
          <UToggle v-model="emailNotifications" />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">{{ t('settings.pushNotifications.label') }}</p>
            <p class="text-sm text-slate-500">{{ t('settings.pushNotifications.description') }}</p>
          </div>
          <UToggle v-model="pushNotifications" />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">{{ t('settings.weeklyDigest.label') }}</p>
            <p class="text-sm text-slate-500">{{ t('settings.weeklyDigest.description') }}</p>
          </div>
          <UToggle v-model="weeklyDigest" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton color="primary" @click="saveSettings">{{ t('settings.saveSettings') }}</UButton>
        </div>
      </template>
    </UCard>

    <!-- Account -->
    <UCard>
      <template #header>
        <h3 class="font-semibold">{{ t('settings.account') }}</h3>
      </template>

      <div class="space-y-3">
        <UButton block variant="soft" icon="i-heroicons-lock-closed" @click="changePassword">
          {{ t('settings.changePassword') }}
        </UButton>
        <UButton block variant="soft" icon="i-heroicons-shield-check" @click="openPrivacySettings">
          {{ t('settings.privacySettings') }}
        </UButton>
        <UButton block color="rose" variant="soft" icon="i-heroicons-trash" @click="deleteAccount">
          {{ t('settings.deleteAccount') }}
        </UButton>
      </div>
    </UCard>
  </div>
</template>
