<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const features = computed(() => [
  {
    title: t('familyAccountability.features.logging.title'),
    description: t('familyAccountability.features.logging.description')
  },
  {
    title: t('familyAccountability.features.protocols.title'),
    description: t('familyAccountability.features.protocols.description')
  },
  {
    title: t('familyAccountability.features.documentation.title'),
    description: t('familyAccountability.features.documentation.description')
  }
])

const severityLevels = computed(() => [
  { level: 1, title: t('familyAccountability.severity.minor.title'), description: t('familyAccountability.severity.minor.description') },
  { level: 2, title: t('familyAccountability.severity.patterns.title'), description: t('familyAccountability.severity.patterns.description') },
  { level: 3, title: t('familyAccountability.severity.serious.title'), description: t('familyAccountability.severity.serious.description') },
  { level: 4, title: t('familyAccountability.severity.critical.title'), description: t('familyAccountability.severity.critical.description') },
  { level: 5, title: t('familyAccountability.severity.legal.title'), description: t('familyAccountability.severity.legal.description') }
])
</script>

<template>
  <section class="py-16 bg-slate-50 dark:bg-slate-900/30">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">{{ t('familyAccountability.title') }}</h2>
          <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">
            {{ t('familyAccountability.description') }}
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2">
          <!-- Main accountability visualization -->
          <div>
            <AiImageContainer
              :prompt="sectionPrompts.accountability.prompt"
              aspectRatio="square"
              :alt="t('familyAccountability.imageAlt')"
              shadow="lg"
              class="h-80 w-full"
            />
          </div>

          <!-- Severity levels -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">{{ t('familyAccountability.severity.title') }}</h3>
            <div class="space-y-3">
              <UCard 
                v-for="item in severityLevels" 
                :key="item.level" 
                class="bg-white dark:bg-slate-900"
              >
                <div class="flex items-start gap-3">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                    {{ item.level }}
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900 dark:text-white">{{ item.title }}</p>
                    <p class="text-sm text-slate-600 dark:text-slate-300">{{ item.description }}</p>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>

        <!-- Supporting photo -->
        <AiImageContainer
          :prompt="sectionPrompts.accountabilitySupport.prompt"
          aspectRatio="landscape"
          :alt="t('familyAccountability.supportImageAlt')"
          shadow="lg"
          class="h-64 w-full"
        />

        <!-- Feature cards -->
        <div class="grid gap-4 lg:grid-cols-3">
          <UCard v-for="feature in features" :key="feature.title" class="bg-white dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ feature.description }}</p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
