<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const highlights = [
  'Align on parenting values and vision early',
  'Coordinate legal, medical, and emotional planning',
  'Build trusted teams with clarity and care'
]
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-12 sm:pt-16">
    <div class="absolute inset-0 bg-gradient-to-br from-teal-100 via-transparent to-indigo-100 opacity-80 dark:from-teal-950 dark:to-indigo-950" 
            />
    <UContainer class="relative">
      <div class="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="space-y-6">
          <UBadge color="primary" variant="soft" class="w-fit">
            Intentional parenthood coordination platform
          </UBadge>
          <h1 class="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Form parenting teams with clarity, compassion, and confidence.
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300">
            Kinship helps future parents design their family together—aligning identity, values, biological plans,
            legal agreements, and ongoing support in one secure workspace.
          </p>
          <div class="flex flex-wrap gap-3">
            <UButton color="primary" size="lg" aria-label="Start planning on Kinship">
              Start planning
            </UButton>
            <UButton color="gray" variant="outline" size="lg" aria-label="View how Kinship works">
              See how it works
            </UButton>
          </div>
          <ul class="grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
            <li v-for="item in highlights" :key="item" class="flex items-start gap-2">
              <span class="mt-0.5 h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" 
            />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <UCard class="relative overflow-hidden border-0 bg-white/70 shadow-xl backdrop-blur dark:bg-slate-900/70">
          <div class="space-y-6">
            <div class="space-y-2">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Planning workspace</p>
              <h2 class="text-2xl font-semibold text-slate-900 dark:text-white">Your family blueprint, beautifully organized.</h2>
            </div>
            <AiImageContainer
              :prompt="sectionPrompts.hero.prompt"
              aspectRatio="landscape"
              alt="Diverse parenting team collaborating on family planning"
              loading="eager"
              shadow="xl"
            />
            <div class="grid gap-3 sm:grid-cols-2">
              <UCard class="bg-slate-50/80 dark:bg-slate-900/80">
                <p class="text-sm font-medium text-slate-900 dark:text-white">Shared intentions</p>
                <p class="text-xs text-slate-600 dark:text-slate-300">Define roles, expectations, and boundaries together.</p>
              </UCard>
              <UCard class="bg-slate-50/80 dark:bg-slate-900/80">
                <p class="text-sm font-medium text-slate-900 dark:text-white">Coordinated support</p>
                <p class="text-xs text-slate-600 dark:text-slate-300">Track agreements, care plans, and ongoing check-ins.</p>
              </UCard>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
