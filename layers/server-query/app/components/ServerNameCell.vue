<script setup lang="ts">
import type { ServerLocation } from '../utils/serverLocation'

defineProps<{ name: string; country: ServerLocation['country'] }>()
</script>

<template>
  <div class="flex items-center gap-4">
    <CountryFlag :country="country" />
    <span class="truncate">{{ name }}</span>
  </div>
</template>
