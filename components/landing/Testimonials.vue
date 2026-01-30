<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const testimonials = [
  {
    quote:
      'Kinship gave us language for expectations we did not know how to express. Legal prep felt supportive instead of adversarial.',
    name: 'Jules & Avery',
    role: 'Two parent crew',
    image: sectionPrompts.testimonial1
  },
  {
    quote:
      'The values framework helped us honor our identities while handling practical details. We aligned before conception.',
    name: 'Rina, Sam & Jordan',
    role: 'Three parent crew',
    image: sectionPrompts.testimonial2
  },
  {
    quote:
      'Having my mother formally in the crew changed everything. The governance structure gave her voice without overstepping.',
    name: 'Marcus, Lee, Jordan & Rita',
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
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Real crews. Real outcomes.</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            Families using Kinship to form intentional crews and raise children outside traditional marriage structures.
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
