<script setup lang="ts">
import { ref, computed } from 'vue'

const { t } = useI18n()
const mobileMenuOpen = ref(false)

const navigation = computed(() => [
  { name: t('header.nav.mission'), href: '#mission' },
  { name: t('header.nav.features'), href: '#features' },
  { name: t('header.nav.howItWorks'), href: '#how-it-works' },
  { name: t('header.nav.about'), href: '#about' }
])

const downloadLinks = computed(() => [
  { name: t('header.download.appStore'), href: '/app/login', icon: 'i-heroicons-device-phone-mobile' },
  { name: t('header.download.playStore'), href: '/app/login', icon: 'i-heroicons-play' }
])
</script>

<template>
  <header class="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-xl dark:bg-slate-950/90">
    <UContainer>
      <nav class="flex items-center justify-between py-4" :aria-label="t('header.ariaLabel')">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <a href="/" class="flex items-center gap-3">
            <img src="/logo.png" :alt="t('brand.name')" class="h-10 w-10" />
            <span class="text-xl font-semibold text-slate-900 dark:text-white">{{ t('brand.name') }}</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-8 md:flex">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm font-medium text-slate-600 transition-colors hover:text-teal-600 dark:text-slate-300 dark:hover:text-teal-400"
          >
            {{ item.name }}
          </a>
          
          <!-- Download Buttons -->
          <div class="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
            <UButton
              v-for="link in downloadLinks"
              :key="link.name"
              :to="link.href"
              color="gray"
              variant="ghost"
              size="sm"
              :icon="link.icon"
              class="text-slate-600 dark:text-slate-300"
            >
              {{ link.name }}
            </UButton>
            <UButton color="primary" size="sm" class="ml-2" to="/app/login">
              {{ t('header.cta') }}
            </UButton>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          type="button"
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
        v-if="mobileMenuOpen"
        class="border-t border-slate-200 pb-4 md:hidden dark:border-slate-800"
      >
        <div class="flex flex-col gap-4 pt-4">
          <a
            v-for="item in navigation"
            :key="item.name"
            :href="item.href"
            class="text-sm font-medium text-slate-600 dark:text-slate-300"
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </a>
          <div class="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <UButton
              v-for="link in downloadLinks"
              :key="link.name"
              :to="link.href"
              color="gray"
              variant="soft"
              size="sm"
              :icon="link.icon"
              class="flex-1"
            >
              {{ link.name }}
            </UButton>
          </div>
          <UButton color="primary" size="sm" class="w-full" to="/app/login">
            {{ t('header.cta') }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </header>

  <!-- Spacer to prevent content from going under fixed header -->
  <div class="h-[73px]" />
</template>
