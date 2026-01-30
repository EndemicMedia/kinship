<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const steps = [
  {
    label: 'Discover',
    content:
      'Meet potential crew members through values-first profiles. Complete compatibility assessments before making contact.',
    image: sectionPrompts.discover
  },
  {
    label: 'Align',
    content:
      'Work through guided conversations on parenting philosophy, finances, boundaries, and long-term expectations.',
    image: sectionPrompts.plan
  },
  {
    label: 'Formalize',
    content:
      'Generate legal agreements with your crew. Establish consent checkpoints and documentation for court recognition.',
    image: sectionPrompts.secure
  },
  {
    label: 'Sustain',
    content:
      'Maintain crew alignment with regular check-ins, milestone reviews, and mediation support when conflicts arise.',
    image: sectionPrompts.sustain
  }
]
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">From first conversation to first birthday</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Kinship guides you through each stage of crew formation. Slow, deliberate decisions replace rushed commitments 
            made under romantic pressure.
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
