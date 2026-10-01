<template>
  <UContainer>
    <UPageHeader
      title="Server Browser"
      description="Browse all MVM community servers"
      :ui="{
        wrapper: 'flex-row items-center justify-between',
        title: 'text-2xl sm:text-2xl font-semibold tracking-tight',
        description: 'mt-1 text-sm',
      }"
    >
      <template #links>
        <UModal title="Guide" :scrollable="false">
          <UButton icon="i-lucide-info" label="About" color="neutral" variant="outline" />

          <template #body>
            <p class="text-sm leading-relaxed text-muted">Write your description here.</p>
          </template>
        </UModal>
      </template>
    </UPageHeader>

    <UPageBody class="pb-4">
      <ServerBrowser />
    </UPageBody>
  </UContainer>
</template>
