<script setup lang="ts">
defineProps<{ count: number; lastRefreshAt: number | null }>()
</script>

<template>
  <footer
    class="flex flex-col flex-wrap items-center justify-between gap-2 border-t border-default px-3 py-2 text-center text-xs text-muted sm:flex-row sm:text-left"
  >
    <ServerCount :count="count" />
    <LastRefreshTime :last-refresh-at="lastRefreshAt" />
  </footer>
</template>
