<script setup lang="ts">
import type { Region } from '../stores/filters'

const region = defineModel<Region>({ required: true })
const regionOptions: { label: string; value: Region }[] = [
  { label: 'All', value: 'All' },
  { label: 'North America', value: 'NA' },
  { label: 'Europe', value: 'EU' },
  { label: 'South America', value: 'SA' },
  { label: 'Asia', value: 'AS' },
  { label: 'Oceania', value: 'OC' },
  { label: 'Africa', value: 'AF' },
]
</script>

<template>
  <UFormField label="Region:" orientation="horizontal">
    <USelect v-model="region" :items="regionOptions" class="w-40" />
  </UFormField>
</template>
