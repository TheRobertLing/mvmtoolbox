<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Tools',
    children: [
      {
        label: 'Server Browser',
        description: 'Browse MVM community servers',
        to: '/server-browser',
      },
      // {
      //   label: 'Loadout Randomiser',
      //   description: 'Roll a random class and loadout for your next wave',
      //   to: '/loadout',
      //   disabled: true,
      // },
      // {
      //   label: 'Loot Tracker',
      //   description: 'Keep track of your Mann Up tour loot',
      //   to: '/loot',
      //   disabled: true,
      // },
    ],
  },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <UHeader title="mvmtoolbox.tf" mode="drawer">
      <UNavigationMenu
        :items="items"
        variant="link"
        :ui="{
          list: 'flex gap-2',
          linkLeadingIcon: 'size-4',
          linkTrailingIcon: 'size-4',
          childLinkIcon: 'size-4',
          viewport: 'w-80 shrink-0',
          childList: 'grid-cols-1',
        }"
      />
      <template #right>
        <UTooltip text="Toggle Theme">
          <UColorModeButton />
        </UTooltip>
      </template>
      <template #body>
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          :ui="{ linkLeadingIcon: 'size-4', linkTrailingIcon: 'size-4', childLinkIcon: 'size-4' }"
        />
      </template>
    </UHeader>
    <UMain class="flex min-h-0 flex-1 flex-col">
      <slot />
    </UMain>
    <UFooter>
      <p class="text-center text-xs text-muted">
        This site is not affiliated with, endorsed by, or sponsored by Valve Corporation or Steam.
        All trademarks are property of their respective owners.
      </p>
    </UFooter>
  </div>
</template>
