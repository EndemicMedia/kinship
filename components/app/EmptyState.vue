<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
  action?: {
    label: string
    to: string
    icon?: string
  }
  secondaryAction?: {
    label: string
    to: string
    icon?: string
  }
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
    <!-- Icon Container -->
    <div class="relative mb-6">
      <div class="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <UIcon :name="icon" class="w-12 h-12 text-slate-400" />
      </div>
      <!-- Decorative elements -->
      <div class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-100 dark:bg-primary-900/30 animate-pulse" />
      <div class="absolute -bottom-2 left-4 w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse delay-75" />
    </div>

    <!-- Title -->
    <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="text-slate-600 dark:text-slate-400 max-w-md mb-6">
      {{ description }}
    </p>

    <!-- Primary Action -->
    <div class="flex flex-col sm:flex-row gap-3">
      <UButton
        v-if="action"
        :to="action.to"
        color="primary"
        :icon="action.icon || 'i-heroicons-plus'"
        size="lg"
      >
        {{ action.label }}
      </UButton>

      <UButton
        v-if="secondaryAction"
        :to="secondaryAction.to"
        variant="outline"
        color="neutral"
        :icon="secondaryAction.icon"
        size="lg"
      >
        {{ secondaryAction.label }}
      </UButton>
    </div>

    <!-- Optional: Slot for custom content -->
    <slot />
  </div>
</template>
