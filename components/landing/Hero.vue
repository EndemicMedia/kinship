<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()
const localePath = useLocalePath()

const downloadButtons = computed(() => [
  { label: t('landing.hero.openApp'), icon: 'i-heroicons-arrow-top-right-on-square', href: localePath('/app/login') },
  { label: t('landing.hero.tryDemo'), icon: 'i-heroicons-play', href: localePath('/app/login') }
])
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
          
        </div>

        <!-- Hero Image -->
        <div class="relative flex items-center justify-center lg:justify-end">
          <div class="relative w-full max-w-lg lg:max-w-none">
            <AiImageContainer
              :prompt="sectionPrompts.hero.prompt"
              staticSrc="/images/hero.jpg"
              :width="1024"
              :height="600"
              :alt="t('hero.imageAlt')"
              class="w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
              style="aspect-ratio: 1024/600"
              loading="eager"
            />
            <!-- Decorative glow -->
            <div class="absolute -inset-4 -z-10 rounded-3xl bg-teal-500/10 blur-2xl" />
          </div>
        </div>
      </div>
    </UContainer>

    <!-- Bottom gradient fade -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950" />
  </section>
</template>
