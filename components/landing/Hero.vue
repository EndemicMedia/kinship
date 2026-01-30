<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const highlights = [
  'Align on parenting values and vision early',
  'Coordinate legal, medical, and emotional planning',
  'Build trusted crews with clarity and care',
  'Form crews like bands—intention over accident',
  'Contracts activate at life, not at love',
  'Family accountability before state intervention'
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
          Your kin. Your ship. Your voyage.
        </h1>
        <p class="text-xl text-white/90">
          Build a crew to raise children together—with shared values, clear roles, and the stability every child deserves.
        </p>
        <p class="text-lg font-medium text-teal-300">
          Contracts activate at life, not at love.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton color="white" variant="solid" size="lg" aria-label="Chart your course on Kinship">
            Chart your course
          </UButton>
          <UButton color="white" variant="ghost" size="lg" aria-label="Explore the Compass">
            Explore the Compass
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
