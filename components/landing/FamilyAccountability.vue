<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const features = computed(() => [
  {
    icon: 'i-heroicons-clipboard-document-list',
    title: t('familyAccountability.features.logging.title'),
    description: t('familyAccountability.features.logging.description')
  },
  {
    icon: 'i-heroicons-shield-check',
    title: t('familyAccountability.features.protocols.title'),
    description: t('familyAccountability.features.protocols.description')
  },
  {
    icon: 'i-heroicons-document-text',
    title: t('familyAccountability.features.documentation.title'),
    description: t('familyAccountability.features.documentation.description')
  }
])

const severityLevels = computed(() => [
  { level: 1, title: t('familyAccountability.severity.minor.title'), description: t('familyAccountability.severity.minor.description'), color: 'bg-emerald-500' },
  { level: 2, title: t('familyAccountability.severity.patterns.title'), description: t('familyAccountability.severity.patterns.description'), color: 'bg-teal-500' },
  { level: 3, title: t('familyAccountability.severity.serious.title'), description: t('familyAccountability.severity.serious.description'), color: 'bg-amber-500' },
  { level: 4, title: t('familyAccountability.severity.critical.title'), description: t('familyAccountability.severity.critical.description'), color: 'bg-orange-500' },
  { level: 5, title: t('familyAccountability.severity.legal.title'), description: t('familyAccountability.severity.legal.description'), color: 'bg-rose-500' }
])
</script>

<template>
  <section class="py-20 lg:py-28">
    <UContainer>
      <div class="space-y-16">
        <!-- Section Header -->
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 mb-4">
            <UIcon name="i-heroicons-shield-check" class="h-4 w-4" />
            {{ t('familyAccountability.badge') }}
          </div>
          <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {{ t('familyAccountability.title') }}
          </h2>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {{ t('familyAccountability.description') }}
          </p>
        </div>

        <div class="grid gap-12 lg:grid-cols-2">
          <!-- Main accountability visualization -->
          <div class="relative">
            <AiImageContainer
              :prompt="sectionPrompts.accountability.prompt"
              aspectRatio="square"
              :alt="t('familyAccountability.imageAlt')"
              shadow="xl"
              class="h-[400px] w-full rounded-2xl lg:h-[500px]"
            />
            <!-- Decorative element -->
            <div class="absolute -bottom-6 -left-6 h-full w-full rounded-2xl border-2 border-teal-200/50 dark:border-teal-800/50 -z-10" />
          </div>

          <!-- Severity levels -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ t('familyAccountability.severity.title') }}</h3>
            <div class="space-y-3">
              <div 
                v-for="item in severityLevels" 
                :key="item.level"
                class="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800"
              >
                <div :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white font-bold', item.color]">
                  {{ item.level }}
                </div>
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white">{{ item.title }}</p>
                  <p class="text-sm text-slate-600 dark:text-slate-300">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature cards -->
        <div class="grid gap-6 md:grid-cols-3">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800"
          >
            <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 dark:bg-teal-900/30">
              <UIcon :name="feature.icon" class="h-6 w-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
