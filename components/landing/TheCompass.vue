<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const features = [
  {
    title: 'Values come first',
    description: 'Browse crew profiles that lead with parenting philosophy, not photos. Compatibility shows before attraction.'
  },
  {
    title: 'Six dimensions of alignment',
    description: 'See where you match and where early conversations matter. No single score hiding incompatibilities.'
  },
  {
    title: 'Structure before chemistry',
    description: 'Complete guided discussions on hard topics before chat unlocks. Surface disagreements early.'
  }
]
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">The Compass: Discover your crew</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Kinship combines the ease of modern matching apps with the rigor intentional families need. The Compass puts 
            values and vision first, then surfaces people seeking the same journey.
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
