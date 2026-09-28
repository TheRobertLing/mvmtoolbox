<script setup lang="ts">
defineProps<{ count: number }>()
</script>

<template>
  <span
    >Servers Retrieved: <span class="tabular-nums">{{ count }}</span></span
  >
</template>
