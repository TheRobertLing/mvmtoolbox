<script setup lang="ts">
import type { Server } from '#widgets/server-browser/shared/api/servers'
import type { TableColumn } from '@nuxt/ui'

const { servers, isVisible, isLoading, error } = useServerBrowser()

const columns: TableColumn<Server>[] = [
  { id: 'server', accessorKey: 'serverName', header: 'Server' },
  {
    id: 'map',
    accessorKey: 'mapName',
    header: 'Map',
  },
  {
    id: 'ip',
    accessorFn: (server) => `${server.ip}:${server.port}`,
    header: 'IP',
  },
  {
    id: 'players',
    header: 'Players',
    meta: {
      class: {
        th: 'w-16 text-center',
        td: 'text-center',
      },
    },
  },
  {
    id: 'actions',
    meta: {
      class: {
        th: 'w-16',
        td: 'text-center',
      },
    },
  },
]

const table = useTemplateRef('table')
useThemedOverlayScrollbars(() => table.value?.$el)
</script>

<template>
  <UTable
    ref="table"
    :data="servers"
    :columns="columns"
    :loading="isLoading"
    sticky
    :ui="{
      root: 'rounded-md border border-accented size-full',
      thead: 'bg-elevated',
      separator: 'bg-border',
      base: 'h-full',
      tbody: 'h-full',
      td: 'font-mono',
    }"
    :meta="{
      class: {
        // reference: https://github.com/nuxt/ui/issues/3865
        tr: (row) => (isVisible(row.original) ? '' : 'collapse'),
      },
    }"
    data-overlayscrollbars-initialize
  >
    <template #loading>
      <ServerBrowserTableLoading />
    </template>
    <template #empty>
      <ServerBrowserTableError v-if="error" />
      <ServerBrowserTableEmpty v-else />
    </template>
    <template #server-cell="{ row }">
      <ServerBrowserTableCensoredText :text="row.original.serverName" />
    </template>
    <template #map-cell="{ row }">
      <ServerBrowserTableCensoredText :text="row.original.mapName" />
    </template>
    <template #players-cell="{ row }">
      <ServerBrowserTablePlayerCountBadge
        class="w-full justify-center"
        :player-count="row.original.playerCount"
        :max-player-count="row.original.maxPlayerCount"
      />
    </template>
    <template #actions-cell="{ row }">
      <ServerBrowserTableRowActions :server="row.original" />
    </template>
  </UTable>
</template>
