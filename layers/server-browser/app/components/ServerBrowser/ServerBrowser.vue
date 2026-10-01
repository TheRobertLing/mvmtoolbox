<script setup lang="ts">
useProvideServerBrowser()
</script>

<template>
  <div class="flex h-[calc(100dvh-var(--ui-header-height)-6rem)] min-h-96 flex-col gap-4">
    <ServerBrowserToolbar />
    <ServerBrowserTable class="min-h-0 flex-1" />
    <ServerBrowserStatusBar />
  </div>
</template>
