<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Player } from '../../shared/api/players'

defineProps<{ players: Player[] }>()

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m ${Math.floor(seconds % 60)}s`
}

const playerColumns: TableColumn<Player>[] = [
  { accessorKey: 'playerName', header: 'Player' },
  {
    accessorKey: 'score',
    header: 'Score',
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right tabular-nums',
      },
    },
  },
  {
    accessorKey: 'timePlayedSeconds',
    header: 'Connected',
    cell: ({ row }) => formatDuration(row.original.timePlayedSeconds),
    meta: {
      class: {
        th: 'text-right',
        td: 'text-right tabular-nums',
      },
    },
  },
]
</script>

<template>
  <UTable
    :data="players"
    :columns="playerColumns"
    :ui="{ th: 'px-1.5 py-1', td: 'px-1.5 py-1', empty: 'py-2' }"
  >
    <template #empty>
      <ServerPlayersEmpty />
    </template>
  </UTable>
</template>
