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

const downloadButtons = [
  { label: t('landing.hero.openApp'), icon: 'i-heroicons-arrow-top-right-on-square', href: '/app/login' },
  { label: t('landing.hero.tryDemo'), icon: 'i-heroicons-play', href: '/app/login' }
]
</script>

<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-1/2 -right-1/4 h-full w-full rounded-full bg-teal-500/10 blur-3xl" />
      <div class="absolute -bottom-1/2 -left-1/4 h-full w-full rounded-full bg-rose-500/10 blur-3xl" />
    </div>

    <UContainer class="relative z-10">
      <div class="grid min-h-[calc(100vh-73px)] items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12">
        <!-- Content -->
        <div class="space-y-6">
          <UBadge color="white" variant="soft" class="w-fit text-xs uppercase tracking-wider">
            {{ t('hero.badge') }}
          </UBadge>
          
          <h1 class="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {{ t('hero.title') }}
          </h1>
          
          <p class="text-lg text-white/80 sm:text-xl">
            {{ t('hero.description') }}
          </p>
          
          <p class="text-base font-medium text-teal-300">
            {{ t('hero.subtext') }}
          </p>
          
          <!-- Download buttons -->
          <div class="flex flex-wrap gap-3 pt-2">
            <UButton
              v-for="button in downloadButtons"
              :key="button.label"
              :to="button.href"
              color="white"
              variant="solid"
              size="lg"
              :icon="button.icon"
            >
              {{ button.label }}
            </UButton>
            <UButton
              color="teal"
              variant="outline"
              size="lg"
              icon="i-heroicons-qr-code"
              :aria-label="t('hero.cta.secondaryAria')"
              to="#how-it-works"
            >
              {{ t('hero.cta.secondary') }}
            </UButton>
          </div>
          
          <!-- Highlights -->
          <div class="grid gap-3 pt-4 text-sm text-white/70 sm:grid-cols-2">
            <div v-for="item in highlights" :key="item" class="flex items-start gap-2">
              <span class="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-teal-400" aria-hidden="true" />
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <!-- App Mockup/Image -->
        <div class="relative flex items-center justify-center lg:justify-end">
          <div class="relative">
            <!-- Phone frame -->
            <div class="relative z-10 w-[280px] sm:w-[320px] lg:w-[380px]">
              <div class="rounded-[2.5rem] border-8 border-slate-800 bg-slate-900 p-2 shadow-2xl">
                <div class="overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800">
                  <AiImageContainer
                    :prompt="sectionPrompts.hero.prompt"
                    aspectRatio="portrait"
                    :alt="t('hero.imageAlt')"
                    loading="eager"
                    shadow="none"
                    :rounded="false"
                    class="h-[480px] w-full sm:h-[520px] lg:h-[580px]"
                  />
                </div>
              </div>
              <!-- Notch -->
              <div class="absolute left-1/2 top-2 h-6 w-20 -translate-x-1/2 rounded-full bg-slate-800" />
            </div>
            
            <!-- Decorative elements around phone -->
            <div class="absolute -right-4 top-1/4 h-12 w-12 rounded-xl bg-teal-500/20 blur-sm" />
            <div class="absolute -left-8 bottom-1/3 h-8 w-8 rounded-full bg-rose-500/20 blur-sm" />
            <div class="absolute right-0 bottom-10 h-16 w-16 rounded-full bg-teal-400/10" />
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Bottom gradient fade -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />
  </section>
</template>
