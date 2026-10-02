<script setup lang="ts">
const props = defineProps<{ text: string }>()

const { hideProfanity } = useServerBrowser()

const segments = computed(() =>
  hideProfanity.value ? censorProfanity(props.text) : [{ text: props.text, censored: false }]
)
</script>

<template>
  <span>
    <span v-for="(segment, i) in segments" :key="i" :class="segment.censored && 'text-error'">{{
      segment.text
    }}</span>
  </span>
</template>
