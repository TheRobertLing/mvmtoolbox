<script setup lang="ts">
const { isLoading, refresh } = useServerBrowser()
</script>

<template>
  <UButton
    icon="i-ph-arrows-clockwise-light"
    variant="subtle"
    label="Refresh servers"
    :loading="isLoading"
    @click="refresh()"
  />
</template>
