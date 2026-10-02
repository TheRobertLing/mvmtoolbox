import { ListServerPlayersResponseSchema } from '#widgets/server-browser/shared/api/players'

export function useServerPlayers(ip: MaybeRefOrGetter<string>, port: MaybeRefOrGetter<number>) {
  return useFetch(() => `/api/v1/server-browser/servers/${toValue(ip)}/${toValue(port)}/players`, {
    key: () => `players:${toValue(ip)}:${toValue(port)}`,
    server: false,
    lazy: true,
    dedupe: 'defer',
    transform: (response) => ListServerPlayersResponseSchema.parse(response),
    default: () => [],
  })
}
