<script setup lang="ts">
const { servers, filters } = useServerBrowser()

const lastRefreshed = useTimeAgo(() => servers.fetchedAt ?? Date.now(), {
  showSecond: true,
  updateInterval: 1000,
})
</script>

<template>
  <div
    class="flex flex-col flex-wrap items-center justify-between gap-2 text-center text-xs text-muted sm:flex-row sm:text-left"
  >
    <span>
      Showing <span class="tabular-nums">{{ filters.visibleServers.length }}</span> of
      <span class="tabular-nums">{{ servers.list.length }}</span> servers
    </span>

    <ClientOnly>
      <span v-if="servers.fetchedAt !== null">
        Last refreshed <span class="whitespace-nowrap tabular-nums">{{ lastRefreshed }}</span>
      </span>
    </ClientOnly>
  </div>
</template>
