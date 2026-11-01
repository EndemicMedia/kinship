<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'ufo'

const { t, locale, locales, setLocale } = useI18n()
const interactiveReady = useState('interactive-ready', () => false)
const topic = ref<string | null>(null)
const localePath = useLocalePath()
const baseURL = useRuntimeConfig().app.baseURL
const home = computed(() => localePath('/'))
const legalTopics = ['privacy', 'terms', 'cookies']
const companyTopics = ['about', 'blog', 'contact']

function showInfo(value: string, event: MouseEvent) {
  if (event.currentTarget instanceof HTMLElement) event.currentTarget.focus()
  topic.value = value
}

const localeOptions = computed(() =>
  locales.value.map((item) => ({
    label: typeof item === 'string' ? item : item.name || item.code,
    value: typeof item === 'string' ? item : item.code
  }))
)

const socialLinks = [
  { name: 'LinkedIn', icon: 'i-heroicons-link' },
  { name: 'Twitter', icon: 'i-heroicons-chat-bubble-oval-left-ellipsis' },
  { name: 'Instagram', icon: 'i-heroicons-camera' }
]
</script>

<template>
  <footer class="border-t border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
    <UContainer>
      <div class="grid gap-12 lg:grid-cols-5">
        <!-- Brand -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-3">
            <img :src="withBase('/logo.png', baseURL)" :alt="t('brand.name')" class="h-10 w-10" />
            <span class="text-xl font-semibold text-slate-900 dark:text-white">{{ t('brand.name') }}</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-300 max-w-sm">
            {{ t('footer.tagline') }}
          </p>
          
          <!-- Social Links -->
          <div class="flex gap-3 pt-2">
            <button
              type="button"
              :disabled="!interactiveReady"
              v-for="link in socialLinks" 
              :key="link.name"
              @click="showInfo('community', $event)"
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-teal-100 hover:text-teal-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-teal-900/30 dark:hover:text-teal-400"
              :aria-label="link.name"
            >
              <UIcon :name="link.icon" class="h-5 w-5" />
            </button>
          </div>
        </div>

        <!-- Product -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.product.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li><NuxtLink :to="`${home}#features`" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.product.features') }}</NuxtLink></li>
            <li><NuxtLink :to="`${home}#how-it-works`" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">{{ t('footer.product.howItWorks') }}</NuxtLink></li>
            <li><button type="button" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors" @click="showInfo('pricing', $event)">{{ t('footer.product.pricing') }}</button></li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.company.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li v-for="item in companyTopics" :key="item"><button type="button" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors" @click="showInfo(item, $event)">{{ t(`footer.company.${item}`) }}</button></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="mb-4 text-sm font-semibold text-slate-900 dark:text-white">{{ t('footer.legal.title') }}</h3>
          <ul class="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li v-for="item in legalTopics" :key="item"><button type="button" class="hover:text-teal-600 dark:hover:text-teal-400 transition-colors" @click="showInfo(item, $event)">{{ t(`footer.legal.${item}`) }}</button></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 flex flex-col gap-6 border-t border-slate-200 pt-8 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          &copy; {{ new Date().getFullYear() }} {{ t('brand.name') }}. {{ t('footer.rights') }}
        </p>
        
        <!-- Language Selector -->
        <div class="flex items-center gap-3">
          <label for="landing-language" class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ t('footer.language') }}</label>
          <USelect
            :disabled="!interactiveReady"
            id="landing-language"
            :aria-label="t('footer.language')"
            :model-value="locale"
            :options="localeOptions"
            size="sm"
            class="w-40"
            @update:model-value="setLocale"
          />
        </div>
      </div>
    </UContainer>
  </footer>
  <LayoutInfoModal v-model:topic="topic" />
</template>
