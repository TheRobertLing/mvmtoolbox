export function IPv4ToUINT32(ip: string): number {
  return ip.split('.').reduce((value, octet) => value * 256 + Number(octet), 0)
}
