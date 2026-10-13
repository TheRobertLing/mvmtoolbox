<script setup lang="ts">
const { search } = useServerBrowser()
</script>

<template>
  <UInput
    v-model="search"
    icon="i-ph-magnifying-glass-light"
    placeholder="Search servers"
    variant="outline"
    class="w-full max-w-xs"
    :ui="{ base: 'ring-default', trailing: 'pr-1' }"
  >
    <template v-if="search.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-ph-x-circle-light"
        aria-label="Clear input"
        :ui="{
          leadingIcon: 'size-4',
        }"
        @click="search = ''"
      />
    </template>
  </UInput>
</template>
