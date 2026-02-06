<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const features = [
  { icon: 'i-heroicons-hand-raised', title: t('governance.cards.consent.title'), description: t('governance.cards.consent.description') },
  { icon: 'i-heroicons-users', title: t('governance.cards.responsibility.title'), description: t('governance.cards.responsibility.description') },
  { icon: 'i-heroicons-arrow-right-on-rectangle', title: t('governance.cards.exit.title'), description: t('governance.cards.exit.description') }
]
</script>

<template>
  <section class="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
    <UContainer>
      <div class="space-y-12">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <!-- Content -->
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
              <UIcon name="i-heroicons-scale" class="h-4 w-4" />
              {{ t('governance.badge') }}
            </div>
            <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {{ t('governance.title') }}
            </h2>
            <p class="text-lg text-slate-600 dark:text-slate-300">
              {{ t('governance.description') }}
            </p>
          </div>
          
          <!-- Image -->
          <div class="relative">
            <AiImageContainer
              :prompt="sectionPrompts.governance.prompt"
              aspectRatio="square"
              :alt="t('governance.imageAlt')"
              shadow="xl"
              class="h-[350px] w-full rounded-2xl lg:h-[400px]"
            />
            <!-- Decorative element -->
            <div class="absolute -bottom-6 -right-6 h-full w-full rounded-2xl border-2 border-teal-200/50 dark:border-teal-800/50 -z-10" />
          </div>
        </div>
        
        <!-- Feature cards -->
        <div class="grid gap-6 md:grid-cols-3">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm"
          >
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30">
              <UIcon :name="feature.icon" class="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
