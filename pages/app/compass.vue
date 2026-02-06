<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockUsers } from '~/data/mock-users'

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const authStore = useAuthStore()

// Filter out current user and create potential matches
const potentialMatches = computed(() => {
  const currentUserId = authStore.currentUser?.id
  return mockUsers.filter(user => user.id !== currentUserId && user.status === 'available')
})

const likedUsers = ref<string[]>([])
const passedUsers = ref<string[]>([])
const maybeUsers = ref<string[]>([])

const like = (userId: string) => {
  if (!likedUsers.value.includes(userId)) {
    likedUsers.value.push(userId)
  }
}

const pass = (userId: string) => {
  if (!passedUsers.value.includes(userId)) {
    passedUsers.value.push(userId)
  }
}

const maybe = (userId: string) => {
  if (!maybeUsers.value.includes(userId)) {
    maybeUsers.value.push(userId)
  }
}

const reset = () => {
  likedUsers.value = []
  passedUsers.value = []
  maybeUsers.value = []
}

const getUserStatus = (userId: string) => {
  if (likedUsers.value.includes(userId)) return 'liked'
  if (passedUsers.value.includes(userId)) return 'passed'
  if (maybeUsers.value.includes(userId)) return 'maybe'
  return null
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">The Compass</h1>
        <p class="text-slate-600 dark:text-slate-400 mt-1">Find your perfect parenting crew</p>
      </div>
      <UButton variant="ghost" icon="i-heroicons-adjustments-horizontal" disabled title="Filters (coming soon)">
        Filters
      </UButton>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4">
      <UCard class="text-center">
        <div class="text-2xl font-bold text-slate-900">{{ potentialMatches.length }}</div>
        <div class="text-sm text-slate-500">Potential</div>
      </UCard>
      <UCard class="text-center">
        <div class="text-2xl font-bold text-teal-600">{{ likedUsers.length }}</div>
        <div class="text-sm text-slate-500">Liked</div>
      </UCard>
      <UCard class="text-center">
        <div class="text-2xl font-bold text-amber-600">{{ maybeUsers.length }}</div>
        <div class="text-sm text-slate-500">Maybe</div>
      </UCard>
      <UCard class="text-center">
        <div class="text-2xl font-bold text-rose-600">{{ passedUsers.length }}</div>
        <div class="text-sm text-slate-500">Passed</div>
      </UCard>
    </div>

    <!-- Profile Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <UCard v-for="match in potentialMatches" :key="match.id" class="relative overflow-hidden">
        <!-- Status Overlay -->
        <div v-if="getUserStatus(match.id)" class="absolute top-2 right-2 z-10">
          <UBadge 
            :color="getUserStatus(match.id) === 'liked' ? 'teal' : getUserStatus(match.id) === 'passed' ? 'rose' : 'amber'"
            variant="solid"
          >
            {{ getUserStatus(match.id) === 'liked' ? 'Liked' : getUserStatus(match.id) === 'passed' ? 'Passed' : 'Maybe' }}
          </UBadge>
        </div>

        <!-- Card Header -->
        <div class="aspect-square bg-gradient-to-br from-teal-100 to-slate-200 dark:from-teal-900 dark:to-slate-800 flex items-center justify-center">
          <UAvatar :src="match.avatar" :alt="match.name" size="3xl" class="w-32 h-32 text-4xl" />
        </div>
        
        <!-- Card Content -->
        <div class="p-6 space-y-4">
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ match.name }}</h2>
              <p class="text-slate-500">{{ match.location }}</p>
            </div>
            <UBadge color="primary" variant="soft">
              {{ match.role.replace('-', ' ') }}
            </UBadge>
          </div>
          
          <p class="text-slate-600 dark:text-slate-400 line-clamp-3">{{ match.bio }}</p>
          
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="seeking in match.seeking" :key="seeking" variant="soft" size="sm">
              Seeking: {{ seeking.replace('-', ' ') }}
            </UBadge>
          </div>
          
          <div class="pt-4 border-t space-y-2">
            <div class="flex items-center gap-2 text-sm">
              <UIcon name="i-heroicons-language" class="w-4 h-4 text-slate-400" />
              <span class="text-slate-600">{{ match.languages.join(', ') }}</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <UIcon name="i-heroicons-users" class="w-4 h-4 text-slate-400" />
              <span class="text-slate-600">{{ match.children }} children</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <UIcon name="i-heroicons-clock" class="w-4 h-4 text-slate-400" />
              <span class="text-slate-600">{{ match.availability }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="px-6 pb-6">
          <div class="flex justify-center gap-3">
            <UButton 
              color="rose" 
              variant="soft" 
              size="lg" 
              icon="i-heroicons-x-mark" 
              class="rounded-full w-12 h-12" 
              :disabled="getUserStatus(match.id) === 'passed'"
              @click="pass(match.id)"
            />
            <UButton 
              color="amber" 
              variant="soft" 
              size="lg" 
              icon="i-heroicons-question-mark-circle" 
              class="rounded-full w-12 h-12" 
              :disabled="getUserStatus(match.id) === 'maybe'"
              @click="maybe(match.id)"
            />
            <UButton 
              color="teal" 
              variant="soft" 
              size="lg" 
              icon="i-heroicons-heart" 
              class="rounded-full w-12 h-12" 
              :disabled="getUserStatus(match.id) === 'liked'"
              @click="like(match.id)"
            />
          </div>
        </div>
      </UCard>
    </div>

    <!-- No Matches -->
    <UCard v-if="potentialMatches.length === 0" class="text-center p-12">
      <UIcon name="i-heroicons-users" class="w-16 h-16 mx-auto text-slate-400 mb-4" />
      <h2 class="text-xl font-bold mb-2">No matches found</h2>
      <p class="text-slate-600">Check back later for new potential crew members.</p>
    </UCard>

    <!-- Reset Button -->
    <div v-if="likedUsers.length > 0 || maybeUsers.length > 0 || passedUsers.length > 0" class="flex justify-center">
      <UButton variant="ghost" @click="reset">
        <UIcon name="i-heroicons-arrow-path" class="mr-2" />
        Reset All Votes
      </UButton>
    </div>
  </div>
</template>
