<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const features = computed(() => [
  {
    title: t('compass.features.values.title'),
    description: t('compass.features.values.description')
  },
  {
    title: t('compass.features.dimensions.title'),
    description: t('compass.features.dimensions.description')
  },
  {
    title: t('compass.features.structure.title'),
    description: t('compass.features.structure.description')
  }
])
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">{{ t('compass.title') }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            {{ t('compass.description') }}
          </p>
        </div>
        
        <AiImageContainer
          :prompt="sectionPrompts.compass.prompt"
          aspectRatio="landscape"
          :alt="t('compass.imageAlt')"
          shadow="lg"
          class="h-80 w-full"
        />
        
        <div class="grid gap-4 md:grid-cols-3">
          <UCard v-for="feature in features" :key="feature.title" class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ feature.description }}</p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
