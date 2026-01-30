<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const testimonials = [
  {
    quote:
      'Kinship gave us a shared language for expectations. We felt supported before we even started the legal process.',
    name: 'Jules & Avery',
    role: 'Co-parenting crew of 2',
    image: sectionPrompts.testimonial1
  },
  {
    quote:
      'The layers framework helped us honor identity and values while still handling the practical details with care.',
    name: 'Rina, Sam & Jordan',
    role: 'Parenting crew of 3',
    image: sectionPrompts.testimonial2
  },
  {
    quote:
      'Having my mom as part of the crew from day one changed everything. The governance checkpoints kept us aligned.',
    name: 'Marcus, Lee, Jordan & Grandma Rita',
    role: 'Multigenerational crew',
    image: sectionPrompts.testimonial3
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
            Real stories from intentional parents using Kinship to build aligned, supportive crews.
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <UCard v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white dark:bg-slate-900">
            <div class="space-y-4">
              <div class="flex justify-center">
                <div class="h-20 w-20 overflow-hidden rounded-full ring-4 ring-teal-100 dark:ring-teal-900">
                  <AiImageContainer
                    :prompt="testimonial.image.prompt"
                    aspectRatio="square"
                    :alt="testimonial.name"
                    shadow="none"
                    :rounded="false"
                    class="h-full w-full"
                  />
                </div>
              </div>
              <p class="text-sm text-slate-600 dark:text-slate-300 text-center">{{ testimonial.quote }}</p>
              <div class="text-center">
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
