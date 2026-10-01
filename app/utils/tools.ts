export interface Tool {
  title: string
  description: string
  to: string
  disabled?: boolean
}

export const tools: Tool[] = [
  {
    title: 'Server Browser',
    description: 'Browse all MVM community servers',
    to: '/server-browser',
  },
  {
    title: 'Loadout Randomiser',
    description: 'Roll a random class and loadout for your next wave',
    to: '/loadout',
    disabled: true,
  },
  {
    title: 'Loot Tracker',
    description: 'Keep track of your Mann Up tour loot',
    to: '/loot',
    disabled: true,
  },
]
