<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">{{ t('problemSolution.title') }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            {{ t('problemSolution.description') }}
          </p>
        </div>
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-4">
            <AiImageContainer
              :prompt="sectionPrompts.problem.prompt"
              aspectRatio="square"
              :alt="t('problemSolution.problem.imageAlt')"
              shadow="lg"
              class="h-64 w-full"
            />
            <UCard class="border border-rose-100 bg-rose-50/60 dark:border-rose-900/40 dark:bg-rose-950/30">
              <p class="text-sm font-semibold text-rose-600 dark:text-rose-300">{{ t('problemSolution.problem.eyebrow') }}</p>
              <h3 class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{{ t('problemSolution.problem.title') }}</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {{ t('problemSolution.problem.description') }}
              </p>
            </UCard>
          </div>
          <div class="space-y-4">
            <AiImageContainer
              :prompt="sectionPrompts.solution.prompt"
              aspectRatio="square"
              :alt="t('problemSolution.solution.imageAlt')"
              shadow="lg"
              class="h-64 w-full"
            />
            <UCard class="border border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">{{ t('problemSolution.solution.eyebrow') }}</p>
              <h3 class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{{ t('problemSolution.solution.title') }}</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {{ t('problemSolution.solution.description') }}
              </p>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
