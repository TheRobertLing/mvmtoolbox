export async function fetchMVMServers(apiKey: string): Promise<unknown> {
  try {
    return await $fetch('https://api.steampowered.com/IGameServersService/GetServerList/v1/', {
      query: {
        filter: String.raw`\appid\440\gametype\mvm`,
        limit: 10000,
        key: apiKey,
      },
      timeout: 3000,
      retry: 3,
    })
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Bad Gateway' })
  }
}
