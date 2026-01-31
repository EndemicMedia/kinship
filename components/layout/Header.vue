<script setup lang="ts">
import { ref, computed } from 'vue'

const { t } = useI18n()

const mobileMenuOpen = ref(false)

const navigation = computed(() => [
  { name: t('header.nav.howItWorks'), href: '#how-it-works' },
  { name: t('header.nav.features'), href: '#features' },
  { name: t('header.nav.about'), href: '#about' }
])
</script>

<template>
  <header class="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/80">
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
            class="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            {{ item.name }}
          </a>
          <UButton color="primary" size="sm">
            {{ t('header.cta') }}
          </UButton>
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
          <UButton color="primary" size="sm" class="w-full">
            {{ t('header.cta') }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </header>

  <!-- Spacer to prevent content from going under fixed header -->
  <div class="h-[73px]" />
</template>
