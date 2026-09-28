<script setup lang="ts">
const {
  selectedRegion,
  selectedTour,
  expanded,
  rows,
  hasServers,
  lastRefreshAt,
  loading,
  error,
  refreshDisabled,
  refreshServers,
} = useServerTable()
</script>

<template>
  <UContainer class="flex max-w-5xl flex-col gap-4 p-4">
    <TableFilters v-model:region="selectedRegion" v-model:tour="selectedTour" />
    <ServerTable
      v-model:expanded="expanded"
      :rows="rows"
      :loading="loading"
      :refresh-disabled="refreshDisabled"
      :error="error"
      :has-servers="hasServers"
      :last-refresh-at="lastRefreshAt"
      @refresh="refreshServers"
    />
  </UContainer>
</template>
