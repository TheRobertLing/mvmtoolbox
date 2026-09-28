<script setup lang="ts">
defineProps<{ hasServers: boolean }>()
</script>

<template>
  <div role="status">
    {{ hasServers ? 'No servers match the selected filters.' : 'No servers available.' }}
  </div>
</template>
