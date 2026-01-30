<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">The broken bundle: Why romance gates parenthood</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Modern society forces three incompatible needs—romantic desire, lifelong partnership, and legal recognition—into 
            a single institution. When any part fails, children pay the price. Kinship unbundles these needs so families 
            can form with intention.
          </p>
        </div>
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-4">
            <AiImageContainer
              :prompt="sectionPrompts.problem.prompt"
              aspectRatio="square"
              alt="Abstract visualization of incompatible systems forced together"
              shadow="lg"
              class="h-64 w-full"
            />
            <UCard class="border border-rose-100 bg-rose-50/60 dark:border-rose-900/40 dark:bg-rose-950/30">
              <p class="text-sm font-semibold text-rose-600 dark:text-rose-300">The problem</p>
              <h3 class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Romance required. Stability optional. Children pay the price.</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Marriage bundles romantic desire's volatility, partnership's need for stability, and law's demand for clarity. 
                When romance fails, family structure collapses—leaving children without the stability they need.
              </p>
            </UCard>
          </div>
          <div class="space-y-4">
            <AiImageContainer
              :prompt="sectionPrompts.solution.prompt"
              aspectRatio="square"
              alt="Abstract visualization of harmonious unbundled systems"
              shadow="lg"
              class="h-64 w-full"
            />
            <UCard class="border border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <p class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">The Kinship solution</p>
              <h3 class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Unbundle romance from parenthood. Activate responsibility at life.</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Kinship separates these needs: form crews around parenting, not romance. Contracts activate at conception 
                or birth—when responsibility begins—not at wedding ceremonies. Structure that adapts when circumstances change.
              </p>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
