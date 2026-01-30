<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'
</script>

<template>
  <section class="py-16">
    <UContainer>
      <div class="relative overflow-hidden rounded-2xl">
        <!-- Background AI Image -->
        <div class="absolute inset-0 z-0">
          <AiImageContainer
            :prompt="sectionPrompts.cta.prompt"
            aspectRatio="wide"
            alt="Open door with bright future ahead"

            shadow="none"
            :rounded="false"
            class="h-full w-full"
          
            />
          <!-- Gradient overlay for text readability -->
          <div class="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-slate-900/80 to-indigo-900/90" 
            />
        </div>
        
        <!-- Content -->
        <UCard class="relative z-10 border-0 bg-transparent">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="max-w-xl">
              <h2 class="text-3xl font-semibold text-white">Ready to build your parenting team?</h2>
              <p class="mt-3 text-sm text-white/80">
                Start with a guided plan, align on values, and move forward together with clarity and support.
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <UButton color="white" variant="solid" size="lg" aria-label="Request a Kinship demo">
                Request a demo
              </UButton>
              <UButton color="white" variant="ghost" size="lg" aria-label="Join the Kinship waitlist">
                Join the waitlist
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
