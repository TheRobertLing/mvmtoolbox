<script setup lang="ts">
import type { Server } from '#layers/server-browser/shared/api/servers'
import type { TableColumn } from '@nuxt/ui'

const { servers, filters } = useServerBrowser()

const table = useTemplateRef('table')
useThemedOverlayScrollbars(() => table.value?.$el)

const { censor } = createProfanityCensor()
const isProfanityHidden = () => filters.hideProfanity

// reference: 1rem = 16px
// All columns are set based generally on the max length of the text that can appear inside
// plus a rem amount to account for padding
const columns: TableColumn<Server>[] = [
  {
    id: 'server',
    accessorKey: 'serverName',
    header: 'Server',
    meta: {
      class: {
        th: 'w-[calc(64ch_+_1.5rem)]',
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
        th: 'w-[calc(32ch_+_1.5rem)]',
        td: 'truncate',
      },
    },
  },
  {
    id: 'tags',
    header: 'Tags',
    meta: {
      class: {
        th: 'w-[calc(32ch_+_1.5rem)]',
      },
    },
  },
  {
    id: 'players',
    header: 'Players',
    meta: {
      class: {
        th: 'w-[calc(7ch_+_1.5rem)] text-center',
        td: 'text-center',
      },
    },
  },
  {
    id: 'actions',
    meta: {
      class: {
        // 0.75rem = pe-3
        // 1.5rem = make column width larger
        // 1.75rem = width of button
        // ps-0 so that way the right side padding of the player column doesn't make
        // the connect button look asymmetric
        th: 'w-[calc(0.75rem_+_1.5rem_+_1.75rem)] ps-0 text-center',
        td: 'ps-0 text-center',
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
      base: `w-full min-w-[calc(135ch_+_10rem)] table-fixed text-sm ${servers.list.length ? '' : 'h-full'}`,
      root: '@container rounded-md border border-default size-full font-mono',
      thead: 'bg-elevated',
      separator: 'bg-border',
      tbody: servers.list.length ? '' : 'h-full',
      empty: 'p-0',
      loading: 'p-0',
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
        :censored="censor(row.original.serverName)"
        :hide-profanity="isProfanityHidden"
      />
    </template>
    <template #map-cell="{ row }">
      <ServerBrowserTableCensoredText
        :text="row.original.mapName"
        :censored="censor(row.original.mapName)"
        :hide-profanity="isProfanityHidden"
      />
    </template>
    <template #tags-cell="{ row }">
      <div class="flex flex-wrap gap-1">
        <ServerBrowserTableTagBadge
          v-for="tag in row.original.gameTags"
          :key="tag"
          :tag="tag"
          :censored="censor(tag)"
          :hide-profanity="isProfanityHidden"
        />
      </div>
    </template>
    <template #players-cell="{ row }">
      <ServerBrowserTablePlayerCountBadge
        class="w-full justify-center"
        :player-count="row.original.playerCount"
        :max-player-count="row.original.maxPlayerCount"
      />
    </template>
    <template #actions-cell="{ row }">
      <ServerBrowserTableConnectButton
        :ip="row.original.ip"
        :port="row.original.port"
        label="Join server"
        icon="i-ph-plugs-light"
        :accessible-label="`Join ${row.original.serverName}`"
      />
    </template>
  </UTable>
</template>
