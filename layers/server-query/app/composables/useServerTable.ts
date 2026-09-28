import { storeToRefs } from 'pinia'
import type { Server } from '../../shared/api/servers'
import type { ListServerPlayersParams, Player } from '../../shared/api/players'
import { useServersStore } from '../stores/servers'
import { usePlayersStore } from '../stores/players'
import { useFiltersStore, type Tour } from '../stores/filters'
import { getServerLocation, type ServerLocation } from '../utils/serverLocation'

export type PlayerState =
  { status: 'loading' } | { status: 'error' } | { status: 'success'; players: Player[] }

export type ServerRow = {
  server: Server & ServerLocation
  value: string
  mapName?: string
  players?: PlayerState
}

const missions: Record<string, { name: string; tour: Exclude<Tour, 'all'> }> = {
  mvm_bigrock: { name: 'Benign Infiltration', tour: 'Boot Camp' },
  mvm_bigrock_advanced1: { name: 'Broken Parts', tour: 'Mecha Engine' },
  mvm_bigrock_advanced2: { name: 'Bone Shaker', tour: 'Mecha Engine' },
  mvm_coaltown: { name: 'Crash Course', tour: 'Boot Camp' },
  mvm_coaltown_intermediate: { name: 'Cave-in', tour: 'Oil Spill' },
  mvm_coaltown_intermediate2: { name: 'Quarry', tour: 'Oil Spill' },
  mvm_coaltown_advanced: { name: 'Ctrl+Alt+Destruction', tour: 'Steel Trap' },
  mvm_coaltown_advanced2: { name: 'CPU Slaughter', tour: 'Steel Trap' },
  mvm_coaltown_expert1: { name: 'Cataclysm', tour: 'Gear Grinder' },
  mvm_decoy: { name: "Doe's Drill", tour: 'Boot Camp' },
  mvm_decoy_intermediate: { name: "Doe's Doom", tour: 'Oil Spill' },
  mvm_decoy_intermediate2: { name: 'Day of Wreckening', tour: 'Oil Spill' },
  mvm_decoy_advanced: { name: 'Disk Deletion', tour: 'Steel Trap' },
  mvm_decoy_advanced2: { name: 'Data Demolition', tour: 'Steel Trap' },
  mvm_decoy_advanced3: { name: 'Disintegration', tour: 'Mecha Engine' },
  mvm_decoy_expert1: { name: 'Desperation', tour: 'Gear Grinder' },
  mvm_ghost_town: { name: 'Caliginous Caper', tour: 'Boot Camp' },
  mvm_ghost_town_666: { name: 'GHOST TOWN 666', tour: 'Boot Camp' },
  mvm_mannhattan: { name: 'Big Apple Barricade', tour: 'Boot Camp' },
  mvm_mannhattan_advanced1: { name: 'Empire Escalation', tour: 'Two Cities' },
  mvm_mannhattan_advanced2: { name: 'Metro Malice', tour: 'Two Cities' },
  mvm_mannworks: { name: 'Mann-euvers', tour: 'Boot Camp' },
  mvm_mannworks_intermediate: { name: 'Mean Machines', tour: 'Oil Spill' },
  mvm_mannworks_intermediate2: { name: 'Mann Hunt', tour: 'Oil Spill' },
  mvm_mannworks_advanced: { name: 'Machine Massacre', tour: 'Steel Trap' },
  mvm_mannworks_ironman: { name: 'Mech Mutilation', tour: 'Steel Trap' },
  mvm_mannworks_expert1: { name: 'Mannslaughter', tour: 'Gear Grinder' },
  mvm_rottenburg: { name: 'Village Vanguard', tour: 'Boot Camp' },
  mvm_rottenburg_advanced1: { name: 'Hamlet Hostility', tour: 'Two Cities' },
  mvm_rottenburg_advanced2: { name: 'Bavarian Botbash', tour: 'Two Cities' },
}

function getMission(mapName: string) {
  return missions[mapName]
}

const continentOrder: Record<ServerLocation['continent'], number> = {
  NA: 0, // North America
  EU: 1, // Europe
  SA: 2, // South America
  AS: 3, // Asia
  OC: 4, // Oceania
  AF: 5, // Africa
  AN: 6, // Antarctica
  unknown: 7, // Unknown
}

export function useServerTable() {
  const serversStore = useServersStore()
  const playersStore = usePlayersStore()
  const filtersStore = useFiltersStore()
  const { selectedRegion, selectedTour } = storeToRefs(filtersStore)

  const expanded = ref<Record<string, boolean>>({})

  const loading = computed(
    () => serversStore.status === 'idle' || serversStore.status === 'loading'
  )
  const error = computed(() => serversStore.status === 'error')
  const refreshDisabled = computed(() => loading.value || playersStore.loading)
  const hasServers = computed(() => serversStore.servers.length > 0)
  const lastRefreshAt = computed(() => serversStore.lastRefreshAt)

  const rows = computed<ServerRow[]>(() =>
    serversStore.servers
      .map((server) => ({ ...server, ...getServerLocation(server.serverName) }))
      .filter(
        (server) =>
          (selectedRegion.value === 'All' || server.continent === selectedRegion.value) &&
          (selectedTour.value === 'All' || getMission(server.mapName)?.tour === selectedTour.value)
      )
      .sort(
        (a, b) =>
          continentOrder[a.continent] - continentOrder[b.continent] ||
          Number(a.country === 'unknown') - Number(b.country === 'unknown') ||
          a.country.localeCompare(b.country) ||
          Number(a.city === 'unknown') - Number(b.city === 'unknown') ||
          a.city.localeCompare(b.city) ||
          a.serverName.localeCompare(b.serverName)
      )
      .map((server) => {
        const key = `${server.ip}:${server.port}`
        const status = playersStore.requestsByServer[key]?.status
        let players: PlayerState | undefined
        if (status === 'success') {
          players = {
            status,
            players: [...(playersStore.playersByServer[key] ?? [])].sort(
              (a, b) => b.score - a.score || a.playerName.localeCompare(b.playerName)
            ),
          }
        } else if (status === 'loading' || status === 'error') {
          players = { status }
        }

        return {
          server,
          value: key,
          mapName: getMission(server.mapName)?.name,
          players,
        }
      })
  )

  async function refreshServers(): Promise<void> {
    if (serversStore.status === 'loading' || playersStore.loading) return

    expanded.value = {}
    playersStore.reset()
    await serversStore.queryServers()
  }

  async function loadPlayers(address: ListServerPlayersParams): Promise<void> {
    if (loading.value) return

    const key = `${address.ip}:${address.port}`
    const request = playersStore.requestsByServer[key]
    if (request?.status === 'loading' || request?.status === 'success') return

    await playersStore.queryServerPlayers(address)
    if (playersStore.requestsByServer[key]?.status === 'success') {
      const server = serversStore.servers.find(
        (server) => server.ip === address.ip && server.port === address.port
      )
      if (server) server.playerCount = playersStore.playersByServer[key]?.length ?? 0
    }
  }

  watch(expanded, (keys) => {
    for (const key of Object.keys(keys)) {
      if (!keys[key]) continue
      const row = rows.value.find((item) => item.value === key)
      if (row) loadPlayers(row.server)
    }
  })

  onMounted(() => {
    if (serversStore.status === 'idle') refreshServers()
  })

  return {
    selectedRegion,
    selectedTour,
    expanded,
    rows,
    hasServers,
    lastRefreshAt,
    loading,
    error,
    refreshDisabled,
    refreshServers,
    loadPlayers,
  }
}
