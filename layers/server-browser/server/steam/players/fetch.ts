import { IPv4ToUINT32 } from './utils'

export async function fetchServerPlayers(
  apiKey: string,
  ip: string,
  port: number
): Promise<unknown> {
  try {
    return await $fetch('https://api.steampowered.com/IGameServersService/QueryByFakeIP/v1/', {
      query: {
        fake_ip: IPv4ToUINT32(ip),
        fake_port: port,
        app_id: 440,
        query_type: 2,
        key: apiKey,
      },
      timeout: 5000,
      retry: 0,
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Bad Gateway' })
  }
}
