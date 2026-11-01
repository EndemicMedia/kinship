<script setup lang="ts">
interface CommandItem {
  id: string
  label: string
  description: string
  icon: string
  shortcut?: string[]
  click: () => unknown
}

interface CommandGroup {
  key: string
  label: string
  commands: CommandItem[]
}

const props = defineProps<{ open?: boolean }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()
const { t } = useI18n()
const localePath = useLocalePath()
const crewsStore = useCrewsStore()
const isOpen = ref(false)
const selectedCommand = ref<CommandItem>()
const paletteOpen = computed({
  get: () => props.open ?? isOpen.value,
  set: (value: boolean) => {
    isOpen.value = value
    emit('update:open', value)
  }
})

const commandGroups = computed<CommandGroup[]>(() => [
  {
    key: 'actions',
    label: t('commandPalette.quickActions'),
    commands: [
      { id: 'new-crew', label: t('commandPalette.createNewCrew'), description: t('commandPalette.createNewCrew'), icon: 'i-heroicons-plus-circle', shortcut: ['N'], click: () => navigateTo(localePath('/app/crews/create')) },
      { id: 'browse-compass', label: t('commandPalette.browseCompass'), description: t('commandPalette.browseCompass'), icon: 'i-heroicons-magnifying-glass', shortcut: ['B'], click: () => navigateTo(localePath('/app/compass')) },
      { id: 'view-profile', label: t('commandPalette.viewProfile'), description: t('commandPalette.viewProfile'), icon: 'i-heroicons-user', shortcut: ['P'], click: () => navigateTo(localePath('/app/profile')) },
      { id: 'legal-docs', label: t('commandPalette.legalDocuments'), description: t('commandPalette.legalDocuments'), icon: 'i-heroicons-folder', shortcut: ['L'], click: () => navigateTo(localePath('/app/legal')) }
    ]
  },
  {
    key: 'crews',
    label: t('commandPalette.myCrews'),
    commands: crewsStore.crews.slice(0, 5).map(crew => ({
      id: `crew-${crew.id}`,
      label: crew.name,
      description: `${crew.members.length} ${t('commandPalette.members')}`,
      icon: 'i-heroicons-user-group',
      click: () => navigateTo(localePath(`/app/crews/detail?id=${encodeURIComponent(crew.id)}`))
    }))
  },
  {
    key: 'pages',
    label: t('commandPalette.pages'),
    commands: [
      { id: 'dashboard', label: t('commandPalette.dashboard'), description: t('commandPalette.dashboard'), icon: 'i-heroicons-home', shortcut: ['D'], click: () => navigateTo(localePath('/app')) },
      { id: 'crews-page', label: t('commandPalette.myCrews'), description: t('commandPalette.myCrews'), icon: 'i-heroicons-users', shortcut: ['C'], click: () => navigateTo(localePath('/app/crews')) },
      { id: 'compass', label: t('commandPalette.theCompass'), description: t('commandPalette.theCompass'), icon: 'i-heroicons-magnifying-glass', shortcut: ['T'], click: () => navigateTo(localePath('/app/compass')) },
      { id: 'profile', label: t('commandPalette.profile'), description: t('commandPalette.profile'), icon: 'i-heroicons-user-circle', shortcut: ['P'], click: () => navigateTo(localePath('/app/profile')) },
      { id: 'legal', label: t('commandPalette.legal'), description: t('commandPalette.legal'), icon: 'i-heroicons-document-text', shortcut: ['L'], click: () => navigateTo(localePath('/app/legal')) }
    ]
  }
])

onMounted(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      paletteOpen.value = true
    }
    if (event.key === 'Escape') paletteOpen.value = false
  }
  window.addEventListener('keydown', handleKeyDown)
  onUnmounted(() => window.removeEventListener('keydown', handleKeyDown))
})

function onSelect(option: CommandItem) {
  option.click()
  paletteOpen.value = false
  selectedCommand.value = undefined
}
</script>

<template>
  <div class="contents">
    <UButton
      icon="i-heroicons-magnifying-glass"
      variant="outline"
      color="gray"
      class="hidden w-full justify-between text-slate-500 md:flex"
      :aria-label="t('commandPalette.searchButton')"
      @click="paletteOpen = true"
    >
      <span class="flex-1 text-left">{{ t('commandPalette.searchButton') }}</span>
      <UKbd>⌘K</UKbd>
    </UButton>
    <UModal v-model="paletteOpen" :ui="{ width: 'sm:max-w-2xl' }">
      <UCommandPalette
        v-model="selectedCommand"
        :groups="commandGroups"
        :placeholder="t('commandPalette.searchPlaceholder')"
        @update:model-value="onSelect"
      />
    </UModal>
  </div>
</template>
