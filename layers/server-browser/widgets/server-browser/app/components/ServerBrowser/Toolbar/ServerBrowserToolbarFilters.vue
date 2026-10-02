<script setup lang="ts">
const { hideEmpty, hideFull, hideProfanity } = useServerBrowser()
</script>

<template>
  <UPopover :content="{ align: 'start' }">
    <UButton icon="i-lucide-list-filter" label="Filters"  variant="subtle" />

    <template #content>
      <div class="flex flex-col gap-2 p-2.5">
        <USwitch v-model="hideEmpty" label="Hide empty servers" />
        <USwitch v-model="hideFull" label="Hide full servers" />
        <USwitch v-model="hideProfanity" label="Hide profanity" />
      </div>
    </template>
  </UPopover>
</template>
