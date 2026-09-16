import { z } from 'zod'

export const ServerSchema = z.object({
  ip: z.ipv4(),
  port: z.number().int().min(1).max(65535),
  serverName: z.string(),
  continent: z.enum([
    'NA', // North America
    'EU', // Europe
    'SA', // South America
    'AS', // Asia
    'OC', // Oceania
    'AF', // Africa
    'AN', // Antarctica
    'unknown', // Unknown
  ]),
  city: z.enum([
    'Amsterdam',
    'Atlanta',
    'Buenos Aires',
    'Chennai',
    'Chicago',
    'Dallas',
    'Dubai',
    'Falkenstein',
    'Frankfurt',
    'Guam',
    'Helsinki',
    'Hong Kong',
    'Johannesburg',
    'Lima',
    'London',
    'Los Angeles',
    'Madrid',
    'Mumbai',
    'Paris',
    'Santiago',
    'Sao Paulo',
    'Seattle',
    'Seoul',
    'Singapore',
    'Sterling',
    'Stockholm',
    'Sydney',
    'Tokyo',
    'Vienna',
    'Warsaw',
    'Wenatchee',
    'unknown',
  ]),
  country: z.enum([
    'ae', // United Arab Emirates
    'ar', // Argentina
    'at', // Austria
    'au', // Australia
    'br', // Brazil
    'cl', // Chile
    'de', // Germany
    'es', // Spain
    'fi', // Finland
    'fr', // France
    'gb', // United Kingdom
    'gu', // Guam
    'hk', // Hong Kong
    'in', // India
    'jp', // Japan
    'kr', // South Korea
    'nl', // Netherlands
    'pe', // Peru
    'pl', // Poland
    'se', // Sweden
    'sg', // Singapore
    'us', // United States
    'za', // South Africa
    'unknown', // Unknown
  ]),
  mapName: z.string(),
  playerCount: z.number().int().min(0).max(6),
})

export const ServerListResponseSchema = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('success'),
    timestamp: z.iso.datetime(),
    data: z.array(ServerSchema),
  }),
  z.object({ status: z.literal('error') }),
])

export type Server = z.infer<typeof ServerSchema>
export type ServerListResponse = z.infer<typeof ServerListResponseSchema>
