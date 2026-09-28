<script setup lang="ts">
defineProps<{ count: number; maxCount: number }>()
</script>

<template>
  <UBadge :color="count >= maxCount ? 'success' : 'error'" variant="subtle">
    {{ count }} / {{ maxCount }}
  </UBadge>
</template>
