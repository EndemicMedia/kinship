<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const features = computed(() => [
  {
    icon: 'i-heroicons-compass',
    title: t('compass.features.values.title'),
    description: t('compass.features.values.description')
  },
  {
    icon: 'i-heroicons-squares-2x2',
    title: t('compass.features.dimensions.title'),
    description: t('compass.features.dimensions.description')
  },
  {
    icon: 'i-heroicons-map',
    title: t('compass.features.structure.title'),
    description: t('compass.features.structure.description')
  }
])
</script>

<template>
  <section id="features" class="relative py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
    <UContainer>
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Content -->
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
            <UIcon name="i-heroicons-compass" class="h-4 w-4" />
            {{ t('compass.badge') }}
          </div>
          
          <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {{ t('compass.title') }}
          </h2>
          
          <p class="text-lg text-slate-600 dark:text-slate-300">
            {{ t('compass.description') }}
          </p>
          
          <div class="space-y-4 pt-4">
            <div 
              v-for="(feature, index) in features" 
              :key="feature.title" 
              class="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
            >
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                <UIcon :name="feature.icon" class="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h3 class="font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
                <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Image -->
        <div class="relative">
          <AiImageContainer
            :prompt="sectionPrompts.compass.prompt"
            aspectRatio="square"
            :alt="t('compass.imageAlt')"
            shadow="xl"
            class="h-[400px] w-full rounded-2xl lg:h-[500px]"
          />
          <!-- Decorative element -->
          <div class="absolute -bottom-6 -right-6 h-full w-full rounded-2xl border-2 border-teal-200/50 dark:border-teal-800/50 -z-10" />
        </div>
      </div>
    </UContainer>
  </section>
</template>
