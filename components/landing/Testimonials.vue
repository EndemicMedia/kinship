<script setup lang="ts">
const testimonials = [
  {
    quote:
      'Kinship gave us a shared language for expectations. We felt supported before we even started the legal process.',
    name: 'Jules & Avery',
    role: 'Co-parenting team'
  },
  {
    quote:
      'The layers framework helped us honor identity and values while still handling the practical details with care.',
    name: 'Rina S.',
    role: 'Future parent'
  },
  {
    quote:
      'The governance checkpoints kept everyone aligned and reduced anxiety during the planning phase.',
    name: 'Marcus & Lee',
    role: 'Parenting partners'
  }
]
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Families trust Kinship to lead with care.</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Real stories from intentional parents using Kinship to build aligned, supportive teams.
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <UCard v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white dark:bg-slate-900">
            <div class="space-y-4">
              <p class="text-sm text-slate-600 dark:text-slate-300">“{{ testimonial.quote }}”</p>
              <div>
                <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ testimonial.name }}</p>
                <p class="text-xs text-slate-500 dark:text-slate-400">{{ testimonial.role }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
