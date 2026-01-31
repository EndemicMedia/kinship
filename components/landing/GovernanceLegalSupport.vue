<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <!-- Header with image -->
        <div class="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">{{ t('governance.title') }}</h2>
            <p class="mt-3 text-slate-600 dark:text-slate-300">
              {{ t('governance.description') }}
            </p>
          </div>
          <AiImageContainer
            :prompt="sectionPrompts.governance.prompt"
            aspectRatio="landscape"
            :alt="t('governance.imageAlt')"
            shadow="lg"
            class="h-64 w-full"
          />
        </div>
        
        <!-- Feature cards -->
        <div class="grid gap-4 lg:grid-cols-3">
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ t('governance.cards.consent.title') }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {{ t('governance.cards.consent.description') }}
            </p>
          </UCard>
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ t('governance.cards.responsibility.title') }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {{ t('governance.cards.responsibility.description') }}
            </p>
          </UCard>
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ t('governance.cards.exit.title') }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {{ t('governance.cards.exit.description') }}
            </p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
