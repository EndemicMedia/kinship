<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const steps = computed(() => [
  {
    label: t('howItWorks.steps.discover.label'),
    content: t('howItWorks.steps.discover.content'),
    image: sectionPrompts.discover
  },
  {
    label: t('howItWorks.steps.align.label'),
    content: t('howItWorks.steps.align.content'),
    image: sectionPrompts.plan
  },
  {
    label: t('howItWorks.steps.formalize.label'),
    content: t('howItWorks.steps.formalize.content'),
    image: sectionPrompts.secure
  },
  {
    label: t('howItWorks.steps.sustain.label'),
    content: t('howItWorks.steps.sustain.content'),
    image: sectionPrompts.sustain
  }
])
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">{{ t('howItWorks.title') }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            {{ t('howItWorks.description') }}
          </p>
        </div>
        
        <!-- Steps with images -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="(step, index) in steps" :key="step.label" class="space-y-4">
            <div class="relative">
              <AiImageContainer
                :prompt="step.image.prompt"
                aspectRatio="portrait"
                :alt="step.label"
                shadow="md"
                class="h-48 w-full"
              />
              <div class="absolute -bottom-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
                {{ index + 1 }}
              </div>
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ step.label }}</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300">{{ step.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
