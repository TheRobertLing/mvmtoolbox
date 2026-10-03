<script setup lang="ts">
const props = defineProps<{ text: string; hideProfanity: boolean }>()

const segments = computed(() =>
  props.hideProfanity ? censorProfanity(props.text) : [{ text: props.text, censored: false }]
)
</script>

<template>
  <span>
    <span v-for="(segment, i) in segments" :key="i" :class="segment.censored && 'text-error'">{{
      segment.text
    }}</span>
  </span>
</template>
