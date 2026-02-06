<script setup lang="ts">
// Dashboard skeleton for loading states
</script>

<template>
  <div class="space-y-6">
    <!-- Welcome Skeleton -->
    <div class="flex items-center justify-between">
      <div class="space-y-2">
        <USkeleton class="h-8 w-64" />
        <USkeleton class="h-4 w-48" />
      </div>
      <USkeleton class="h-12 w-12 rounded-full" />
    </div>

    <!-- Stats Skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <USkeleton v-for="i in 4" :key="i" class="h-32" />
    </div>

    <!-- Quick Actions Skeleton -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <USkeleton v-for="i in 4" :key="i" class="h-24" />
    </div>

    <!-- Content Skeleton -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-4">
        <USkeleton class="h-8 w-48" />
        <USkeleton class="h-64" />
      </div>
      <div class="space-y-4">
        <USkeleton class="h-8 w-32" />
        <USkeleton class="h-64" />
      </div>
    </div>
  </div>
</template>
