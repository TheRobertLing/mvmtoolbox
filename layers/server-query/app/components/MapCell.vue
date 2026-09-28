<script setup lang="ts">
defineProps<{ filename: string; mapName?: string }>()
</script>

<template>
  {{ mapName ?? filename }}
</template>
