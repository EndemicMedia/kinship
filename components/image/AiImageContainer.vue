<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePollinationsImage } from '../../composables/usePollinationsImage'

interface Props {
  prompt: string
  staticSrc?: string   // pre-generated local path, skips live fetch when set
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

const { resolveUrl } = usePollinationsImage()
const imageUrl = ref<string | null>(props.staticSrc ?? null)
const isLoaded = ref(!!props.staticSrc) // static images are already "loaded"
const hasError = ref(false)

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
const objectFitClass = computed(() => `object-${props.objectFit}`)
const resolvedAlt = computed(() => props.alt || t('image.defaults.alt'))

onMounted(async () => {
  // Skip live fetch if a pre-generated static image is provided
  if (props.staticSrc) return
  try {
    imageUrl.value = await resolveUrl(props.prompt, {
      width: dimensions.value.width,
      height: dimensions.value.height,
      model: props.model,
      seed: props.seed,
    })
  } catch {
    hasError.value = true
  }
})
</script>

<template>
  <div :class="[shadowClass, roundedClass, 'relative overflow-hidden bg-slate-100 dark:bg-slate-800']">
    <!-- Loading skeleton -->
    <div v-if="!imageUrl && !hasError" class="absolute inset-0 flex items-center justify-center">
      <UIcon name="i-heroicons-photo" class="h-8 w-8 animate-pulse text-slate-400" />
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" class="absolute inset-0 flex items-center justify-center bg-rose-50 dark:bg-rose-950/30">
      <UIcon name="i-heroicons-exclamation-triangle" class="h-8 w-8 text-rose-400" />
    </div>

    <!-- Image — direct src, no fetch/blob -->
    <img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="resolvedAlt"
      :loading="loading"
      :class="[objectFitClass, roundedClass, props.class, 'h-full w-full transition-opacity duration-500', isLoaded ? 'opacity-100' : 'opacity-0']"
      @load="isLoaded = true"
      @error="hasError = true"
    />
  </div>
</template>
