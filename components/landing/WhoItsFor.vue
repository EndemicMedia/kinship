<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()

const audience = computed(() => [
  t('whoItsFor.audience.intentional'),
  t('whoItsFor.audience.queer'),
  t('whoItsFor.audience.singleParents'),
  t('whoItsFor.audience.friends'),
  t('whoItsFor.audience.contributors'),
  t('whoItsFor.audience.clarity')
])
</script>

<template>
  <section class="py-16 bg-slate-50/70 dark:bg-slate-900/40">
    <UContainer>
      <div class="space-y-10">
        <div class="max-w-3xl space-y-4">
          <p class="text-sm font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-300">
            {{ t('whoItsFor.eyebrow') }}
          </p>
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">
            {{ t('whoItsFor.title') }}
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-300">
            {{ t('whoItsFor.description') }}
          </p>
        </div>

        <div class="grid gap-4 lg:grid-cols-2">
          <UCard class="bg-white/80 dark:bg-slate-900">
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ t('whoItsFor.quotes.primary') }}</p>
          </UCard>
          <UCard class="bg-white/80 dark:bg-slate-900">
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ t('whoItsFor.quotes.secondary') }}</p>
          </UCard>
        </div>

        <UCard class="border border-amber-200 bg-amber-50/80 dark:border-amber-700/60 dark:bg-amber-950/40">
          <p class="text-sm font-semibold text-amber-900 dark:text-amber-200">
            {{ t('whoItsFor.notFor') }}
          </p>
        </UCard>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <UCard v-for="item in audience" :key="item" class="bg-white dark:bg-slate-900">
            <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ item }}</p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
