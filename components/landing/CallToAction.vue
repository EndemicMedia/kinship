<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()
</script>

<template>
  <section class="py-20 lg:py-28">
    <UContainer>
      <!-- Two column layout similar to yfactor's survey section -->
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Image -->
        <div class="relative order-2 lg:order-1">
          <AiImageContainer
            :prompt="sectionPrompts.cta.prompt"
            aspectRatio="square"
            :alt="t('cta.imageAlt')"
            shadow="xl"
            class="h-[400px] w-full rounded-2xl lg:h-[480px]"
          />
          <!-- Decorative element -->
          <div class="absolute -bottom-6 -left-6 h-full w-full rounded-2xl border-2 border-teal-200/50 dark:border-teal-800/50 -z-10" />
        </div>

        <!-- Content -->
        <div class="space-y-6 order-1 lg:order-2">
          <div class="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300">
            <UIcon name="i-heroicons-rocket-launch" class="h-4 w-4" />
            {{ t('cta.badge') }}
          </div>
          
          <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {{ t('cta.title') }}
          </h2>
          
          <p class="text-lg text-slate-600 dark:text-slate-300">
            {{ t('cta.description') }}
          </p>
          
          <div class="flex flex-wrap gap-3 pt-2">
            <UButton color="primary" size="lg" to="/app/login" :aria-label="t('cta.primaryAria')">
              <UIcon name="i-heroicons-rocket-launch" class="mr-2 h-5 w-5" />
              {{ t('cta.primary') }}
            </UButton>
            <UButton color="gray" variant="outline" size="lg" to="/app/login" :aria-label="t('cta.secondaryAria')">
              <UIcon name="i-heroicons-play" class="mr-2 h-5 w-5" />
              {{ t('cta.secondary') }}
            </UButton>
          </div>
          
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{ t('cta.note') }}
          </p>
        </div>
      </div>
    </UContainer>
  </section>
</template>
