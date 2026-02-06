<script setup lang="ts">
const uiStore = useUIStore()
const authStore = useAuthStore()
const crewsStore = useCrewsStore()

const isOpen = ref(false)
const searchQuery = ref('')

// Command palette groups
const commandGroups = computed(() => [
  {
    id: 'actions',
    label: 'Quick Actions',
    items: [
      { 
        id: 'new-crew', 
        label: 'Create New Crew', 
        icon: 'i-heroicons-plus-circle',
        shortcut: ['N'],
        click: () => navigateTo('/app/crews')
      },
      { 
        id: 'browse-compass', 
        label: 'Browse Compass', 
        icon: 'i-heroicons-magnifying-glass',
        shortcut: ['B'],
        click: () => navigateTo('/app/compass')
      },
      { 
        id: 'view-profile', 
        label: 'View Profile', 
        icon: 'i-heroicons-user',
        shortcut: ['P'],
        click: () => navigateTo('/app/profile')
      },
      { 
        id: 'legal-docs', 
        label: 'Legal Documents', 
        icon: 'i-heroicons-folder',
        shortcut: ['L'],
        click: () => navigateTo('/app/legal')
      }
    ]
  },
  {
    id: 'crews',
    label: 'My Crews',
    items: crewsStore.crews.slice(0, 5).map(crew => ({
      id: `crew-${crew.id}`,
      label: crew.name,
      icon: 'i-heroicons-user-group',
      description: `${crew.members.length} members`,
      click: () => navigateTo(`/app/crews/detail?id=${crew.id}`)
    }))
  },
  {
    id: 'pages',
    label: 'Pages',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'i-heroicons-home', shortcut: ['D'], click: () => navigateTo('/app') },
      { id: 'crews', label: 'My Crews', icon: 'i-heroicons-users', shortcut: ['C'], click: () => navigateTo('/app/crews') },
      { id: 'compass', label: 'The Compass', icon: 'i-heroicons-magnifying-glass', shortcut: ['T'], click: () => navigateTo('/app/compass') },
      { id: 'profile', label: 'Profile', icon: 'i-heroicons-user-circle', shortcut: ['P'], click: () => navigateTo('/app/profile') },
      { id: 'legal', label: 'Legal', icon: 'i-heroicons-document-text', shortcut: ['L'], click: () => navigateTo('/app/legal') }
    ]
  }
])

// Filter commands based on search query
const filteredGroups = computed(() => {
  if (!searchQuery.value) return commandGroups.value
  
  const query = searchQuery.value.toLowerCase()
  return commandGroups.value.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query))
    )
  })).filter(group => group.items.length > 0)
})

// Keyboard shortcut to open command palette
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    // Check for ⌘K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      isOpen.value = true
    }
    // Check for Escape to close
    if (e.key === 'Escape') {
      isOpen.value = false
    }
  }
  
  window.addEventListener('keydown', handleKeyDown)
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
})

function onSelect(option: any) {
  if (option.click) {
    option.click()
  }
  isOpen.value = false
  searchQuery.value = ''
}
</script>

<template>
  <div>
    <!-- Trigger Button -->
    <UButton
      icon="i-heroicons-magnifying-glass"
      variant="outline"
      color="neutral"
      class="w-full justify-between text-slate-500 hidden md:flex"
      @click="isOpen = true"
    >
      <span class="flex-1 text-left">Search...</span>
      <UKbd>⌘K</UKbd>
    </UButton>
    
    <!-- Mobile Trigger -->
    <UButton
      icon="i-heroicons-magnifying-glass"
      variant="ghost"
      color="neutral"
      class="md:hidden"
      @click="isOpen = true"
    />

    <!-- Command Palette Modal -->
    <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
      <UCommandPalette
        v-model="searchQuery"
        :groups="filteredGroups"
        placeholder="Search crews, people, or actions..."
        @update:model-value="onSelect"
      />
    </UModal>
  </div>
</template>
