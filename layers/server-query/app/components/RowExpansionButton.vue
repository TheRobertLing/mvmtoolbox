<script setup lang="ts">
defineProps<{ expanded: boolean }>()
const emit = defineEmits<{ toggle: [] }>()
</script>

<template>
  <UTooltip
    :text="expanded ? 'Hide players' : 'Show players'"
    :delay-duration="0"
    :content="{ side: 'right' }"
  >
    <UButton
      :icon="expanded ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
      color="neutral"
      variant="ghost"
      :aria-label="expanded ? 'Hide players' : 'Show players'"
      :aria-expanded="expanded"
      @click="emit('toggle')"
    />
  </UTooltip>
</template>
