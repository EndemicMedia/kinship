<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const layers = [
  {
    title: 'Identity',
    description: 'Document who you are: names, pronouns, cultural context, and the story you want to tell together.',
    image: sectionPrompts.identity
  },
  {
    title: 'Values alignment',
    description: 'Surface shared goals, relationship boundaries, and family rituals through guided conversations.',
    image: sectionPrompts.values
  },
  {
    title: 'Biological planning',
    description: 'Coordinate fertility pathways, health history, and medical decisions with full transparency.',
    image: sectionPrompts.biological
  },
  {
    title: 'Legal preparation',
    description: 'Generate co-parenting agreements that activate at conception. Track consent and legal checkpoints.',
    image: sectionPrompts.legal
  },
  {
    title: 'Family accountability',
    description: 'Establish intervention protocols for behavioral issues. Respond as a crew before courts get involved.',
    image: sectionPrompts.accountability
  },
  {
    title: 'Ongoing support',
    description: 'Maintain alignment through regular check-ins, milestone reviews, and structured conflict resolution.',
    image: sectionPrompts.support
  }
]
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="flex flex-col gap-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Six layers. One complete system.</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Traditional family formation leaves gaps between legal preparation, medical coordination, and emotional alignment. 
            Kinship provides structure for every conversation and decision your crew needs to make together.
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UCard v-for="layer in layers" :key="layer.title" class="overflow-hidden bg-white dark:bg-slate-900">
            <div class="space-y-4">
              <AiImageContainer
                :prompt="layer.image.prompt"
                aspectRatio="square"
                :alt="layer.title"
                shadow="none"
                class="h-48 w-full -mx-6 -mt-6 mb-4"
                :rounded="false"
              />
              <div class="space-y-2">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ layer.title }}</h3>
                <p class="text-sm text-slate-600 dark:text-slate-300">{{ layer.description }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
