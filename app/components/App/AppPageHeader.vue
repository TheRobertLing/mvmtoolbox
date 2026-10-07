<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <UPageHeader
    :title="title"
    :description="description"
    :ui="{
      wrapper: 'flex-row items-center justify-between',
      title: 'text-2xl sm:text-2xl font-semibold tracking-tight',
      description: 'mt-1 text-sm',
    }"
  >
    <template v-if="$slots.links" #links>
      <slot name="links" />
    </template>
  </UPageHeader>
</template>
