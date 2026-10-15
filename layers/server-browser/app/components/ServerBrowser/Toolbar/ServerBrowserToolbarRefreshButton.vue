<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'

const { servers } = useServerBrowser()
const isMobile = useBreakpoints(breakpointsTailwind).smaller('sm')
</script>

<template>
  <UButton
    icon="i-ph-arrow-clockwise"
    variant="subtle"
    :label="isMobile ? undefined : 'Refresh servers'"
    aria-label="Refresh servers"
    :loading="servers.isLoading"
    @click="servers.refresh()"
  />
</template>
