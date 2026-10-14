<script setup lang="ts">
const props = defineProps<{ playerCount: number; maxPlayerCount: number }>()
</script>

<template>
  <UBadge
    :color="isServerFull(props.playerCount, props.maxPlayerCount) ? 'error' : 'success'"
    variant="subtle"
  >
    {{ props.playerCount }} / {{ props.maxPlayerCount }}
  </UBadge>
</template>
