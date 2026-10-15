<script setup lang="ts">
const { filters } = useServerBrowser()
</script>

<template>
  <UInput
    v-model="filters.search"
    icon="i-ph-magnifying-glass-light"
    placeholder="Search servers"
    variant="outline"
    class="min-w-0 flex-1"
    :ui="{ base: 'ring-default', trailing: 'pr-1' }"
  >
    <template v-if="filters.search.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-ph-x-circle-light"
        aria-label="Clear input"
        :ui="{
          leadingIcon: 'size-4',
        }"
        @click="filters.search = ''"
      />
    </template>
  </UInput>
</template>
