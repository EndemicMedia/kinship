<script setup lang="ts">
import { computed } from 'vue'

const { t, locale, locales, setLocale } = useI18n()

const localeOptions = computed(() =>
  locales.value.map((item) => ({
    label: item.name,
    value: item.code
  }))
)
</script>

<template>
  <footer class="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-900">
    <UContainer>
      <div class="grid gap-8 md:grid-cols-4">
        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <img src="/logo.png" :alt="t('brand.name')" class="h-10 w-10" />
            <span class="text-xl font-semibold text-slate-900 dark:text-white">{{ t('brand.name') }}</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-300">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <!-- Product -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.product.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#features" class="hover:text-slate-900 dark:hover:text-white">{{ t('footer.product.features') }}</a></li>
            <li><a href="#how-it-works" class="hover:text-slate-900 dark:hover:text-white">{{ t('footer.product.howItWorks') }}</a></li>
            <li><a href="#pricing" class="hover:text-slate-900 dark:hover:text-white">{{ t('footer.product.pricing') }}</a></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.company.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#about" class="hover:text-slate-900 dark:hover:text-white">{{ t('footer.company.about') }}</a></li>
            <li><a href="#blog" class="hover:text-slate-900 dark:hover:text-white">{{ t('footer.company.blog') }}</a></li>
            <li><a href="#contact" class="hover:text-slate-900 dark:hover:text-white">{{ t('footer.company.contact') }}</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.legal.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="#privacy" class="hover:text-slate-900 dark:hover:text-white">{{ t('footer.legal.privacy') }}</a></li>
            <li><a href="#terms" class="hover:text-slate-900 dark:hover:text-white">{{ t('footer.legal.terms') }}</a></li>
          </ul>
        </div>
      </div>

      <div class="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-8 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300 md:flex-row md:items-center md:justify-between">
        <div class="flex items-center justify-center gap-3 md:justify-start">
          <span class="text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.language') }}</span>
          <USelect
            :model-value="locale"
            :options="localeOptions"
            size="sm"
            class="w-48"
            @update:model-value="setLocale"
          />
        </div>
        <p class="text-center md:text-right">&copy; {{ new Date().getFullYear() }} {{ t('brand.name') }}. {{ t('footer.rights') }}</p>
      </div>
    </UContainer>
  </footer>
</template>
