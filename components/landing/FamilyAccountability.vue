<script setup lang="ts">
import AiImageContainer from '../image/AiImageContainer.vue'
import { sectionPrompts } from '../../composables/prompts'

const features = [
  {
    title: 'Incident logging',
    description: 'Document behavioral patterns with severity assessment. Track what interventions work over time.'
  },
  {
    title: 'Escalation protocols',
    description: 'Required actions at each severity level. Primary parent responds first, full crew mobilizes for serious issues.'
  },
  {
    title: 'Court documentation',
    description: 'Generate reports showing proactive family care if legal intervention becomes necessary.'
  }
]

const severityLevels = [
  { level: 1, title: 'Minor', description: 'Primary parent addresses' },
  { level: 2, title: 'Patterns', description: 'Full crew discussion' },
  { level: 3, title: 'Serious', description: 'Crew plus professional help' },
  { level: 4, title: 'Critical', description: 'Immediate mobilization' },
  { level: 5, title: 'Legal', description: 'Court coordination' }
]
</script>

<template>
  <section class="py-16 bg-slate-50 dark:bg-slate-900/30">
    <UContainer>
      <div class="space-y-8">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-semibold text-slate-900 dark:text-white">Family accountability before state intervention</h2>
          <p class="mt-3 text-lg text-slate-600 dark:text-slate-300">
            Those who commit at birth stay responsible for guiding, correcting, and intervening when challenges arise. 
            Kinship provides the structure to respond as a crew before courts step in with punishment.
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2">
          <!-- Main accountability visualization -->
          <div>
            <AiImageContainer
              :prompt="sectionPrompts.accountability.prompt"
              aspectRatio="square"
              alt="Family accountability circle visualization"
              shadow="lg"
              class="h-80 w-full"
            />
          </div>

          <!-- Severity levels -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-slate-900 dark:text-white">Five response levels</h3>
            <div class="space-y-3">
              <UCard 
                v-for="item in severityLevels" 
                :key="item.level" 
                class="bg-white dark:bg-slate-900"
              >
                <div class="flex items-start gap-3">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                    {{ item.level }}
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900 dark:text-white">{{ item.title }}</p>
                    <p class="text-sm text-slate-600 dark:text-slate-300">{{ item.description }}</p>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>

        <!-- Supporting photo -->
        <AiImageContainer
          :prompt="sectionPrompts.accountabilitySupport.prompt"
          aspectRatio="landscape"
          alt="Multigenerational crew supporting teenager"
          shadow="lg"
          class="h-64 w-full"
        />

        <!-- Feature cards -->
        <div class="grid gap-4 lg:grid-cols-3">
          <UCard v-for="feature in features" :key="feature.title" class="bg-white dark:bg-slate-900">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ feature.title }}</h3>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ feature.description }}</p>
          </UCard>
        </div>
      </div>
    </UContainer>
  </section>
</template>
