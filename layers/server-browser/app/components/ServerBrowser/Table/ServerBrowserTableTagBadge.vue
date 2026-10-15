<script setup lang="ts">
import type { CensoredSegment } from '#layers/server-browser/app/utils/censor'

const props = defineProps<{
  tag: string
  censored: CensoredSegment[] | null
  hideProfanity: MaybeRefOrGetter<boolean>
}>()

const title = computed(() => {
  if (!props.censored || !toValue(props.hideProfanity)) return props.tag
  return props.censored.map((segment) => segment.text).join('')
})
</script>

<template>
  <UBadge :title="title" class="max-w-[32ch]" color="neutral" variant="soft" size="sm">
    <ServerBrowserTableCensoredText
      class="truncate"
      :text="props.tag"
      :censored="props.censored"
      :hide-profanity="props.hideProfanity"
    />
  </UBadge>
</template>
