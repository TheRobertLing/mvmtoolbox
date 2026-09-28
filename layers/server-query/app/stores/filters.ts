import { defineStore } from 'pinia'
import type { ServerLocation } from '../utils/serverLocation'

export type Region = 'All' | ServerLocation['continent']
export type Tour =
  'All' | 'Boot Camp' | 'Oil Spill' | 'Steel Trap' | 'Mecha Engine' | 'Two Cities' | 'Gear Grinder'

export const useFiltersStore = defineStore('filters', () => {
  const selectedRegion = ref<Region>('All')
  const selectedTour = ref<Tour>('All')

  return { selectedRegion, selectedTour }
})
