<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Romance gates parenthood. Children pay the price.</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Society bundles three incompatible needs into marriage: romantic passion, lifelong commitment, and legal enforcement. 
            When romance fails, the entire structure collapses. Kinship unbundles these needs so families form through intention instead of accident.
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
              <h3 class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Passion is volatile. Partnership needs stability. Law demands clarity.</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Marriage forces these incompatible forces together. When desire fades or conflict arises, the legal and parenting structure 
                collapses with it. Children lose stability because adults could not sustain romance.
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
              <h3 class="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Separate romance from responsibility. Activate agreements at conception.</h3>
              <p class="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Form crews around shared parenting goals, not romantic chemistry. Legal agreements activate when pregnancy begins, 
                not when vows are spoken. Responsibility transforms when life changes, but never disappears.
              </p>
            </UCard>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
