export const isServerEmpty = (playerCount: number) => playerCount === 0

export const isServerFull = (playerCount: number, maxPlayerCount: number) =>
  playerCount >= maxPlayerCount

export const serverAddress = (ip: string, port: number) => `${ip}:${port}`
