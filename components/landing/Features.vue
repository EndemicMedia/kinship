<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()

const tabs = computed(() => [
  { label: t('features.tabs.layers'), slot: 'layers' },
  { label: t('features.tabs.compass'), slot: 'compass' },
  { label: t('features.tabs.for'), slot: 'for' }
])

const layers = computed(() => [
  { icon: 'i-heroicons-identification', key: 'identity' },
  { icon: 'i-heroicons-heart', key: 'values' },
  { icon: 'i-heroicons-beaker', key: 'biological' },
  { icon: 'i-heroicons-scale', key: 'legal' },
  { icon: 'i-heroicons-shield-check', key: 'accountability' },
  { icon: 'i-heroicons-arrow-path', key: 'support' }
])

const compassFeatures = computed(() => [
  {
    icon: 'i-heroicons-compass',
    title: t('landing.compass.features.values.title'),
    description: t('landing.compass.features.values.description')
  },
  {
    icon: 'i-heroicons-squares-2x2',
    title: t('landing.compass.features.dimensions.title'),
    description: t('landing.compass.features.dimensions.description')
  },
  {
    icon: 'i-heroicons-map',
    title: t('landing.compass.features.structure.title'),
    description: t('landing.compass.features.structure.description')
  }
])

const audience = computed(() => [
  t('whoItsFor.audience.intentional'),
  t('whoItsFor.audience.queer'),
  t('whoItsFor.audience.singleParents'),
  t('whoItsFor.audience.friends'),
  t('whoItsFor.audience.contributors'),
  t('whoItsFor.audience.clarity')
])
</script>

<template>
  <section id="features" class="py-20 lg:py-28">
    <UContainer>
      <div class="space-y-10">
        <!-- Section Header -->
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {{ t('features.title') }}
          </h2>
          <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">
            {{ t('features.description') }}
          </p>
        </div>

        <!-- Tabs -->
        <UTabs :items="tabs" class="w-full">
          <!-- The 6 Layers -->
          <template #layers>
            <div class="grid gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              <div
                v-for="layer in layers"
                :key="layer.key"
                class="flex gap-4 rounded-xl border border-slate-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
              >
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                  <UIcon :name="layer.icon" class="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <div>
                  <p class="font-semibold text-slate-900 dark:text-white">
                    {{ t(`productLayers.layers.${layer.key}.title`) }}
                  </p>
                  <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {{ t(`productLayers.layers.${layer.key}.description`) }}
                  </p>
                </div>
              </div>
            </div>
          </template>

          <!-- The Compass -->
          <template #compass>
            <div class="space-y-6 pt-8">
              <p class="text-base text-slate-600 dark:text-slate-300">
                {{ t('features.compassIntro') }}
              </p>
              <div class="grid gap-4 sm:grid-cols-3">
                <div
                  v-for="feature in compassFeatures"
                  :key="feature.title"
                  class="flex gap-4 rounded-xl border border-slate-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
                >
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                    <UIcon :name="feature.icon" class="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900 dark:text-white">{{ feature.title }}</p>
                    <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Who It's For -->
          <template #for>
            <div class="space-y-8 pt-8">
              <div class="flex flex-wrap gap-3">
                <UBadge
                  v-for="item in audience"
                  :key="item"
                  color="teal"
                  variant="soft"
                  size="lg"
                  class="text-sm"
                >
                  {{ item }}
                </UBadge>
              </div>
              <blockquote class="border-l-4 border-teal-400 pl-4 text-base italic text-slate-600 dark:text-slate-300">
                "{{ t('features.forQuote') }}"
              </blockquote>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                {{ t('whoItsFor.notFor') }}
              </p>
            </div>
          </template>
        </UTabs>
      </div>
    </UContainer>
  </section>
</template>
