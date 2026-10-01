<script setup lang="ts">
const { isLoading, refresh } = useServerBrowser()
</script>

<template>
  <UButton
    icon="i-lucide-refresh-cw"
    variant="subtle"
    label="Refresh servers"
    :loading="isLoading"
    @click="refresh()"
  />
</template>
