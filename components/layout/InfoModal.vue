<script setup lang="ts">
import { nextTick, ref, useId, watch } from 'vue'

const props = defineProps<{ topic: string | null }>()
const emit = defineEmits<{ 'update:topic': [value: string | null] }>()
const { t } = useI18n()
const id = useId()
const titleId = `landing-info-title-${id}`
const bodyId = `landing-info-body-${id}`
const dialog = ref<HTMLDialogElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let returnFocus: HTMLElement | null = null

watch(() => props.topic, async (topic) => {
  await nextTick()
  if (topic && dialog.value && !dialog.value.open) {
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    dialog.value.showModal()
    closeButton.value?.focus()
  } else if (!topic && dialog.value?.open) {
    dialog.value.close()
  }
})

function handleClose() {
  emit('update:topic', null)
  returnFocus?.focus()
}
</script>

<template>
  <dialog
    ref="dialog"
    :aria-labelledby="titleId"
    :aria-describedby="bodyId"
    class="m-auto w-[calc(100%_-_2rem)] max-w-xl rounded-2xl bg-white p-6 text-slate-900 shadow-xl backdrop:bg-slate-950/60 dark:bg-slate-900 dark:text-white"
    @close="handleClose"
    @click="($event.target === dialog) && dialog?.close()"
  >
    <div v-if="topic" class="space-y-5">
      <h2 :id="titleId" class="text-2xl font-semibold">{{ t(`showcase.info.${topic}.title`) }}</h2>
      <p :id="bodyId" class="leading-relaxed text-slate-600 dark:text-slate-300">{{ t(`showcase.info.${topic}.body`) }}</p>
      <button ref="closeButton" type="button" class="rounded-lg bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800" @click="dialog?.close()">
        {{ t('showcase.close') }}
      </button>
    </div>
  </dialog>
</template>
