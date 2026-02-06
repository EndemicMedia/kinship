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
  <section class="py-20 lg:py-28 bg-slate-50 dark:bg-slate-900/50">
    <UContainer>
      <div class="space-y-12">
        <!-- Section Header -->
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {{ t('testimonials.title') }}
          </h2>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {{ t('testimonials.description') }}
          </p>
        </div>
        
        <!-- Testimonials Grid -->
        <div class="grid gap-8 md:grid-cols-3">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="testimonial.name"
            class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800"
          >
            <!-- Quote Icon -->
            <div class="mb-4 text-teal-500/20">
              <UIcon name="i-heroicons-quotation-mark" class="h-10 w-10" />
            </div>
            
            <p class="mb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
              "{{ testimonial.quote }}"
            </p>
            
            <div class="flex items-center gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div class="h-12 w-12 overflow-hidden rounded-full ring-2 ring-teal-100 dark:ring-teal-900">
                <AiImageContainer
                  :prompt="testimonial.image.prompt"
                  aspectRatio="square"
                  :alt="testimonial.name"
                  shadow="none"
                  :rounded="false"
                  class="h-full w-full"
                />
              </div>
              <div>
                <p class="font-semibold text-slate-900 dark:text-white">{{ testimonial.name }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
