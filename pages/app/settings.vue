<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

const toast = useToast()
const router = useRouter()

// Notifications settings
const emailNotifications = ref(true)
const pushNotifications = ref(true)
const weeklyDigest = ref(true)

const saveSettings = () => {
  toast.add({
    title: 'Settings Saved',
    description: 'Your preferences have been updated successfully.',
    color: 'success',
    icon: 'i-heroicons-cog-6-tooth'
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <UButton variant="ghost" icon="i-heroicons-arrow-left" @click="router.push('/app/profile')">
        Back to Profile
      </UButton>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
    </div>

    <!-- Notifications -->
    <UCard>
      <template #header>
        <h3 class="font-semibold">Notifications</h3>
      </template>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">Email Notifications</p>
            <p class="text-sm text-slate-500">Receive updates via email</p>
          </div>
          <UToggle v-model="emailNotifications" />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">Push Notifications</p>
            <p class="text-sm text-slate-500">Get push notifications on your device</p>
          </div>
          <UToggle v-model="pushNotifications" />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium">Weekly Digest</p>
            <p class="text-sm text-slate-500">Weekly summary of activity</p>
          </div>
          <UToggle v-model="weeklyDigest" />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end">
          <UButton color="primary" @click="saveSettings">Save Settings</UButton>
        </div>
      </template>
    </UCard>

    <!-- Account -->
    <UCard>
      <template #header>
        <h3 class="font-semibold">Account</h3>
      </template>

      <div class="space-y-3">
        <UButton block variant="soft" icon="i-heroicons-lock-closed">
          Change Password
        </UButton>
        <UButton block variant="soft" icon="i-heroicons-shield-check">
          Privacy Settings
        </UButton>
        <UButton block color="rose" variant="soft" icon="i-heroicons-trash">
          Delete Account
        </UButton>
      </div>
    </UCard>
  </div>
</template>
