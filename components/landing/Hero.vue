<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const highlights = [
  'Align on parenting values before you start',
  'Coordinate legal, medical, and care planning together',
  'Build crews like bands: intention, not accident',
  'Contracts activate at conception, not at weddings',
  'Family accountability prevents state intervention',
  'Exit with dignity when circumstances change'
]
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-12 sm:pt-16">
    <!-- Full-screen background image -->
    <div class="absolute inset-0 z-0">
      <AiImageContainer
        :prompt="sectionPrompts.hero.prompt"
        aspectRatio="wide"
        alt="Diverse multigenerational crew planning together with children present"
        loading="eager"
        shadow="none"
        :rounded="false"
        class="h-full w-full"
      />
      <!-- Gradient overlay for text readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/70" />
    </div>

    <UContainer class="relative z-10">
      <div class="max-w-3xl space-y-6 py-8">
        <UBadge color="white" variant="soft" class="w-fit">
          Intentional parenthood coordination platform
        </UBadge>
        <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Form parenting crews with intention, clarity, and lasting support.
        </h1>
        <p class="text-xl text-white/90">
          Assemble a crew to raise children together. Align on values. Define clear roles. Create stability every child deserves.
        </p>
        <p class="text-lg font-medium text-teal-300">
          Responsibility begins at conception, not at romantic commitment.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton color="white" variant="solid" size="lg" aria-label="Get started with Kinship">
            Get started
          </UButton>
          <UButton color="white" variant="ghost" size="lg" aria-label="See how Kinship works">
            How it works
          </UButton>
        </div>
        <ul class="grid gap-3 text-sm text-white/90 sm:grid-cols-2">
          <li v-for="item in highlights" :key="item" class="flex items-start gap-2">
            <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </UContainer>
  </section>
</template>
