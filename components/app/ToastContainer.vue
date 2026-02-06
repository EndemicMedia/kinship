<script setup lang="ts">
const uiStore = useUIStore()

// Auto-dismiss toasts after duration
watch(() => uiStore.toasts.length, () => {
  uiStore.toasts.forEach(toast => {
    if (!toast.dismissed) {
      setTimeout(() => {
        uiStore.dismissToast(toast.id)
      }, toast.duration || 5000)
    }
  })
})

const toastIconMap = {
  success: 'i-heroicons-check-circle',
  error: 'i-heroicons-x-circle',
  warning: 'i-heroicons-exclamation-triangle',
  info: 'i-heroicons-information-circle'
}

const toastColorMap = {
  success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
}

const toastIconColorMap = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400'
}

function dismissToast(id: number) {
  uiStore.dismissToast(id)
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
      <TransitionGroup 
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <div
          v-for="toast in uiStore.toasts.filter(t => !t.dismissed)"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-lg"
          :class="toastColorMap[toast.color || 'info']"
          role="alert"
        >
          <UIcon 
            :name="toastIconMap[toast.color || 'info']" 
            class="w-5 h-5 flex-shrink-0 mt-0.5"
            :class="toastIconColorMap[toast.color || 'info']"
          />
          <div class="flex-1 min-w-0">
            <p v-if="toast.title" class="font-medium text-sm text-slate-900 dark:text-white">
              {{ toast.title }}
            </p>
            <p v-if="toast.description" class="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              {{ toast.description }}
            </p>
          </div>
          <UButton
            icon="i-heroicons-x-mark"
            variant="ghost"
            color="neutral"
            size="xs"
            class="flex-shrink-0 -mr-1 -mt-1"
            @click="dismissToast(toast.id)"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
