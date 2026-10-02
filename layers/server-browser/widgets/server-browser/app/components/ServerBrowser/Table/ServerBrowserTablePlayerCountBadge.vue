<script setup lang="ts">
import { isServerFull } from '#widgets/server-browser/shared/api/servers'

const props = defineProps<{ playerCount: number; maxPlayerCount: number }>()
</script>

<template>
  <UBadge :color="isServerFull(props) ? 'error' : 'success'" variant="outline">
    {{ playerCount }} / {{ maxPlayerCount }}
  </UBadge>
</template>
