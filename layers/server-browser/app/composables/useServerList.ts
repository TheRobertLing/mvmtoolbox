import { ListServersResponseSchema } from '#layers/server-browser/shared/api/servers'

export function useServerList() {
  const { data, status, error, refresh } = useFetch('/api/v1/server-browser/servers', {
    key: 'server-browser:servers',
    lazy: true,
    dedupe: 'defer',
    retry: 0,
    transform: (response) =>
      ListServersResponseSchema.parse(response).sort((a, b) =>
        a.serverName.localeCompare(b.serverName)
      ),
    default: () => [],
  })

  const fetchedAt = ref<number | null>(null)
  watch(
    status,
    (value) => {
      if (value === 'success') fetchedAt.value = Date.now()
    },
    { immediate: true }
  )

  return {
    list: data,
    fetchedAt,
    isLoading: computed(() => status.value === 'idle' || status.value === 'pending'),
    error,
    refresh,
  }
}
