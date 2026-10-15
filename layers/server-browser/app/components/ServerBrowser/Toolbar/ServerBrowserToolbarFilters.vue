<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const { filters } = useServerBrowser()
const isMobile = useBreakpoints(breakpointsTailwind).smaller('sm')
</script>

<template>
  <UPopover :content="{ align: 'start' }">
    <UButton
      icon="i-ph-funnel-light"
      :label="isMobile ? undefined : 'Filters'"
      aria-label="Filters"
      variant="subtle"
    />

    <template #content>
      <div class="flex flex-col gap-2 p-2.5">
        <USwitch v-model="filters.hideEmpty" label="Hide empty servers" />
        <USwitch v-model="filters.hideFull" label="Hide full servers" />
        <USwitch v-model="filters.hideProfanity" label="Hide profanity" />
      </div>
    </template>
  </UPopover>
</template>
