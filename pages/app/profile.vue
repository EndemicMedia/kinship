<script setup lang="ts">
import { mockUsers } from '~/data/mock-users'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const { t } = useI18n()

const url = 'https://endemicmedia.github.io/kinship/app/profile'

useSeoMeta(() => ({
  title: t('seo.app.profile.title'),
  description: t('seo.app.profile.description'),
  ogTitle: t('seo.app.profile.title'),
  ogDescription: t('seo.app.profile.description'),
  ogType: 'website',
  ogUrl: url,
  twitterTitle: t('seo.app.profile.title'),
  twitterDescription: t('seo.app.profile.description'),
  twitterCard: 'summary',
}))

useHead(() => ({
  link: [
    { rel: 'canonical', href: url }
  ]
}))

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const showEditModal = ref(false)

const openSettings = () => {
  router.push('/app/settings')
}

const editName = ref(authStore.currentUser?.name || '')
const editBio = ref(authStore.currentUser?.bio || '')

const saveProfile = () => {
  if (authStore.currentUser) {
    authStore.updateUser({
      name: editName.value,
      bio: editBio.value
    })
    
    toast.add({
      title: t('profile.profileUpdated'),
      description: t('profile.profileUpdatedDesc'),
      color: 'success',
      icon: 'i-heroicons-user'
    })
    showEditModal.value = false
  }
}

const switchPersona = (index: number) => {
  authStore.switchPersona(index)
}

const logout = () => {
  authStore.logout()
  navigateTo('/app/login')
}

const showComingSoon = () => {
  // Show a toast or alert
  alert('This feature is coming soon!')
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('profile.title') }}</h1>
    
    <!-- Current User Profile -->
    <UCard v-if="authStore.currentUser">
      <div class="flex items-start gap-6">
        <UAvatar :src="authStore.currentUser.avatar" :alt="authStore.currentUser.name" size="2xl" />
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h2 class="text-xl font-bold">{{ authStore.currentUser.name }}</h2>
            <UBadge color="primary" variant="soft">
              {{ authStore.currentUser.role.replace('-', ' ') }}
            </UBadge>
          </div>
          <p class="text-slate-600 dark:text-slate-400 mb-4">{{ authStore.currentUser.bio }}</p>
          
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-slate-500">{{ t('profile.labels.location') }}:</span>
              <span class="ml-2">{{ authStore.currentUser.location }}</span>
            </div>
            <div>
              <span class="text-slate-500">{{ t('profile.labels.pronouns') }}:</span>
              <span class="ml-2">{{ authStore.currentUser.pronouns }}</span>
            </div>
            <div>
              <span class="text-slate-500">{{ t('profile.labels.children') }}:</span>
              <span class="ml-2">{{ authStore.currentUser.children }}</span>
            </div>
            <div>
              <span class="text-slate-500">{{ t('profile.labels.languages') }}:</span>
              <span class="ml-2">{{ authStore.currentUser.languages.join(', ') }}</span>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Demo Personas -->
    <UCard>
      <template #header>
        <h3 class="font-semibold">{{ t('profile.switchPersona') }}</h3>
      </template>
      <div class="space-y-3">
        <div
          v-for="(user, index) in mockUsers"
          :key="user.id"
          class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
          :class="authStore.currentUser?.id === user.id ? 'bg-teal-50 dark:bg-teal-900/20 border border-teal-200' : 'hover:bg-slate-50 dark:hover:bg-slate-800'"
          @click="switchPersona(index)"
        >
          <div class="flex items-center gap-3">
            <UAvatar :src="user.avatar" :alt="user.name" size="md" />
            <div>
              <p class="font-medium">{{ user.name }}</p>
              <p class="text-sm text-slate-500">{{ user.role.replace('-', ' ') }}</p>
            </div>
          </div>
          <UIcon
            v-if="authStore.currentUser?.id === user.id"
            name="i-heroicons-check-circle"
            class="w-5 h-5 text-teal-500"
          />
        </div>
      </div>
    </UCard>

    <!-- Actions -->
    <UCard>
      <div class="space-y-3">
        <UButton block variant="soft" icon="i-heroicons-pencil-square" @click="showEditModal = true">
          {{ t('profile.editProfile') }}
        </UButton>
        <UButton block variant="soft" icon="i-heroicons-cog-6-tooth" @click="openSettings">
          {{ t('profile.settings') }}
        </UButton>
        <UButton block color="rose" variant="soft" icon="i-heroicons-arrow-right-on-rectangle" @click="logout">
          {{ t('profile.logOut') }}
        </UButton>
      </div>
    </UCard>
  </div>

  <!-- Edit Profile Modal -->
  <UModal v-model="showEditModal" :ui="{ width: 'w-full sm:max-w-lg' }">
    <UCard>
      <template #header>
        <h3 class="font-semibold text-lg">{{ t('profile.editModal.title') }}</h3>
      </template>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('profile.labels.name') }}</label>
          <UInput v-model="editName" :placeholder="t('profile.editModal.namePlaceholder')" autofocus />
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">{{ t('profile.labels.bio') }}</label>
          <UTextarea v-model="editBio" :placeholder="t('profile.editModal.bioPlaceholder')" :rows="4" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton variant="ghost" @click="showEditModal = false">{{ t('profile.editModal.cancel') }}</UButton>
          <UButton 
            color="primary" 
            icon="i-heroicons-user"
            @click="saveProfile"
          >
            {{ t('profile.editModal.saveChanges') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
