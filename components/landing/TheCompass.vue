<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const features = [
  {
    title: 'Values cards, not selfies',
    description: 'Philosophy and parenting approach come first. Photos are secondary to what matters most.'
  },
  {
    title: 'Crew compatibility maps',
    description: 'See alignment across 6 dimensions, not a single score. Low areas become discussion topics.'
  },
  {
    title: 'Guided conversations',
    description: 'Structured topics surface disagreements early—before free chat opens.'
  }
]
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">The Compass: Find your crew</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Dating app usability. Crew formation purpose.
          </p>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Discover potential crewmates through values-first profiles, not photos. The Compass shows you people 
            seeking the same voyage—with compatibility maps that highlight alignment and flag early discussion topics.
          </p>
        </div>
        
        <AiImageContainer
          :prompt="sectionPrompts.compass.prompt"
          aspectRatio="landscape"
          alt="The Compass crew matching interface"
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
