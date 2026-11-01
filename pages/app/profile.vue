<script setup lang="ts">
import { mockUsers } from '~/data/mock-users'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const uiStore = useUIStore()
const router = useRouter()
const showEditModal = ref(false)
const editName = ref('')
const editBio = ref('')

const url = 'https://endemicmedia.github.io/kinship/app/profile'
useSeoMeta({
  title: () => t('seo.app.profile.title'),
  description: () => t('seo.app.profile.description'),
  ogTitle: () => t('seo.app.profile.title'),
  ogDescription: () => t('seo.app.profile.description'),
  ogType: 'website',
  ogUrl: url,
  twitterTitle: () => t('seo.app.profile.title'),
  twitterDescription: () => t('seo.app.profile.description'),
  twitterCard: 'summary_large_image'
})
useHead(() => ({ link: [{ rel: 'canonical', href: url }] }))

watch(() => authStore.currentUser, (user) => {
  editName.value = user?.name ?? ''
  editBio.value = user?.bio ?? ''
}, { immediate: true })

function saveProfile() {
  if (!authStore.currentUser || !editName.value.trim()) return
  authStore.updateUser({ name: editName.value.trim(), bio: editBio.value.trim() })
  uiStore.showToast({
    title: t('profile.profileUpdated'),
    description: t('profile.profileUpdatedDesc'),
    color: 'success'
  })
  showEditModal.value = false
}

async function switchPersona(index: number) {
  await authStore.switchPersona(index)
}

function logout() {
  authStore.logout()
  navigateTo(localePath('/app/login'))
}

function openEditor() {
  editName.value = authStore.currentUser?.name ?? ''
  editBio.value = authStore.currentUser?.bio ?? ''
  showEditModal.value = true
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('profile.title') }}</h1>

    <UCard v-if="authStore.currentUser">
      <div class="flex flex-col sm:flex-row items-start gap-6">
        <UAvatar :src="authStore.currentUser.avatar" :alt="authStore.currentUser.name" size="2xl" />
        <div class="flex-1 min-w-0">
          <div class="flex flex-wrap items-center gap-3 mb-2">
            <h2 class="text-xl font-bold">{{ authStore.currentUser.name }}</h2>
            <UBadge color="primary" variant="soft">{{ authStore.currentUser.role.replace(/-/g, ' ') }}</UBadge>
          </div>
          <p class="text-slate-600 dark:text-slate-400 mb-4">{{ authStore.currentUser.bio }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div><span class="text-slate-500">{{ t('profile.labels.location') }}:</span><span class="ml-2">{{ authStore.currentUser.location }}</span></div>
            <div><span class="text-slate-500">{{ t('profile.labels.pronouns') }}:</span><span class="ml-2">{{ authStore.currentUser.pronouns }}</span></div>
            <div><span class="text-slate-500">{{ t('profile.labels.children') }}:</span><span class="ml-2">{{ authStore.currentUser.children }}</span></div>
            <div><span class="text-slate-500">{{ t('profile.labels.languages') }}:</span><span class="ml-2">{{ authStore.currentUser.languages.join(', ') }}</span></div>
          </div>
        </div>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="font-semibold">{{ t('profile.switchPersona') }}</h3>
        <p class="mt-1 text-sm text-slate-500">{{ t('showcase.profile.personaHint') }}</p>
      </template>
      <div class="grid gap-3 sm:grid-cols-2">
        <button
          v-for="(user, index) in mockUsers"
          :key="user.id"
          type="button"
          class="flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500"
          :aria-pressed="authStore.currentUser?.id === user.id"
          :class="authStore.currentUser?.id === user.id
            ? 'border-teal-300 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/20'
            : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'"
          @click="switchPersona(index)"
        >
          <span class="flex min-w-0 items-center gap-3">
            <UAvatar :src="user.avatar" :alt="user.name" size="md" />
            <span class="min-w-0">
              <span class="block truncate font-medium">{{ user.name }}</span>
              <span class="block text-sm text-slate-500">{{ user.role.replace(/-/g, ' ') }}</span>
            </span>
          </span>
          <UIcon v-if="authStore.currentUser?.id === user.id" name="i-heroicons-check-circle" class="h-5 w-5 shrink-0 text-teal-600" />
        </button>
      </div>
    </UCard>

    <UCard>
      <div class="space-y-3">
        <UButton block variant="soft" icon="i-heroicons-pencil-square" @click="openEditor">{{ t('profile.editProfile') }}</UButton>
        <UButton block variant="soft" icon="i-heroicons-cog-6-tooth" @click="router.push(localePath('/app/settings'))">{{ t('profile.settings') }}</UButton>
        <UButton block color="rose" variant="soft" icon="i-heroicons-arrow-right-on-rectangle" @click="logout">{{ t('profile.logOut') }}</UButton>
      </div>
    </UCard>

    <UModal v-model="showEditModal" :ui="{ width: 'w-full sm:max-w-lg' }">
      <UCard>
        <template #header><h3 class="font-semibold text-lg">{{ t('profile.editModal.title') }}</h3></template>
        <div class="space-y-4">
          <div>
            <label for="profile-name" class="mb-2 block text-sm font-medium">{{ t('profile.labels.name') }}</label>
            <UInput id="profile-name" v-model="editName" :placeholder="t('profile.editModal.namePlaceholder')" autofocus />
          </div>
          <div>
            <label for="profile-bio" class="mb-2 block text-sm font-medium">{{ t('profile.labels.bio') }}</label>
            <UTextarea id="profile-bio" v-model="editBio" :placeholder="t('profile.editModal.bioPlaceholder')" :rows="4" />
          </div>
        </div>
        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton variant="ghost" @click="showEditModal = false">{{ t('profile.editModal.cancel') }}</UButton>
            <UButton color="primary" icon="i-heroicons-user" :disabled="!editName.trim()" @click="saveProfile">{{ t('profile.editModal.saveChanges') }}</UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
