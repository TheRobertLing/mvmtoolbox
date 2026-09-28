import { defineStore } from 'pinia'
import { ListServersResponseSchema, type Server } from '../../shared/api/servers'
import type { RequestStatus } from '../types/request'

export const useServersStore = defineStore('servers', () => {
  const servers = ref<Server[]>([])
  const lastRefreshAt = ref<number | null>(null)

  const status = ref<RequestStatus>('idle')
  const error = ref<string | null>(null)

  async function queryServers() {
    if (status.value === 'loading') return

    status.value = 'loading'
    error.value = null
    servers.value = []
    lastRefreshAt.value = null

    await $fetch<unknown>('/api/v1/servers', { retry: 0 })
      .then((response) => {
        servers.value = ListServersResponseSchema.parse(response)
        lastRefreshAt.value = Date.now()
        status.value = 'success'
      })
      .catch(() => {
        error.value = 'Unable to load servers'
        status.value = 'error'
      })
  }

  return { servers, status, error, lastRefreshAt, queryServers }
})
