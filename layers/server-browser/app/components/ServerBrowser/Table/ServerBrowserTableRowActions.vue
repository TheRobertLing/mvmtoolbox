<script setup lang="ts">
import type { Server } from '#layers/server-browser/shared/api/servers'
import type { DropdownMenuItem } from '@nuxt/ui'

const props = defineProps<{ server: Server }>()
const copy = useCopyToClipboard()

const items: DropdownMenuItem[] = [
  {
    label: 'Copy IP',
    icon: 'i-lucide-copy',
    onSelect: () => copy(`${props.server.ip}:${props.server.port}`),
  },
  {
    label: 'Copy server name',
    icon: 'i-lucide-copy',
    onSelect: () => copy(props.server.serverName),
  },
  {
    label: 'Copy map name',
    icon: 'i-lucide-copy',
    onSelect: () => copy(props.server.mapName),
  },
]
</script>

<template>
  <UDropdownMenu :modal="false" :items="items" :content="{ align: 'end' }">
    <UTooltip text="Server actions" :delay-duration="0" :content="{ side: 'top' }">
      <UButton
        icon="i-lucide-ellipsis-vertical"
        aria-label="Server actions"
        variant="ghost"
        color="neutral"
      />
    </UTooltip>
  </UDropdownMenu>
</template>
