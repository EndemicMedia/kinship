<script setup lang="ts">
interface Props {
  label: string
  value: string | number
  icon: string
  trend?: number
  trendLabel?: string
  iconColor?: string
  iconBgColor?: string
}

const { t } = useI18n()

withDefaults(defineProps<Props>(), {
  trend: 0,
  trendLabel: 'vs last month',
  iconColor: 'text-primary-600 dark:text-primary-400',
  iconBgColor: 'bg-primary-50 dark:bg-primary-900/20'
})
</script>

<template>
  <UCard class="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
    <!-- Background decoration -->
    <div class="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform duration-300 group-hover:scale-110"
      :class="iconBgColor.replace('bg-', 'bg-').replace('50', '500').replace('/20', '')" 
    />
    
    <div class="relative">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400">{{ label }}</p>
          <p class="text-3xl font-bold mt-2 text-slate-900 dark:text-white">{{ value }}</p>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          :class="iconBgColor">
          <UIcon :name="icon" class="w-6 h-6" :class="iconColor" />
        </div>
      </div>
      
      <div v-if="trend !== 0" class="flex items-center gap-1.5 mt-4">
        <div class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
          :class="trend > 0 
            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'">
          <UIcon 
            :name="trend > 0 ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'"
            class="w-3.5 h-3.5" 
          />
          <span>{{ Math.abs(trend) }}%</span>
        </div>
        <span class="text-sm text-slate-500">{{ trendLabel }}</span>
      </div>
      
      <div v-else class="flex items-center gap-1.5 mt-4">
        <div class="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          <UIcon name="i-heroicons-minus" class="w-3.5 h-3.5" />
          <span>0%</span>
        </div>
        <span class="text-sm text-slate-500">{{ trendLabel }}</span>
      </div>
    </div>
  </UCard>
</template>
