<script setup lang="ts">
import type { Region, Tour } from '../stores/filters'

const region = defineModel<Region>('region', { required: true })
const tour = defineModel<Tour>('tour', { required: true })
</script>

<template>
  <UForm>
    <fieldset class="flex min-w-0 flex-wrap items-center gap-4 rounded border border-default p-2">
      <legend class="bg-default px-2 font-bold">Filters</legend>
      <div class="flex flex-col gap-2 px-2 pb-3 sm:flex-row sm:gap-4">
        <RegionSelect v-model="region" />
        <TourSelect v-model="tour" />
      </div>
    </fieldset>
  </UForm>
</template>
