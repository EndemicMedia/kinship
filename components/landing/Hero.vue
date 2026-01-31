<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const highlights = computed(() => [
  t('hero.highlights.values'),
  t('hero.highlights.planning'),
  t('hero.highlights.intention'),
  t('hero.highlights.contracts'),
  t('hero.highlights.accountability'),
  t('hero.highlights.exit')
])
</script>

<template>
  <section class="relative overflow-hidden pb-16 pt-12 sm:pt-16">
    <!-- Full-screen background image -->
    <div class="absolute inset-0 z-0">
        <AiImageContainer
          :prompt="sectionPrompts.hero.prompt"
          aspectRatio="wide"
          :alt="t('hero.imageAlt')"
          loading="eager"
          shadow="none"
          :rounded="false"
          class="h-full w-full"
        />
      <!-- Gradient overlay for text readability -->
      <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/70" />
    </div>

    <UContainer class="relative z-10">
      <div class="max-w-3xl space-y-6 py-8">
        <UBadge color="white" variant="soft" class="w-fit">
          {{ t('hero.badge') }}
        </UBadge>
        <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {{ t('hero.title') }}
        </h1>
        <p class="text-xl text-white/90">
          {{ t('hero.description') }}
        </p>
        <p class="text-lg font-medium text-teal-300">
          {{ t('hero.subtext') }}
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton color="white" variant="solid" size="lg" :aria-label="t('hero.cta.primaryAria')">
            {{ t('hero.cta.primary') }}
          </UButton>
          <UButton color="white" variant="ghost" size="lg" :aria-label="t('hero.cta.secondaryAria')">
            {{ t('hero.cta.secondary') }}
          </UButton>
        </div>
        <ul class="grid gap-3 text-sm text-white/90 sm:grid-cols-2">
          <li v-for="item in highlights" :key="item" class="flex items-start gap-2">
            <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </UContainer>
  </section>
</template>
