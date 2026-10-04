<script setup lang="ts">
import type { Server } from '#widgets/server-browser/shared/api/servers'

const props = defineProps<{ server: Server }>()

const connectUrl = computed(() => `steam://connect/${props.server.ip}:${props.server.port}`)
</script>

<template>
  <UTooltip text="Join server" :delay-duration="0" :content="{ side: 'top' }">
    <UButton
      :to="connectUrl"
      external
      icon="i-ph-plugs-light"
      :aria-label="`Join ${server.serverName}`"
      variant="ghost"
      color="neutral"
    />
  </UTooltip>
</template>
