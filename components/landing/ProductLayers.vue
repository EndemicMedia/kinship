<script setup lang="ts">
import { computed } from 'vue'
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()

const layers = computed(() => [
  {
    icon: 'i-heroicons-finger-print',
    title: t('productLayers.layers.identity.title'),
    description: t('productLayers.layers.identity.description'),
    image: sectionPrompts.identity
  },
  {
    icon: 'i-heroicons-heart',
    title: t('productLayers.layers.values.title'),
    description: t('productLayers.layers.values.description'),
    image: sectionPrompts.values
  },
  {
    icon: 'i-heroicons-beaker',
    title: t('productLayers.layers.biological.title'),
    description: t('productLayers.layers.biological.description'),
    image: sectionPrompts.biological
  },
  {
    icon: 'i-heroicons-scale',
    title: t('productLayers.layers.legal.title'),
    description: t('productLayers.layers.legal.description'),
    image: sectionPrompts.legal
  },
  {
    icon: 'i-heroicons-shield-check',
    title: t('productLayers.layers.accountability.title'),
    description: t('productLayers.layers.accountability.description'),
    image: sectionPrompts.accountability
  },
  {
    icon: 'i-heroicons-users',
    title: t('productLayers.layers.support.title'),
    description: t('productLayers.layers.support.description'),
    image: sectionPrompts.support
  }
])
</script>

<template>
  <section class="py-20 lg:py-28">
    <UContainer>
      <div class="space-y-12">
        <!-- Section Header -->
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {{ t('productLayers.title') }}
          </h2>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {{ t('productLayers.description') }}
          </p>
        </div>
        
        <!-- Features Grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div 
            v-for="layer in layers" 
            :key="layer.title"
            class="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg dark:bg-slate-800"
          >
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <AiImageContainer
                :prompt="layer.image.prompt"
                aspectRatio="landscape"
                :alt="layer.title"
                shadow="none"
                :rounded="false"
                class="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
            
            <!-- Content -->
            <div class="p-6">
              <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 dark:bg-teal-900/30">
                <UIcon :name="layer.icon" class="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ layer.title }}</h3>
              <p class="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{{ layer.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
