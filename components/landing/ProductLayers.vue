<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const layers = computed(() => [
  {
    title: t('productLayers.layers.identity.title'),
    description: t('productLayers.layers.identity.description'),
    image: sectionPrompts.identity
  },
  {
    title: t('productLayers.layers.values.title'),
    description: t('productLayers.layers.values.description'),
    image: sectionPrompts.values
  },
  {
    title: t('productLayers.layers.biological.title'),
    description: t('productLayers.layers.biological.description'),
    image: sectionPrompts.biological
  },
  {
    title: t('productLayers.layers.legal.title'),
    description: t('productLayers.layers.legal.description'),
    image: sectionPrompts.legal
  },
  {
    title: t('productLayers.layers.accountability.title'),
    description: t('productLayers.layers.accountability.description'),
    image: sectionPrompts.accountability
  },
  {
    title: t('productLayers.layers.support.title'),
    description: t('productLayers.layers.support.description'),
    image: sectionPrompts.support
  }
])
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="flex flex-col gap-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">{{ t('productLayers.title') }}</h2>
          <p class="mt-3 text-slate-600 dark:text-slate-300">
            {{ t('productLayers.description') }}
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UCard v-for="layer in layers" :key="layer.title" class="overflow-hidden bg-white dark:bg-slate-900">
            <div class="space-y-4">
              <AiImageContainer
                :prompt="layer.image.prompt"
                aspectRatio="square"
                :alt="layer.title"
                shadow="none"
                class="h-48 w-full -mx-6 -mt-6 mb-4"
                :rounded="false"
              />
              <div class="space-y-2">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ layer.title }}</h3>
                <p class="text-sm text-slate-600 dark:text-slate-300">{{ layer.description }}</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
