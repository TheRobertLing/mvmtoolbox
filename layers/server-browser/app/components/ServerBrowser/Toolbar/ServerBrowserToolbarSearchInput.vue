<script setup lang="ts">
const { search } = useServerBrowser()
</script>

<template>
  <UInput
    v-model="search"
    icon="i-ph-magnifying-glass-light"
    placeholder="Search servers"
    variant="subtle"
    class="w-full max-w-xs"
    :ui="{ trailing: 'pr-1' }"
  >
    <template v-if="search.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-ph-x-circle-light"
        aria-label="Clear input"
        :ui="{
          leadingIcon: 'size-3',
        }"
        @click="search = ''"
      />
    </template>
  </UInput>
</template>
