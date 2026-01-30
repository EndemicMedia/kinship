<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <!-- Header with image -->
        <div class="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Legal protection built into every step</h2>
            <p class="mt-3 text-slate-600 dark:text-slate-300">
              Kinship generates legally sound documentation from the start. Agreements activate when pregnancy begins, 
              establishing responsibility before birth instead of scrambling for protection after separation.
            </p>
          </div>
          <AiImageContainer
            :prompt="sectionPrompts.governance.prompt"
            aspectRatio="landscape"
            alt="Professional diverse governance and legal support team"
            shadow="lg"
            class="h-64 w-full"
          />
        </div>
        
        <!-- Feature cards -->
        <div class="grid gap-4 lg:grid-cols-3">
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Consent at every threshold</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Document explicit agreement at formation, conception, birth, and major life changes. No assumptions about continued participation.
            </p>
          </UCard>
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Responsibility percentages</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Assign decision authority and financial obligation by percentage. Extended family can hold defined support roles.
            </p>
          </UCard>
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Exit with transformation</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Responsibilities adjust when life changes, never vanish. Mediation before exit, child continuity plans required.
            </p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
