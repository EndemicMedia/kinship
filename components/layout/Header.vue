<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { withBase } from 'ufo'

const { t } = useI18n()
const interactiveReady = useState('interactive-ready', () => false)
const mobileMenuOpen = ref(false)
const menuToggle = ref<HTMLButtonElement | null>(null)
const topic = ref<string | null>(null)
const localePath = useLocalePath()
const route = useRoute()
const baseURL = useRuntimeConfig().app.baseURL
const home = computed(() => localePath('/'))
const login = computed(() => localePath('/app/login'))

function closeMenu(event: KeyboardEvent) {
  if (event.key === 'Escape' && mobileMenuOpen.value) {
    mobileMenuOpen.value = false
    menuToggle.value?.focus()
  }
}
onMounted(() => document.addEventListener('keydown', closeMenu))
onBeforeUnmount(() => document.removeEventListener('keydown', closeMenu))
watch(() => route.fullPath, () => { mobileMenuOpen.value = false })

function showInfo(value: string, event: MouseEvent) {
  if (mobileMenuOpen.value) menuToggle.value?.focus()
  else if (event.currentTarget instanceof HTMLElement) event.currentTarget.focus()
  mobileMenuOpen.value = false
  topic.value = value
}

const navigation = computed(() => [
  { name: t('header.nav.mission'), href: `${home.value}#mission` },
  { name: t('header.nav.features'), href: `${home.value}#features` },
  { name: t('header.nav.howItWorks'), href: `${home.value}#how-it-works` }
])

const downloadLinks = computed(() => [
  { name: t('header.download.appStore'), icon: 'i-heroicons-device-phone-mobile' },
  { name: t('header.download.playStore'), icon: 'i-heroicons-play' }
])
</script>

<template>
  <header class="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-xl dark:bg-slate-950/90">
    <UContainer>
      <nav class="flex items-center justify-between py-4" :aria-label="t('header.ariaLabel')">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <NuxtLink :to="home" class="flex items-center gap-3">
            <img :src="withBase('/logo.png', baseURL)" :alt="t('brand.name')" class="h-10 w-10" />
            <span class="text-xl font-semibold text-slate-900 dark:text-white">{{ t('brand.name') }}</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-8 md:flex">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-sm font-medium text-slate-600 transition-colors hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400"
          >
            {{ item.name }}
          </NuxtLink>
          <button type="button" :disabled="!interactiveReady" class="text-sm font-medium text-slate-600 hover:text-teal-600 dark:text-slate-300" @click="showInfo('about', $event)">{{ t('header.nav.about') }}</button>
          
          <!-- Download Buttons -->
          <div class="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
            <UButton
              v-for="link in downloadLinks"
              :key="link.name"
              :disabled="!interactiveReady"
              @click="showInfo('mobile', $event)"
              color="gray"
              variant="ghost"
              size="sm"
              :icon="link.icon"
              class="text-slate-600 dark:text-slate-300"
            >
              {{ link.name }}
            </UButton>
            <UButton color="primary" size="sm" class="ml-2" :to="login">
              {{ t('header.cta') }}
            </UButton>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          ref="menuToggle"
          :disabled="!interactiveReady"
          aria-controls="landing-mobile-menu"
          :aria-expanded="mobileMenuOpen"
          class="md:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-label="t('header.mobileToggle')"
        >
          <UIcon
            :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="h-6 w-6 text-slate-900 dark:text-white"
          />
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div
        v-show="mobileMenuOpen"
        id="landing-mobile-menu"
        class="border-t border-slate-200 pb-4 md:hidden dark:border-slate-800"
      >
        <div class="flex flex-col gap-4 pt-4">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-sm font-medium text-slate-600 dark:text-slate-300"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
          <button type="button" class="text-left text-sm font-medium text-slate-600 dark:text-slate-300" @click="showInfo('about', $event)">{{ t('header.nav.about') }}</button>
          <div class="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <UButton
              v-for="link in downloadLinks"
              :key="link.name"
              @click="showInfo('mobile', $event)"
              color="gray"
              variant="soft"
              size="sm"
              :icon="link.icon"
              class="flex-1"
            >
              {{ link.name }}
            </UButton>
          </div>
          <UButton color="primary" size="sm" class="w-full" :to="login" @click="mobileMenuOpen = false">
            {{ t('header.cta') }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </header>

  <!-- Spacer to prevent content from going under fixed header -->
  <div class="h-[73px]" />
  <LayoutInfoModal v-model:topic="topic" />
</template>
