<script setup lang="ts">
definePageMeta({ layout: 'app', middleware: ['auth'] })

const { t } = useI18n()
const localePath = useLocalePath()
const crewsStore = useCrewsStore()
const authStore = useAuthStore()
const router = useRouter()
const name = ref('')
const description = ref('')
const submitted = ref(false)
const nameError = computed(() => name.value.trim().length < 3 || name.value.trim().length > 80 ? t('showcase.crews.nameError') : '')
const descriptionError = computed(() => !description.value.trim() || description.value.trim().length > 1000 ? t('showcase.crews.descriptionError') : '')

function createCrew() {
  submitted.value = true
  if (nameError.value || descriptionError.value || !authStore.currentUser) return
  const crew = crewsStore.createCrew(name.value, description.value, authStore.currentUser)
  if (crew) router.push(localePath({ path: '/app/crews/detail', query: { id: crew.id } }))
}
</script>

<template>
  <div class="max-w-2xl space-y-6">
    <UButton :to="localePath('/app/crews')" variant="ghost" icon="i-heroicons-arrow-left">{{ t('crewDetail.back') }}</UButton>
    <h1 class="text-2xl font-bold">{{ t('showcase.crews.create') }}</h1>
    <UCard>
      <form class="space-y-4" @submit.prevent="createCrew">
        <UFormGroup :label="t('showcase.crews.name')" name="name" :error="submitted ? nameError : undefined">
          <UInput v-model="name" :aria-label="t('showcase.crews.name')" maxlength="80" autofocus />
        </UFormGroup>
        <UFormGroup :label="t('showcase.crews.description')" name="description" :error="submitted ? descriptionError : undefined">
          <UTextarea v-model="description" :aria-label="t('showcase.crews.description')" maxlength="1000" />
        </UFormGroup>
        <p class="text-sm text-slate-500">{{ t('showcase.crews.creatorMembership') }}</p>
        <div class="flex gap-3">
          <UButton type="submit">{{ t('showcase.crews.create') }}</UButton>
          <UButton :to="localePath('/app/crews')" variant="ghost">{{ t('legal.buttons.cancel') }}</UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>
