<script setup lang="ts">
const props = defineProps<{
  ip: string
  port: number
  label: string
  icon: string
  accessibleLabel: string
}>()

const connectUrl = computed(() => `steam://connect/${serverAddress(props.ip, props.port)}`)
</script>

<template>
  <UTooltip :text="props.label" :delay-duration="0" :content="{ side: 'top' }">
    <UButton
      :to="connectUrl"
      external
      :icon="props.icon"
      :aria-label="props.accessibleLabel"
      variant="ghost"
      color="neutral"
    />
  </UTooltip>
</template>
