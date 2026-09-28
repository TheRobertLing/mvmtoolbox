<script setup lang="ts">
defineProps<{ count: number; maxCount: number }>()
</script>

<template>
  <div class="flex items-center justify-center">
    <PlayerCountBadge :count="count" :max-count="maxCount" />
  </div>
</template>
