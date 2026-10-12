<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()
const scroller = useTemplateRef('scroller')
const osInstance = useThemedOverlayScrollbars(scroller)
watch(
  () => route.path,
  () => {
    osInstance()?.elements().viewport.scrollTo({ top: 0 })
  }
)

const { tools } = useAppConfig()
const navItems = computed<NavigationMenuItem[]>(() => [
  { label: 'Home', to: '/' },
  {
    label: 'Tools',
    children: tools
      .filter((tool) => !tool.disabled)
      .map((tool) => ({ label: tool.title, to: tool.to })),
  },
  { label: 'About', to: '/about' },
])
</script>

<template>
  <div ref="scroller" data-overlayscrollbars-initialize class="h-dvh">
    <div class="flex min-h-dvh flex-col">
      <UHeader title="mvmtoolbox.tf" mode="drawer">
        <UNavigationMenu
          :items="navItems"
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
            :items="navItems"
            orientation="vertical"
            :ui="{ linkLeadingIcon: 'size-4', linkTrailingIcon: 'size-4', childLinkIcon: 'size-4' }"
          />
        </template>
      </UHeader>
      <UMain class="flex min-h-0 flex-1 flex-col">
        <slot />
      </UMain>
    </div>
  </div>
</template>
