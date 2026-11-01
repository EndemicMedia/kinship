<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth']
})

const { t } = useI18n()
const localePath = useLocalePath()

const url = 'https://endemicmedia.github.io/kinship/app/login'

useSeoMeta({
  title: () => t('seo.app.login.title'),
  description: () => t('seo.app.login.description'),
  ogTitle: () => t('seo.app.login.title'),
  ogDescription: () => t('seo.app.login.description'),
  ogType: 'website',
  ogUrl: url,
  twitterTitle: () => t('seo.app.login.title'),
  twitterDescription: () => t('seo.app.login.description'),
  twitterCard: 'summary_large_image'
})

useHead(() => ({
  link: [
    { rel: 'canonical', href: url }
  ]
}))

const authStore = useAuthStore()
const router = useRouter()

const state = reactive({
  email: '',
  password: ''
})
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  if (loading.value || authStore.loading) return
  loading.value = true
  error.value = ''

  try {
    const success = await authStore.login(state.email, state.password)
    if (success) {
      await router.push(localePath('/app'))
    } else {
      error.value = t('loginPage.error')
    }
  } catch {
    error.value = t('showcase.auth.storageError')
  } finally {
    loading.value = false
  }
}

async function demoLogin() {
  if (loading.value || authStore.loading) return
  loading.value = true
  try {
    await authStore.demoLogin()
    if (authStore.isLoggedIn) await router.push(localePath('/app'))
  } catch {
    error.value = t('showcase.auth.storageError')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <img src="/logo.png" alt="Kinship" class="h-12 w-12 mx-auto mb-4" />
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">{{ t('loginPage.welcomeTitle') }}</h1>
          <p class="text-slate-600 dark:text-slate-400 mt-2">{{ t('loginPage.welcomeSubtitle') }}</p>
        </div>
      </template>

      <UForm :state="state" @submit="handleLogin" class="space-y-4">
        <UFormGroup :label="t('loginPage.email')" name="email">
          <UInput
            v-model="state.email"
            type="email"
            :placeholder="t('loginPage.emailPlaceholder')"
            icon="i-heroicons-envelope"
            required
          />
        </UFormGroup>

        <UFormGroup :label="t('loginPage.password')" name="password">
          <UInput
            v-model="state.password"
            type="password"
            :placeholder="t('loginPage.passwordPlaceholder')"
            icon="i-heroicons-lock-closed"
            required
          />
        </UFormGroup>

        <UAlert
          v-if="error"
          :title="error"
          color="red"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
        />

        <UAlert
          v-if="authStore.storageError"
          :title="t('showcase.auth.storageErrorTitle')"
          :description="t(`showcase.auth.storageErrors.${authStore.storageError}`)"
          color="amber"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          role="alert"
        />

        <UButton
          type="submit"
          color="primary"
          size="lg"
          block
          :loading="loading"
        >
          {{ t('loginPage.signIn') }}
        </UButton>
      </UForm>

      <UDivider :label="t('loginPage.or')" class="my-6" />

      <UButton
        color="gray"
        variant="soft"
        size="lg"
        block
        @click="demoLogin"
        :loading="loading"
      >
        {{ t('loginPage.demoUser') }}
      </UButton>

      <p class="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        {{ t('loginPage.demoCredentials') }}
      </p>
    </UCard>
  </div>
</template>
