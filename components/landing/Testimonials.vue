<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const testimonials = computed(() => [
  {
    quote: t('testimonials.items.first.quote'),
    name: t('testimonials.items.first.name'),
    role: t('testimonials.items.first.role'),
    image: sectionPrompts.testimonial1
  },
  {
    quote: t('testimonials.items.second.quote'),
    name: t('testimonials.items.second.name'),
    role: t('testimonials.items.second.role'),
    image: sectionPrompts.testimonial2
  },
  {
    quote: t('testimonials.items.third.quote'),
    name: t('testimonials.items.third.name'),
    role: t('testimonials.items.third.role'),
    image: sectionPrompts.testimonial3
  }
])
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">{{ t('testimonials.title') }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            {{ t('testimonials.description') }}
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
