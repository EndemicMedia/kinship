<script setup lang="ts">
const steps = [
  {
    label: 'Discover alignment',
    content:
      'Invite prospective parents, set shared intentions, and map values, boundaries, and the roles each person wants to play.'
  },
  {
    label: 'Plan the journey',
    content:
      'Organize biological pathways, timelines, and medical coordination alongside emotional readiness check-ins.'
  },
  {
    label: 'Secure agreements',
    content:
      'Keep legal counsel, consent checkpoints, and documentation in a shared, permissioned workspace.'
  },
  {
    label: 'Sustain the team',
    content:
      'Create ongoing communication cadences, support plans, and decision-making protocols for the life of your family.'
  }
]
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">How Kinship works</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            A guided flow turns complex conversations into a calm, collaborative roadmap for parenthood.
          </p>
        </div>
        <UCard class="bg-white dark:bg-slate-900">
          <UAccordion :items="steps" :ui="{ item: { base: 'py-3' } }" />
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
