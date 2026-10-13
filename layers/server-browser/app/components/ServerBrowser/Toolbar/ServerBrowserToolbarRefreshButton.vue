<script setup lang="ts">
const { isLoading, refresh } = useServerBrowser()
</script>

<template>
  <UButton
    icon="i-ph-arrow-clockwise"
    variant="subtle"
    label="Refresh servers"
    :loading="isLoading"
    @click="refresh()"
  />
</template>
