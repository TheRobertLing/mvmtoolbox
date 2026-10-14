<script setup lang="ts">
const props = defineProps<{ ip: string; port: number; serverName: string }>()

const connectUrl = computed(() => `steam://connect/${serverAddress(props.ip, props.port)}`)
</script>

<template>
  <UTooltip text="Join server" :delay-duration="0" :content="{ side: 'top' }">
    <UButton
      :to="connectUrl"
      external
      icon="i-ph-plugs-light"
      :aria-label="`Join ${props.serverName}`"
      variant="ghost"
      color="neutral"
    />
  </UTooltip>
</template>
