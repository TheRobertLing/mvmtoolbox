<script setup lang="ts">
const errorUi = {
  root: 'min-h-0 py-2',
  leading: 'mb-1',
  leadingIcon: 'size-4 text-error',
  statusMessage: 'mt-0 text-sm sm:text-sm font-semibold',
  message: 'mt-1 text-sm',
}
</script>

<template>
  <UError
    as="div"
    role="alert"
    icon="i-lucide-circle-alert"
    :clear="false"
    :error="{
      statusMessage: 'Unable to load players',
      message: 'Press Refresh to try again.',
    }"
    :ui="errorUi"
  />
</template>
