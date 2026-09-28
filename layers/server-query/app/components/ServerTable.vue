<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import type { ServerRow } from '../composables/useServerTable'

defineProps<{
  rows: ServerRow[]
  loading: boolean
  refreshDisabled: boolean
  error: boolean
  hasServers: boolean
  lastRefreshAt: number | null
}>()

const expanded = defineModel<Record<string, boolean>>('expanded', { required: true })
const emit = defineEmits<{ refresh: [] }>()
const colorMode = useColorMode()

const serverColumns: TableColumn<ServerRow>[] = [
  {
    id: 'expand',
    header: '',
    meta: {
      class: {
        th: 'w-[44px] text-center align-middle whitespace-nowrap',
        td: 'whitespace-nowrap',
      },
    },
  },
  {
    id: 'server',
    accessorKey: 'server.serverName',
    header: 'Servers',
  },
  {
    id: 'map',
    accessorKey: 'server.mapName',
    header: 'Map',
    meta: {
      class: {
        th: 'w-[220px]',
        td: 'truncate',
      },
    },
  },
  {
    id: 'players',
    accessorKey: 'server.playerCount',
    header: 'Players',
    meta: {
      class: {
        th: 'w-[90px] text-center',
      },
    },
  },
]
</script>

<template>
  <section class="overflow-hidden rounded border border-default">
    <div class="h-150 w-full min-w-0">
      <OverlayScrollbarsComponent
        :options="{
          scrollbars: {
            theme: colorMode.value === 'dark' ? 'os-theme-light' : 'os-theme-dark',
            clickScroll: true,
          },
        }"
        class="size-full"
        defer
      >
        <UTable
          v-model:expanded="expanded"
          sticky="header"
          :data="rows"
          :columns="serverColumns"
          :get-row-id="(row) => row.value"
          :expanded-options="{ getRowCanExpand: () => true }"
          class="w-full"
          :ui="{
            root: 'overflow-visible',
            base: 'w-full min-w-160 table-fixed',
            tbody: 'border-b border-default',
            th: 'px-2 py-2',
            td: 'p-2',
          }"
        >
          <template #expand-header>
            <div class="flex items-center justify-center">
              <RefreshServerButton :disabled="refreshDisabled" @refresh="emit('refresh')" />
            </div>
          </template>
          <template #empty>
            <TableLoading v-if="loading" />
            <TableError v-else-if="error" />
            <TableEmpty v-else :has-servers="hasServers" />
          </template>
          <template #expand-cell="{ row }">
            <RowExpansionCell :expanded="row.getIsExpanded()" @toggle="row.toggleExpanded()" />
          </template>
          <template #server-cell="{ row }">
            <ServerNameCell
              :name="row.original.server.serverName"
              :country="row.original.server.country"
            />
          </template>
          <template #map-cell="{ row }">
            <MapCell :filename="row.original.server.mapName" :map-name="row.original.mapName" />
          </template>
          <template #players-cell="{ row }">
            <PlayerCountCell
              :count="row.original.server.playerCount"
              :max-count="row.original.server.maxPlayerCount"
            />
          </template>
          <template #expanded="{ row }">
            <RowExpansion :state="row.original.players" />
          </template>
        </UTable>
      </OverlayScrollbarsComponent>
    </div>
    <ServerTableFooter :count="rows.length" :last-refresh-at="lastRefreshAt" />
  </section>
</template>
