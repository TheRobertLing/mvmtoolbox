<template>
  <div>
    <UHeader title="mvmtoolbox.tf" :toggle="false">
      <template #left />
      <template #right>
        <UTooltip text="Toggle Theme">
          <UColorModeButton />
        </UTooltip>
      </template>
    </UHeader>
    <UMain class="min-h-0">
      <slot />
    </UMain>
  </div>
</template>
