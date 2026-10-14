<script setup lang="ts">
import type { Server } from '#layers/server-browser/shared/api/servers'
import type { TableColumn } from '@nuxt/ui'

const { servers, filters } = useServerBrowser()

const table = useTemplateRef('table')
useThemedOverlayScrollbars(() => table.value?.$el)

const columns: TableColumn<Server>[] = [
  {
    id: 'server',
    accessorKey: 'serverName',
    header: 'Server',
    meta: {
      class: {
        td: 'truncate',
      },
    },
  },
  {
    id: 'map',
    accessorKey: 'mapName',
    header: 'Map',
    meta: {
      class: {
        th: 'w-[calc(32ch_+_2rem)]',
        td: 'truncate',
      },
    },
  },
  {
    id: 'players',
    header: 'Players',
    meta: {
      class: {
        th: 'w-[calc(7ch_+_2rem)] text-center',
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
</script>

<template>
  <UTable
    ref="table"
    caption="Server Browser"
    :data="servers.list"
    :columns="columns"
    :loading="servers.isLoading"
    sticky
    :ui="{
      root: 'rounded-md border border-default size-full font-mono',
      thead: 'bg-elevated',
      separator: 'bg-border',
      base: 'h-full w-full min-w-[calc(103ch_+_10rem)] table-fixed text-sm',
      tbody: 'h-full',
    }"
    :meta="{
      class: {
        // reference: https://github.com/nuxt/ui/issues/3865
        tr: (row) => (filters.isVisible(row.original.ip, row.original.port) ? '' : 'collapse'),
      },
    }"
    data-overlayscrollbars-initialize
  >
    <template #loading>
      <ServerBrowserTableLoading />
    </template>
    <template #empty>
      <ServerBrowserTableError v-if="servers.error" />
      <ServerBrowserTableEmpty v-else />
    </template>
    <template #server-cell="{ row }">
      <ServerBrowserTableCensoredText
        :text="row.original.serverName"
        :hide-profanity="filters.hideProfanity"
      />
    </template>
    <template #map-cell="{ row }">
      <ServerBrowserTableCensoredText
        :text="row.original.mapName"
        :hide-profanity="filters.hideProfanity"
      />
    </template>
    <template #players-cell="{ row }">
      <ServerBrowserTablePlayerCountBadge
        class="w-full justify-center"
        :player-count="row.original.playerCount"
        :max-player-count="row.original.maxPlayerCount"
      />
    </template>
    <template #actions-cell="{ row }">
      <ServerBrowserTableRowActions
        :ip="row.original.ip"
        :port="row.original.port"
        :server-name="row.original.serverName"
      />
    </template>
  </UTable>
</template>
