<script setup lang="ts">
const { servers, visibleServers, fetchedAt } = useServerBrowser()
const elapsed = useElapsedSince(fetchedAt)
</script>

<template>
  <div
    class="flex flex-col flex-wrap items-center justify-between gap-2 text-center text-xs text-muted sm:flex-row sm:text-left"
  >
    <span>
      Showing <span class="tabular-nums">{{ visibleServers.length }}</span> of
      <span class="tabular-nums">{{ servers.length }}</span> servers
    </span>

    <span v-if="elapsed !== null">
      Time elapsed since last refresh:
      <span class="whitespace-nowrap tabular-nums">{{ elapsed }}</span>
    </span>
  </div>
</template>
