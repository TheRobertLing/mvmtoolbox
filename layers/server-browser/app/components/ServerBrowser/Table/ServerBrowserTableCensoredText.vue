<script setup lang="ts">
import type { CensoredSegment } from '#layers/server-browser/app/utils/censor'

const props = defineProps<{
  text: string
  censored: CensoredSegment[] | null
  hideProfanity: MaybeRefOrGetter<boolean>
}>()

const segments = computed(() => {
  if (props.censored && toValue(props.hideProfanity)) return props.censored
  return [{ text: props.text, censored: false }]
})
</script>

<template>
  <span>
    <span v-for="(segment, i) in segments" :key="i" :class="segment.censored && 'text-error'">{{
      segment.text
    }}</span>
  </span>
</template>
