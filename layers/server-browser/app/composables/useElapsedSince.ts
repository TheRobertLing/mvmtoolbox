export function useElapsedSince(timestamp: MaybeRefOrGetter<number | null>) {
  const now = useNow({ scheduler: (cb) => useIntervalFn(cb, 1000) })

  return computed(() => {
    const since = toValue(timestamp)
    if (since === null) return null

    const seconds = Math.max(0, Math.floor((now.value.getTime() - since) / 1000))
    const minutes = Math.floor(seconds / 60)
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m ${seconds % 60}s`
  })
}
