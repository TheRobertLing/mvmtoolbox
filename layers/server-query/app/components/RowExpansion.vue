<script setup lang="ts">
import type { PlayerState } from '../composables/useServerTable'

defineProps<{ state?: PlayerState }>()
</script>

<template>
  <div class="px-14 py-2">
    <ServerPlayersLoading v-if="state?.status === 'loading'" />
    <ServerPlayersError v-else-if="state?.status === 'error'" />
    <ServerPlayersTable v-else-if="state?.status === 'success'" :players="state.players" />
  </div>
</template>
