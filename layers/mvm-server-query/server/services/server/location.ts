import type { Server } from '../../../shared/schemas/servers.ts'

type ServerLocation = Pick<Server, 'continent' | 'country' | 'city'>

// Steam SDR locations and aliases for app 440.
const locations: Record<string, ServerLocation> = {
  ams: { continent: 'EU', country: 'nl', city: 'Amsterdam' }, // Netherlands
  atl: { continent: 'NA', country: 'us', city: 'Atlanta' }, // United States
  dfw: { continent: 'NA', country: 'us', city: 'Dallas' }, // United States
  dxb: { continent: 'AS', country: 'ae', city: 'Dubai' }, // United Arab Emirates
  eat: { continent: 'NA', country: 'us', city: 'Wenatchee' }, // United States
  mwh: { continent: 'NA', country: 'us', city: 'Wenatchee' }, // United States
  eze: { continent: 'SA', country: 'ar', city: 'Buenos Aires' }, // Argentina
  fra: { continent: 'EU', country: 'de', city: 'Frankfurt' }, // Germany
  fsn: { continent: 'EU', country: 'de', city: 'Falkenstein' }, // Germany
  gru: { continent: 'SA', country: 'br', city: 'Sao Paulo' }, // Brazil
  gum: { continent: 'OC', country: 'gu', city: 'Guam' }, // Guam
  hel: { continent: 'EU', country: 'fi', city: 'Helsinki' }, // Finland
  helm: { continent: 'EU', country: 'fi', city: 'Helsinki' }, // Finland
  hkg: { continent: 'AS', country: 'hk', city: 'Hong Kong' }, // Hong Kong
  iad: { continent: 'NA', country: 'us', city: 'Sterling' }, // United States
  jnb: { continent: 'AF', country: 'za', city: 'Johannesburg' }, // South Africa
  lax: { continent: 'NA', country: 'us', city: 'Los Angeles' }, // United States
  lhr: { continent: 'EU', country: 'gb', city: 'London' }, // United Kingdom
  lim: { continent: 'SA', country: 'pe', city: 'Lima' }, // Peru
  mad: { continent: 'EU', country: 'es', city: 'Madrid' }, // Spain
  ord: { continent: 'NA', country: 'us', city: 'Chicago' }, // United States
  par: { continent: 'EU', country: 'fr', city: 'Paris' }, // France
  scl: { continent: 'SA', country: 'cl', city: 'Santiago' }, // Chile
  sea: { continent: 'NA', country: 'us', city: 'Seattle' }, // United States
  seo: { continent: 'AS', country: 'kr', city: 'Seoul' }, // South Korea
  sgp: { continent: 'AS', country: 'sg', city: 'Singapore' }, // Singapore
  sto: { continent: 'EU', country: 'se', city: 'Stockholm' }, // Sweden
  syd: { continent: 'OC', country: 'au', city: 'Sydney' }, // Australia
  tyo: { continent: 'AS', country: 'jp', city: 'Tokyo' }, // Japan
  vie: { continent: 'EU', country: 'at', city: 'Vienna' }, // Austria
  waw: { continent: 'EU', country: 'pl', city: 'Warsaw' }, // Poland
  bom: { continent: 'AS', country: 'in', city: 'Mumbai' }, // India
  maa: { continent: 'AS', country: 'in', city: 'Chennai' }, // India
}

export function getServerLocation(serverName: string): ServerLocation {
  for (const token of serverName.toLowerCase().split(/[^a-z0-9]+/)) {
    const location = token.replace(/\d+$/, '')
    if (Object.hasOwn(locations, token)) return locations[token]!
    if (Object.hasOwn(locations, location)) return locations[location]!
  }
  return { continent: 'unknown', country: 'unknown', city: 'unknown' }
}
