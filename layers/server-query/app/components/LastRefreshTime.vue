<script setup lang="ts">
const props = defineProps<{ lastRefreshAt: number | null }>()
const elapsedSeconds = ref(0)
let refreshTimer: ReturnType<typeof setInterval> | undefined

function updateElapsedSeconds() {
  elapsedSeconds.value =
    props.lastRefreshAt === null
      ? 0
      : Math.max(0, Math.floor((Date.now() - props.lastRefreshAt) / 1000))
}

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m ${Math.floor(seconds % 60)}s`
}

watch(() => props.lastRefreshAt, updateElapsedSeconds, { immediate: true })

onMounted(() => {
  updateElapsedSeconds()
  refreshTimer = setInterval(updateElapsedSeconds, 1000)
})

onUnmounted(() => clearInterval(refreshTimer))
</script>

<template>
  <span v-if="lastRefreshAt !== null" class="sm:ml-auto sm:text-right">
    Time elapsed since last refresh:
    <span class="whitespace-nowrap tabular-nums">{{ formatDuration(elapsedSeconds) }}</span>
  </span>
</template>
