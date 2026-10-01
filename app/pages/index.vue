<template>
  <UContainer
    class="flex flex-1 flex-col items-center justify-center gap-10 py-12"
  >
    <div class="flex max-w-xl flex-col items-center gap-3 text-center">
      <h1 class="text-3xl font-semibold tracking-tight text-highlighted">mvmtoolbox.tf</h1>
      <p class="text-sm text-balance text-muted">
        A collection of tools for players of Mann vs. Machine.
      </p>
    </div>

    <UPageGrid class="w-full max-w-4xl gap-4">
      <UPageCard
        v-for="tool in tools"
        :key="tool.to"
        :title="tool.title"
        :description="tool.description"
        :to="tool.disabled ? undefined : tool.to"
        :class="tool.disabled && 'cursor-not-allowed opacity-50'"
        :aria-disabled="tool.disabled || undefined"
        :ui="{ container: 'p-4!', title: 'text-sm', description: 'text-sm' }"
      >
        <template v-if="tool.disabled" #footer>
          <UBadge label="Coming soon" color="neutral" variant="subtle" />
        </template>
      </UPageCard>
    </UPageGrid>
  </UContainer>
</template>
