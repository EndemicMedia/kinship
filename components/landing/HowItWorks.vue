<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const steps = [
  {
    label: 'Chart your course',
    content:
      'Invite prospective crew members, set shared intentions, and map values, boundaries, and the roles each person wants to play.',
    image: sectionPrompts.discover
  },
  {
    label: 'Assemble your crew',
    content:
      'Organize biological pathways, timelines, and medical coordination alongside emotional readiness check-ins.',
    image: sectionPrompts.plan
  },
  {
    label: 'Set sail prepared',
    content:
      'Keep legal counsel, consent checkpoints, and documentation in a shared, permissioned workspace.',
    image: sectionPrompts.secure
  },
  {
    label: 'Navigate together',
    content:
      'Create ongoing communication cadences, support plans, and decision-making protocols for the life of your family.',
    image: sectionPrompts.sustain
  }
]
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Your voyage: From discovery to family</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            A guided flow turns complex conversations into a calm, collaborative roadmap for parenthood.
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
