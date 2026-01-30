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
            alt="Multigenerational crew with children walking toward bright future"
            shadow="none"
            :rounded="false"
            class="h-full w-full"
          />
          <!-- Gradient overlay for text readability -->
          <div class="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/75" />
        </div>
        
        <!-- Content -->
        <UCard class="relative z-10 border-0 bg-transparent">
          <div class="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
            <div class="max-w-xl">
              <h2 class="text-3xl font-semibold text-white">Ready to form your crew?</h2>
              <p class="mt-3 text-base text-white/90">
                Start with values alignment. Build legal protection from day one. Maintain support through every transition.
              </p>
            </div>
            <div class="flex flex-wrap gap-3">
              <UButton color="white" variant="solid" size="lg" aria-label="Start building your crew on Kinship">
                Get started
              </UButton>
              <UButton color="white" variant="ghost" size="lg" aria-label="Join the Kinship waitlist">
                Join waitlist
              </UButton>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>
