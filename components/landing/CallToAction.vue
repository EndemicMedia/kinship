<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="relative overflow-hidden rounded-2xl">
        <!-- Background AI Image -->
        <div class="absolute inset-0 z-0">
          <AiImageContainer
            :prompt="sectionPrompts.cta.prompt"
            aspectRatio="wide"
            :alt="t('cta.imageAlt')"
            shadow="none"
            :rounded="false"
            class="h-full w-full"
          />
          <!-- Gradient overlay for text readability -->
          <div class="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/75" />
        </div>
        
        <!-- Content -->
        <UCard class="relative z-10 border-0 bg-transparent">
          <div class="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
            <div class="max-w-xl">
              <h2 class="text-3xl font-semibold text-white">{{ t('cta.title') }}</h2>
              <p class="mt-3 text-base text-white/90">
                {{ t('cta.description') }}
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <UButton color="white" variant="solid" size="lg" :aria-label="t('cta.primaryAria')">
                {{ t('cta.primary') }}
              </UButton>
              <UButton color="white" variant="ghost" size="lg" :aria-label="t('cta.secondaryAria')">
                {{ t('cta.secondary') }}
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
