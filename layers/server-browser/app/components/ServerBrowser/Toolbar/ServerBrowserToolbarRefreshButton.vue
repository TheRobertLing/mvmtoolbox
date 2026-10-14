<script setup lang="ts">
const { servers } = useServerBrowser()
</script>

<template>
  <UButton
    icon="i-ph-arrow-clockwise"
    variant="subtle"
    label="Refresh servers"
    :loading="servers.isLoading"
    @click="servers.refresh()"
  />
</template>
