<script setup lang="ts">
import { computed } from 'vue'

const { t, locale, locales, setLocale } = useI18n()

const localeOptions = computed(() =>
  locales.value.map((item) => ({
    label: item.name,
    value: item.code
  }))
)

const socialLinks = [
  { name: 'LinkedIn', icon: 'i-heroicons-link', href: '#' },
  { name: 'Twitter', icon: 'i-heroicons-chat-bubble-oval-left-ellipsis', href: '#' },
  { name: 'Instagram', icon: 'i-heroicons-camera', href: '#' }
]
</script>

<template>
  <footer class="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
    <UContainer>
      <div class="grid gap-12 lg:grid-cols-5">
        <!-- Brand -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <img src="/logo.png" :alt="t('brand.name')" class="h-10 w-10" />
            <span class="text-xl font-semibold text-slate-900 dark:text-white">{{ t('brand.name') }}</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-300 max-w-sm">
            {{ t('footer.tagline') }}
          </p>
          
          <!-- Social Links -->
          <div class="flex gap-3 pt-2">
            <a 
              v-for="link in socialLinks" 
              :key="link.name"
              :href="link.href"
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-teal-100 hover:text-teal-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
              :aria-label="link.name"
            >
              <UIcon :name="link.icon" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <!-- Product -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.product.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#features" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.product.features') }}</a></li>
            <li><a href="#how-it-works" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.product.howItWorks') }}</a></li>
            <li><a href="#pricing" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.product.pricing') }}</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.company.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#about" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.company.about') }}</a></li>
            <li><a href="#blog" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.company.blog') }}</a></li>
            <li><a href="#contact" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.company.contact') }}</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.legal.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#privacy" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.legal.privacy') }}</a></li>
            <li><a href="#terms" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.legal.terms') }}</a></li>
            <li><a href="#cookies" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.legal.cookies') }}</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 flex flex-col gap-6 border-t border-slate-200 pt-8 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          &copy; {{ new Date().getFullYear() }} {{ t('brand.name') }}. {{ t('footer.rights') }}
        </p>
        
        <!-- Language Selector -->
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ t('footer.language') }}</span>
          <USelect
            :model-value="locale"
            :options="localeOptions"
            size="sm"
            class="w-40"
            @update:model-value="setLocale"
          />
        </div>
      </div>
    </UContainer>
  </footer>
</template>
