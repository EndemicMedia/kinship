<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { withBase } from 'ufo'
import { usePollinationsImage } from '../../composables/usePollinationsImage'

interface Props {
  prompt: string
  staticSrc?: string
  width?: number
  height?: number
  model?: string
  seed?: number
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'auto'
  alt?: string
  loading?: 'lazy' | 'eager'
  class?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none'
  rounded?: boolean
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const { t } = useI18n()
const props = withDefaults(defineProps<Props>(), {
  aspectRatio: 'auto',
  alt: '',
  loading: 'lazy',
  objectFit: 'cover',
  rounded: true,
  shadow: 'md',
})

const { buildImageFallback } = usePollinationsImage()
const baseURL = useRuntimeConfig().app.baseURL
const isLoaded = ref(false)
const hasError = ref(false)
const usingFallback = ref(false)

const dimensions = computed(() => {
  if (props.aspectRatio === 'auto') return { width: props.width || 1024, height: props.height || 1024 }
  return {
    square: { width: 1024, height: 1024 },
    portrait: { width: 768, height: 1024 },
    landscape: { width: 1024, height: 768 },
    wide: { width: 1200, height: 600 },
  }[props.aspectRatio]
})

const shadowClass = computed(() => ({ none: '', sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg', xl: 'shadow-xl' }[props.shadow]))
const roundedClass = computed(() => props.rounded ? 'rounded-xl' : '')
const objectFitClass = computed(() => ({
  cover: 'object-cover', contain: 'object-contain', fill: 'object-fill', none: 'object-none'
}[props.objectFit]))
const resolvedAlt = computed(() => props.alt || t('image.defaults.alt'))
const fallbackUrl = computed(() => buildImageFallback(props.prompt, { ...dimensions.value, seed: props.seed }))
const imageUrl = computed(() => {
  if (!props.staticSrc || usingFallback.value) return fallbackUrl.value
  return withBase(props.staticSrc, baseURL)
})

watch(() => [props.staticSrc, props.prompt, props.seed], () => {
  usingFallback.value = false
  isLoaded.value = false
  hasError.value = false
})

function handleError() {
  if (usingFallback.value || !props.staticSrc) {
    hasError.value = true
  } else {
    usingFallback.value = true
    isLoaded.value = false
  }
}
</script>

<template>
  <div :class="[shadowClass, roundedClass, 'relative overflow-hidden bg-slate-100 dark:bg-slate-800']">
    <!-- Loading skeleton -->
    <div v-if="!isLoaded && !hasError" aria-hidden="true" class="absolute inset-0 flex items-center justify-center">
      <UIcon name="i-heroicons-photo" class="h-8 w-8 animate-pulse text-slate-400" />
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" role="img" :aria-label="resolvedAlt" class="absolute inset-0 flex items-center justify-center bg-rose-50 dark:bg-rose-950/30">
      <UIcon name="i-heroicons-exclamation-triangle" class="h-8 w-8 text-rose-400" />
    </div>

    <!-- Image — direct src, no fetch/blob -->
    <img
      v-if="!hasError"
      :src="imageUrl"
      :alt="resolvedAlt"
      :loading="props.loading"
      :width="dimensions.width"
      :height="dimensions.height"
      :class="[objectFitClass, roundedClass, props.class, 'h-full w-full transition-opacity duration-500', isLoaded ? 'opacity-100' : 'opacity-0']"
      @load="isLoaded = true"
      @error="handleError"
    />
  </div>
</template>
