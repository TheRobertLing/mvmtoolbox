<script setup lang="ts">
defineProps<{ disabled: boolean }>()
const emit = defineEmits<{ refresh: [] }>()
</script>

<template>
  <UTooltip text="Refresh servers" :delay-duration="0" :content="{ side: 'right' }">
    <UButton
      type="button"
      icon="i-lucide-refresh-cw"
      variant="ghost"
      aria-label="Refresh servers"
      :disabled="disabled"
      @click="emit('refresh')"
    />
  </UTooltip>
</template>
