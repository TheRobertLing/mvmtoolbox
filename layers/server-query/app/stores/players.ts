import { defineStore } from 'pinia'
import {
  ListServerPlayersResponseSchema,
  type ListServerPlayersParams,
  type Player,
} from '../../shared/api/players'
import type { RequestStatus } from '../types/request'

type PlayerRequestState = {
  status: RequestStatus
  error: string | null
}

export const usePlayersStore = defineStore('players', () => {
  const playersByServer = ref<Partial<Record<string, Player[]>>>({})
  const requestsByServer = ref<Partial<Record<string, PlayerRequestState>>>({})
  const isLoading = computed(() =>
    Object.values(requestsByServer.value).some((request) => request?.status === 'loading')
  )

  async function queryServerPlayers(address: ListServerPlayersParams): Promise<void> {
    const key = `${address.ip}:${address.port}`
    if (requestsByServer.value[key]?.status === 'loading') return

    requestsByServer.value[key] = { status: 'loading', error: null }
    const request = requestsByServer.value[key]
    playersByServer.value[key] = undefined

    await $fetch<unknown>(`/api/v1/servers/${address.ip}/${address.port}/players`, { retry: 0 })
      .then((response) => {
        playersByServer.value[key] = ListServerPlayersResponseSchema.parse(response)
      })
      .catch(() => {
        request.error = 'Unable to load players'
      })

    request.status = request.error === null ? 'success' : 'error'
  }

  function reset(): void {
    if (isLoading.value) return
    playersByServer.value = {}
    requestsByServer.value = {}
  }

  return { playersByServer, requestsByServer, loading: isLoading, queryServerPlayers, reset }
})
