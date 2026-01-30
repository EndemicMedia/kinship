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
            <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Governance and legal support built in.</h2>
            <p class="mt-3 text-slate-600 dark:text-slate-300">
              Kinship helps families stay protected with guided governance, documented consent, and access to vetted legal resources.
            </p>
          </div>
          <AiImageContainer
            :prompt="sectionPrompts.governance.prompt"
            aspectRatio="landscape"
            alt="Professional legal support and governance team"

            shadow="lg"
            class="h-64 w-full"
          
            />
        </div>
        
        <!-- Feature cards -->
        <div class="grid gap-4 lg:grid-cols-3">
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Consent-first governance</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Every decision is tracked with explicit sign-off, time stamps, and shared visibility for each parent.
            </p>
          </UCard>
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Legal guidance pathways</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Coordinate counsel, co-parenting agreements, and regional requirements with structured checklists.
            </p>
          </UCard>
          <UCard class="bg-slate-50 dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Secure support records</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Keep care plans, emergency contacts, and ongoing support notes encrypted and accessible to your team.
            </p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
