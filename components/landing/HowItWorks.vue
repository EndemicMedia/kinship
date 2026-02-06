<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const steps = computed(() => [
  {
    icon: 'i-heroicons-magnifying-glass',
    label: t('howItWorks.steps.discover.label'),
    content: t('howItWorks.steps.discover.content'),
    image: sectionPrompts.discover
  },
  {
    icon: 'i-heroicons-bullseye',
    label: t('howItWorks.steps.align.label'),
    content: t('howItWorks.steps.align.content'),
    image: sectionPrompts.plan
  },
  {
    icon: 'i-heroicons-document-check',
    label: t('howItWorks.steps.formalize.label'),
    content: t('howItWorks.steps.formalize.content'),
    image: sectionPrompts.secure
  },
  {
    icon: 'i-heroicons-arrow-path',
    label: t('howItWorks.steps.sustain.label'),
    content: t('howItWorks.steps.sustain.content'),
    image: sectionPrompts.sustain
  }
])
</script>

<template>
  <section id="how-it-works" class="py-20 lg:py-28">
    <UContainer>
      <div class="space-y-16">
        <!-- Section Header -->
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {{ t('howItWorks.title') }}
          </h2>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {{ t('howItWorks.description') }}
          </p>
        </div>
        
        <!-- Steps Grid -->
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div 
            v-for="(step, index) in steps" 
            :key="step.label" 
            class="group relative"
          >
            <!-- Step Number -->
            <div class="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white shadow-lg z-20">
              {{ index + 1 }}
            </div>
            
            <div class="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 transition-shadow hover:shadow-lg">
              <!-- Image -->
              <div class="relative h-48 overflow-hidden">
                <AiImageContainer
                  :prompt="step.image.prompt"
                  aspectRatio="landscape"
                  :alt="step.label"
                  shadow="none"
                  :rounded="false"
                  class="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              
              <!-- Content -->
              <div class="p-6">
                <div class="flex items-center gap-3 mb-3">
                  <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                    <UIcon :name="step.icon" class="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ step.label }}</h3>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{{ step.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
