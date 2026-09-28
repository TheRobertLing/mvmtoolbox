<script setup lang="ts">
defineProps<{ expanded: boolean }>()
const emit = defineEmits<{ toggle: [] }>()
</script>

<template>
  <div class="flex items-center justify-center">
    <RowExpansionButton :expanded="expanded" @toggle="emit('toggle')" />
  </div>
</template>
