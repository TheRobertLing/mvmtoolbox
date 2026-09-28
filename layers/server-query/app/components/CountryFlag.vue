<script setup lang="ts">
import type { ServerLocation } from '../utils/serverLocation'

defineProps<{ country: ServerLocation['country'] }>()

const countryIcons: Record<ServerLocation['country'], string> = {
  ae: 'i-flag-ae-4x3', // United Arab Emirates
  ar: 'i-flag-ar-4x3', // Argentina
  at: 'i-flag-at-4x3', // Austria
  au: 'i-flag-au-4x3', // Australia
  br: 'i-flag-br-4x3', // Brazil
  cl: 'i-flag-cl-4x3', // Chile
  de: 'i-flag-de-4x3', // Germany
  es: 'i-flag-es-4x3', // Spain
  fi: 'i-flag-fi-4x3', // Finland
  fr: 'i-flag-fr-4x3', // France
  gb: 'i-flag-gb-4x3', // United Kingdom
  gu: 'i-flag-gu-4x3', // Guam
  hk: 'i-flag-hk-4x3', // Hong Kong
  in: 'i-flag-in-4x3', // India
  jp: 'i-flag-jp-4x3', // Japan
  kr: 'i-flag-kr-4x3', // South Korea
  nl: 'i-flag-nl-4x3', // Netherlands
  pe: 'i-flag-pe-4x3', // Peru
  pl: 'i-flag-pl-4x3', // Poland
  se: 'i-flag-se-4x3', // Sweden
  sg: 'i-flag-sg-4x3', // Singapore
  us: 'i-flag-us-4x3', // United States
  za: 'i-flag-za-4x3', // South Africa
  unknown: 'i-lucide-circle-help', // Unknown
}
</script>

<template>
  <UIcon :name="countryIcons[country]" class="size-6 shrink-0" role="img" />
</template>
