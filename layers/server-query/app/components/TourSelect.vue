<script setup lang="ts">
import type { Tour } from '../stores/filters'

const tour = defineModel<Tour>({ required: true })
const tourOptions: { label: string; value: Tour }[] = [
  { label: 'All', value: 'All' },
  { label: 'Boot Camp', value: 'Boot Camp' },
  { label: 'Oil Spill', value: 'Oil Spill' },
  { label: 'Steel Trap', value: 'Steel Trap' },
  { label: 'Mecha Engine', value: 'Mecha Engine' },
  { label: 'Two Cities', value: 'Two Cities' },
  { label: 'Gear Grinder', value: 'Gear Grinder' },
]
</script>

<template>
  <UFormField label="Tour:" orientation="horizontal">
    <USelect v-model="tour" :items="tourOptions" class="w-40" />
  </UFormField>
</template>
