<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const { t } = useI18n()
</script>

<template>
  <section id="mission" class="relative py-20 lg:py-28">
    <UContainer>
      <div class="space-y-20 lg:space-y-28">
        <!-- Section Header -->
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {{ t('problemSolution.title') }}
          </h2>
          <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
            {{ t('problemSolution.description') }}
          </p>
        </div>

        <!-- Problem Section - Image Left, Text Right -->
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div class="order-2 lg:order-1">
            <div class="relative">
              <AiImageContainer
                :prompt="sectionPrompts.problem.prompt"
                aspectRatio="square"
                :alt="t('problemSolution.problem.imageAlt')"
                shadow="xl"
                class="h-[400px] w-full rounded-2xl lg:h-[480px]"
              />
              <!-- Decorative element -->
              <div class="absolute -bottom-6 -left-6 h-full w-full rounded-2xl border-2 border-rose-200/50 dark:border-rose-800/50 -z-10" />
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <div class="space-y-4">
              <div class="inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                <UIcon name="i-heroicons-exclamation-circle" class="h-4 w-4" />
                {{ t('problemSolution.problem.eyebrow') }}
              </div>
              <h3 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                {{ t('problemSolution.problem.title') }}
              </h3>
              <p class="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                {{ t('problemSolution.problem.description') }}
              </p>
              <ul class="space-y-3 pt-2">
                <li class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <UIcon name="i-heroicons-x-circle" class="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span>No clear framework for family planning</span>
                </li>
                <li class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <UIcon name="i-heroicons-x-circle" class="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span>Legal ambiguity and confusion</span>
                </li>
                <li class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <UIcon name="i-heroicons-x-circle" class="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                  <span>Lack of accountability mechanisms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Solution Section - Text Left, Image Right -->
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div class="space-y-4">
            <div class="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              <UIcon name="i-heroicons-check-circle" class="h-4 w-4" />
              {{ t('problemSolution.solution.eyebrow') }}
            </div>
            <h3 class="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {{ t('problemSolution.solution.title') }}
            </h3>
            <p class="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {{ t('problemSolution.solution.description') }}
            </p>
            <ul class="space-y-3 pt-2">
              <li class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <UIcon name="i-heroicons-check-circle" class="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span>Clear, structured framework for all parties</span>
              </li>
              <li class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <UIcon name="i-heroicons-check-circle" class="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span>Built-in legal guidance and support</span>
              </li>
              <li class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <UIcon name="i-heroicons-check-circle" class="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span>Accountability tools and tracking</span>
              </li>
              <li class="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                <UIcon name="i-heroicons-check-circle" class="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                <span>Exit strategies built from the start</span>
              </li>
            </ul>
          </div>
          <div class="relative">
            <AiImageContainer
              :prompt="sectionPrompts.solution.prompt"
              aspectRatio="square"
              :alt="t('problemSolution.solution.imageAlt')"
              shadow="xl"
              class="h-[400px] w-full rounded-2xl lg:h-[480px]"
            />
            <!-- Decorative element -->
            <div class="absolute -bottom-6 -right-6 h-full w-full rounded-2xl border-2 border-emerald-200/50 dark:border-emerald-800/50 -z-10" />
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
