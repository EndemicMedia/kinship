<script setup lang="ts">
const layers = [
  {
    title: 'Identity layer',
    description: 'Document names, pronouns, cultural context, and the story you want to tell together.'
  },
  {
    title: 'Project & values layer',
    description: 'Capture shared parenting goals, relationship expectations, and family rituals.'
  },
  {
    title: 'Biological planning layer',
    description: 'Coordinate health history, fertility pathways, and care teams with transparency.'
  },
  {
    title: 'Legal agreements layer',
    description: 'Track legal counsel, contracts, and consent checkpoints in one place.'
  },
  {
    title: 'Support layer',
    description: 'Plan co-parenting communication, postpartum support, and long-term check-ins.'
  }
]
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="flex flex-col gap-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Product layers built for intentional teams.</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Each layer keeps your parenting project aligned—from identity and values to biological planning, legal support, and
            ongoing care.
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UCard v-for="layer in layers" :key="layer.title" class="bg-white dark:bg-slate-900">
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-300">Layer</p>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ layer.title }}</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300">{{ layer.description }}</p>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
