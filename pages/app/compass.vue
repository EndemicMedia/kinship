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

const currentIndex = ref(0)
const currentMatch = computed(() => potentialMatches.value[currentIndex.value])

const likedUsers = ref<string[]>([])
const passedUsers = ref<string[]>([])
const maybeUsers = ref<string[]>([])

const like = () => {
  if (currentMatch.value) {
    likedUsers.value.push(currentMatch.value.id)
    next()
  }
}

const pass = () => {
  if (currentMatch.value) {
    passedUsers.value.push(currentMatch.value.id)
    next()
  }
}

const maybe = () => {
  if (currentMatch.value) {
    maybeUsers.value.push(currentMatch.value.id)
    next()
  }
}

const next = () => {
  if (currentIndex.value < potentialMatches.value.length - 1) {
    currentIndex.value++
  }
}

const previous = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const reset = () => {
  currentIndex.value = 0
  likedUsers.value = []
  passedUsers.value = []
  maybeUsers.value = []
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

    <!-- Card Stack -->
    <div class="flex justify-center">
      <div v-if="currentMatch" class="w-full max-w-md">
        <UCard class="relative overflow-hidden">
          <!-- Card Header -->
          <div class="aspect-square bg-gradient-to-br from-teal-100 to-slate-200 dark:from-teal-900 dark:to-slate-800 flex items-center justify-center">
            <UAvatar :src="currentMatch.avatar" :alt="currentMatch.name" size="3xl" class="w-32 h-32 text-4xl" />
          </div>
          
          <!-- Card Content -->
          <div class="p-6 space-y-4">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">{{ currentMatch.name }}</h2>
                <p class="text-slate-500">{{ currentMatch.location }}</p>
              </div>
              <UBadge color="primary" variant="soft">
                {{ currentMatch.role.replace('-', ' ') }}
              </UBadge>
            </div>
            
            <p class="text-slate-600 dark:text-slate-400">{{ currentMatch.bio }}</p>
            
            <div class="flex flex-wrap gap-2">
              <UBadge v-for="seeking in currentMatch.seeking" :key="seeking" variant="soft" size="sm">
                Seeking: {{ seeking.replace('-', ' ') }}
              </UBadge>
            </div>
            
            <div class="pt-4 border-t space-y-2">
              <div class="flex items-center gap-2 text-sm">
                <UIcon name="i-heroicons-language" class="w-4 h-4 text-slate-400" />
                <span class="text-slate-600">{{ currentMatch.languages.join(', ') }}</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <UIcon name="i-heroicons-users" class="w-4 h-4 text-slate-400" />
                <span class="text-slate-600">{{ currentMatch.children }} children</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-slate-400" />
                <span class="text-slate-600">{{ currentMatch.availability }}</span>
              </div>
            </div>
          </div>
        </UCard>
        
        <!-- Action Buttons -->
        <div class="flex justify-center gap-4 mt-6">
          <UButton color="rose" variant="soft" size="xl" icon="i-heroicons-x-mark" class="rounded-full w-16 h-16" @click="pass">
            Pass
          </UButton>
          <UButton color="amber" variant="soft" size="lg" icon="i-heroicons-question-mark-circle" class="rounded-full w-14 h-14" @click="maybe">
            Maybe
          </UButton>
          <UButton color="teal" variant="soft" size="xl" icon="i-heroicons-heart" class="rounded-full w-16 h-16" @click="like">
            Like
          </UButton>
        </div>
        
        <!-- Navigation -->
        <div class="flex justify-between mt-4">
          <UButton variant="ghost" :disabled="currentIndex === 0" @click="previous">
            <UIcon name="i-heroicons-chevron-left" class="mr-1" />
            Previous
          </UButton>
          <span class="text-slate-500">{{ currentIndex + 1 }} of {{ potentialMatches.length }}</span>
          <UButton variant="ghost" :disabled="currentIndex >= potentialMatches.length - 1" @click="next">
            Skip
            <UIcon name="i-heroicons-chevron-right" class="ml-1" />
          </UButton>
        </div>
      </div>
      
      <!-- No More Matches -->
      <UCard v-else class="w-full max-w-md text-center p-12">
        <UIcon name="i-heroicons-check-circle" class="w-16 h-16 mx-auto text-teal-500 mb-4" />
        <h2 class="text-xl font-bold mb-2">You're all caught up!</h2>
        <p class="text-slate-600 mb-6">You've reviewed all potential matches.</p>
        <div class="space-y-3">
          <UButton color="primary" @click="reset">Start Over</UButton>
          <p class="text-sm text-slate-500">
            {{ likedUsers.length }} liked, {{ maybeUsers.length }} maybe, {{ passedUsers.length }} passed
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>
